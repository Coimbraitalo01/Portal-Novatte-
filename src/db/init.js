import db, { initDb } from './index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

initDb();

const seedPath = path.join(__dirname, 'seed.sql');
const seed = fs.readFileSync(seedPath, 'utf-8');

db.exec(seed, (err) => {
  if (err) {
    console.error('Erro ao executar seed:', err);
    process.exit(1);
  }
  console.log('Banco criado e populado com sucesso.');
  process.exit(0);
});
