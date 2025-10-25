import db from '../db/index.js';

export function listJobs({ q, city, type } = {}) {
  const conditions = [];
  const params = [];
  if (q) { conditions.push('(title LIKE ? OR company LIKE ? OR description LIKE ?)'); params.push(`%${q}%`, `%${q}%`, `%${q}%`); }
  if (city) { conditions.push('city LIKE ?'); params.push(`%${city}%`); }
  if (type) { conditions.push('type = ?'); params.push(type); }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const sql = `SELECT * FROM jobs ${where} ORDER BY created_at DESC`;
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows));
  });
}

export function getJob(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM jobs WHERE id=?', [id], (err, row) => {
      if (err) return reject(err);
      if (!row) return resolve(null);
      db.all('SELECT * FROM job_images WHERE job_id=?', [id], (err2, images) => err2 ? reject(err2) : resolve({ ...row, images }));
    });
  });
}

export function createJob(data, imagePaths = []) {
  const { title, company, city, type, salary, description } = data;
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO jobs (title, company, city, type, salary, description) VALUES (?, ?, ?, ?, ?, ?)',
      [title, company, city, type, salary, description],
      function (err) {
        if (err) return reject(err);
        const jobId = this.lastID;
        const stmt = db.prepare('INSERT INTO job_images (job_id, url) VALUES (?, ?)');
        for (const url of imagePaths) stmt.run(jobId, url);
        stmt.finalize((e) => e ? reject(e) : resolve(jobId));
      }
    );
  });
}

export function updateJob(id, data) {
  const { title, company, city, type, salary, description } = data;
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE jobs SET title=?, company=?, city=?, type=?, salary=?, description=? WHERE id=?',
      [title, company, city, type, salary, description, id],
      function (err) { if (err) return reject(err); resolve(this.changes); }
    );
  });
}

export function addJobImages(id, imagePaths=[]) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('INSERT INTO job_images (job_id, url) VALUES (?, ?)');
    for (const url of imagePaths) stmt.run(id, url);
    stmt.finalize((e)=> e?reject(e):resolve(true));
  });
}

export function removeJobImage(imageId) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM job_images WHERE id=?', [imageId], function (err) { if (err) return reject(err); resolve(this.changes); });
  });
}

export function deleteJob(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM jobs WHERE id=?', [id], function (err) { if (err) return reject(err); resolve(this.changes); });
  });
}
