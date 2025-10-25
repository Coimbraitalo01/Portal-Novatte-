import db from '../db/index.js';

export function listServices({ q, category } = {}) {
  const conditions = [];
  const params = [];
  if (q) { conditions.push('(title LIKE ? OR description LIKE ?)'); params.push(`%${q}%`,`%${q}%`); }
  if (category) { conditions.push('category LIKE ?'); params.push(`%${category}%`); }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  return new Promise((resolve, reject) => db.all(`SELECT * FROM services ${where} ORDER BY created_at DESC`, params, (e, rows)=> e?reject(e):resolve(rows)));
}

export function getService(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM services WHERE id=?', [id], (err, row) => {
      if (err) return reject(err);
      if (!row) return resolve(null);
      db.all('SELECT * FROM service_images WHERE service_id=?', [id], (e, images)=> e?reject(e):resolve({ ...row, images }));
    });
  });
}

export function createService(data, imagePaths=[]) {
  const { title, category, description } = data;
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO services (title, category, description) VALUES (?,?,?)', [title, category, description], function(err){
      if (err) return reject(err);
      const id = this.lastID;
      const stmt = db.prepare('INSERT INTO service_images (service_id, url) VALUES (?, ?)');
      for (const url of imagePaths) stmt.run(id, url);
      stmt.finalize(e=> e?reject(e):resolve(id));
    });
  });
}

export function updateService(id, data) {
  const { title, category, description } = data;
  return new Promise((resolve, reject) => db.run('UPDATE services SET title=?, category=?, description=? WHERE id=?', [title, category, description, id], function(err){ return err?reject(err):resolve(this.changes); }));
}

export function addServiceImages(id, imagePaths=[]) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('INSERT INTO service_images (service_id, url) VALUES (?, ?)');
    for (const url of imagePaths) stmt.run(id, url);
    stmt.finalize(e=> e?reject(e):resolve(true));
  });
}

export function removeServiceImage(imageId) {
  return new Promise((resolve, reject) => db.run('DELETE FROM service_images WHERE id=?', [imageId], function(err){ return err?reject(err):resolve(this.changes); }));
}

export function deleteService(id) {
  return new Promise((resolve, reject) => db.run('DELETE FROM services WHERE id=?', [id], function(err){ return err?reject(err):resolve(this.changes); }));
}
