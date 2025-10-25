import { Router } from 'express';
import { listJobs, getJob } from '../models/job.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { q, city, type } = req.query;
    const jobs = await listJobs({ q, city, type });
    res.render('jobs/index', { title: 'Vagas', jobs, filters: { q, city, type } });
  } catch (e) {
    res.status(500).send('Erro ao listar vagas');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const job = await getJob(req.params.id);
    if (!job) return res.status(404).render('404', { title: 'Vaga não encontrada' });
    res.render('jobs/show', { title: job.title, job });
  } catch (e) {
    res.status(500).send('Erro ao carregar vaga');
  }
});

export default router;
