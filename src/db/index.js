import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath);

function runMigrations() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  db.exec(schema);
}

export function initDb() {
  db.serialize(() => {
    db.run('PRAGMA foreign_keys = ON');
    runMigrations();
    // Seed automático se tabela estiver vazia
    db.get('SELECT COUNT(*) as count FROM properties', (err, row) => {
      if (err) return;
      if (row && row.count === 0) {
        const seedPath = path.join(__dirname, 'seed.sql');
        if (fs.existsSync(seedPath)) {
          const seed = fs.readFileSync(seedPath, 'utf-8');
          db.exec(seed);
        }
      }
    });
  });
}

export default db;
