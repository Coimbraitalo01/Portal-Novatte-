import { Router } from 'express';
import { initDb } from '../db/index.js';
import { listProperties } from '../models/property.js';
import { listJobs } from '../models/job.js';
import { listEvents } from '../models/event.js';
import { listServices } from '../models/service.js';
import { listCompanies } from '../models/company.js';
import { listNews } from '../models/news.js';

const router = Router();

// Garantir que DB esteja migrado ao subir a home (uma vez)
let initialized = false;
router.use((req, res, next) => {
  if (!initialized) {
    initDb();
    initialized = true;
  }
  next();
});

router.get('/', async (req, res) => {
  try {
    const [destaques, jobs, events, services, companies, news] = await Promise.all([
      listProperties({}),
      listJobs({}),
      listEvents({}),
      listServices({}),
      listCompanies({}),
      listNews({})
    ]);
    res.render('home', {
      title: 'Novatte Portal',
      destaques: Array.isArray(destaques)?destaques:[],
      jobs: Array.isArray(jobs)?jobs:[],
      events: Array.isArray(events)?events:[],
      services: Array.isArray(services)?services:[],
      companies: Array.isArray(companies)?companies:[],
      news: Array.isArray(news)?news:[]
    });
  } catch (e) {
    res.status(500).send('Erro ao carregar página inicial');
  }
});

export default router;
