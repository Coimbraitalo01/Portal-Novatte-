import db from '../db/index.js';

export function listEvents({ q, city } = {}) {
  const conditions = [];
  const params = [];
  if (q) { conditions.push('(title LIKE ? OR description LIKE ? OR local LIKE ?)'); params.push(`%${q}%`,`%${q}%`,`%${q}%`); }
  if (city) { conditions.push('city LIKE ?'); params.push(`%${city}%`); }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const sql = `SELECT * FROM events ${where} ORDER BY date DESC, created_at DESC`;
  return new Promise((resolve, reject) => db.all(sql, params, (e, rows)=> e?reject(e):resolve(rows)));
}

export function getEvent(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM events WHERE id=?', [id], (err, row) => {
      if (err) return reject(err);
      if (!row) return resolve(null);
      db.all('SELECT * FROM event_images WHERE event_id=?', [id], (e, images)=> e?reject(e):resolve({ ...row, images }));
    });
  });
}

export function createEvent(data, imagePaths=[]) {
  const { title, local, city, date, price, description } = data;
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO events (title, local, city, date, price, description) VALUES (?,?,?,?,?,?)', [title, local, city, date, price, description], function(err){
      if (err) return reject(err);
      const id = this.lastID;
      const stmt = db.prepare('INSERT INTO event_images (event_id, url) VALUES (?, ?)');
      for (const url of imagePaths) stmt.run(id, url);
      stmt.finalize(e=> e?reject(e):resolve(id));
    });
  });
}

export function updateEvent(id, data) {
  const { title, local, city, date, price, description } = data;
  return new Promise((resolve, reject) => {
    db.run('UPDATE events SET title=?, local=?, city=?, date=?, price=?, description=? WHERE id=?', [title, local, city, date, price, description, id], function(err){
      if (err) return reject(err);
      resolve(this.changes);
    });
  });
}

export function addEventImages(id, imagePaths=[]) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('INSERT INTO event_images (event_id, url) VALUES (?, ?)');
    for (const url of imagePaths) stmt.run(id, url);
    stmt.finalize(e=> e?reject(e):resolve(true));
  });
}

export function removeEventImage(imageId) {
  return new Promise((resolve, reject) => db.run('DELETE FROM event_images WHERE id=?', [imageId], function(err){ return err?reject(err):resolve(this.changes); }));
}

export function deleteEvent(id) {
  return new Promise((resolve, reject) => db.run('DELETE FROM events WHERE id=?', [id], function(err){ return err?reject(err):resolve(this.changes); }));
}
