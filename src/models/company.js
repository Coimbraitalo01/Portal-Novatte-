import db from '../db/index.js';

export function listCompanies({ q, city, category } = {}) {
  const conditions = [];
  const params = [];
  if (q) { conditions.push('(name LIKE ? OR description LIKE ?)'); params.push(`%${q}%`,`%${q}%`); }
  if (city) { conditions.push('city LIKE ?'); params.push(`%${city}%`); }
  if (category) { conditions.push('category LIKE ?'); params.push(`%${category}%`); }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  return new Promise((resolve, reject) => db.all(`SELECT * FROM companies ${where} ORDER BY created_at DESC`, params, (e, rows)=> e?reject(e):resolve(rows)));
}

export function getCompany(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM companies WHERE id=?', [id], (err, row) => {
      if (err) return reject(err);
      if (!row) return resolve(null);
      db.all('SELECT * FROM company_images WHERE company_id=?', [id], (e, images)=> e?reject(e):resolve({ ...row, images }));
    });
  });
}

export function createCompany(data, imagePaths=[]) {
  const { name, category, phone, address, city, description } = data;
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO companies (name, category, phone, address, city, description) VALUES (?,?,?,?,?,?)', [name, category, phone, address, city, description], function(err){
      if (err) return reject(err);
      const id = this.lastID;
      const stmt = db.prepare('INSERT INTO company_images (company_id, url) VALUES (?, ?)');
      for (const url of imagePaths) stmt.run(id, url);
      stmt.finalize(e=> e?reject(e):resolve(id));
    });
  });
}

export function updateCompany(id, data) {
  const { name, category, phone, address, city, description } = data;
  return new Promise((resolve, reject) => db.run('UPDATE companies SET name=?, category=?, phone=?, address=?, city=?, description=? WHERE id=?', [name, category, phone, address, city, description, id], function(err){ return err?reject(err):resolve(this.changes); }));
}

export function addCompanyImages(id, imagePaths=[]) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('INSERT INTO company_images (company_id, url) VALUES (?, ?)');
    for (const url of imagePaths) stmt.run(id, url);
    stmt.finalize(e=> e?reject(e):resolve(true));
  });
}

export function removeCompanyImage(imageId) {
  return new Promise((resolve, reject) => db.run('DELETE FROM company_images WHERE id=?', [imageId], function(err){ return err?reject(err):resolve(this.changes); }));
}

export function deleteCompany(id) {
  return new Promise((resolve, reject) => db.run('DELETE FROM companies WHERE id=?', [id], function(err){ return err?reject(err):resolve(this.changes); }));
}
