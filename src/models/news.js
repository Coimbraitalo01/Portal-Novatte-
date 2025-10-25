import db from '../db/index.js';

export function listNews({ q, city } = {}) {
  const conditions = [];
  const params = [];
  if (q) { conditions.push('(title LIKE ? OR body LIKE ? OR author LIKE ?)'); params.push(`%${q}%`, `%${q}%`, `%${q}%`); }
  if (city) { conditions.push('city LIKE ?'); params.push(`%${city}%`); }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const sql = `SELECT * FROM news ${where} ORDER BY created_at DESC`;
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows));
  });
}

export function getNews(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM news WHERE id=?', [id], (err, row) => {
      if (err) return reject(err);
      if (!row) return resolve(null);
      db.all('SELECT * FROM news_images WHERE news_id=?', [id], (err2, images) => err2 ? reject(err2) : resolve({ ...row, images }));
    });
  });
}

export function createNews(data, imagePaths = []) {
  const { title, body, author, city } = data;
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO news (title, body, author, city) VALUES (?, ?, ?, ?)',
      [title, body, author, city],
      function (err) {
        if (err) return reject(err);
        const newsId = this.lastID;
        const stmt = db.prepare('INSERT INTO news_images (news_id, url) VALUES (?, ?)');
        for (const url of imagePaths) stmt.run(newsId, url);
        stmt.finalize((e) => e ? reject(e) : resolve(newsId));
      }
    );
  });
}

export function updateNews(id, data) {
  const { title, body, author, city } = data;
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE news SET title=?, body=?, author=?, city=? WHERE id=?',
      [title, body, author, city, id],
      function (err) { if (err) return reject(err); resolve(this.changes); }
    );
  });
}

export function deleteNews(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM news WHERE id=?', [id], function (err) { if (err) return reject(err); resolve(this.changes); });
  });
}
