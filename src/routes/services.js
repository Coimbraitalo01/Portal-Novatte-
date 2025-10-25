import { Router } from 'express';
import { listServices, getService } from '../models/service.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { q, category } = req.query;
    const services = await listServices({ q, category });
    res.render('services/index', { title: 'Serviços', services, filters: { q, category } });
  } catch (e) {
    res.status(500).send('Erro ao listar serviços');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const service = await getService(req.params.id);
    if (!service) return res.status(404).render('404', { title: 'Serviço não encontrado' });
    res.render('services/show', { title: service.title, service });
  } catch (e) {
    res.status(500).send('Erro ao carregar serviço');
  }
});

export default router;
