import db from '../db/index.js';

export function listProperties({ q, minPrice, maxPrice, status, city } = {}) {
  const conditions = [];
  const params = [];

  if (q) {
    conditions.push('(title LIKE ? OR description LIKE ?)');
    params.push(`%${q}%`, `%${q}%`);
  }
  if (minPrice) {
    conditions.push('price >= ?');
    params.push(minPrice);
  }
  if (maxPrice) {
    conditions.push('price <= ?');
    params.push(maxPrice);
  }
  if (status) {
    conditions.push('status = ?');
    params.push(status);
  }
  if (city) {
    conditions.push('city LIKE ?');
    params.push(`%${city}%`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const sql = `SELECT * FROM properties ${where} ORDER BY created_at DESC`;

  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

export function getProperty(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM properties WHERE id = ?', [id], (err, row) => {
      if (err) return reject(err);
      if (!row) return resolve(null);
      db.all('SELECT * FROM property_images WHERE property_id = ?', [id], (err2, images) => {
        if (err2) return reject(err2);
        resolve({ ...row, images });
      });
    });
  });
}

export function createProperty(data, imagePaths = []) {
  const { title, price, description, address, city, area, status } = data;
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO properties (title, price, description, address, city, area, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, price, description, address, city, area, status],
      function (err) {
        if (err) return reject(err);
        const propertyId = this.lastID;
        const stmt = db.prepare('INSERT INTO property_images (property_id, url) VALUES (?, ?)');
        for (const url of imagePaths) {
          stmt.run(propertyId, url);
        }
        stmt.finalize((e) => {
          if (e) return reject(e);
          resolve(propertyId);
        });
      }
    );
  });
}

export function updateProperty(id, data) {
  const { title, price, description, address, city, area, status } = data;
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE properties SET title=?, price=?, description=?, address=?, city=?, area=?, status=? WHERE id=?',
      [title, price, description, address, city, area, status, id],
      function (err) {
        if (err) return reject(err);
        resolve(this.changes);
      }
    );
  });
}

export function addImages(id, imagePaths = []) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('INSERT INTO property_images (property_id, url) VALUES (?, ?)');
    for (const url of imagePaths) stmt.run(id, url);
    stmt.finalize((err) => (err ? reject(err) : resolve(true)));
  });
}

export function removeImage(imageId) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM property_images WHERE id=?', [imageId], function (err) {
      if (err) return reject(err);
      resolve(this.changes);
    });
  });
}

export function deleteProperty(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM properties WHERE id=?', [id], function (err) {
      if (err) return reject(err);
      resolve(this.changes);
    });
  });
}
