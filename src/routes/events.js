import { Router } from 'express';
import { listEvents, getEvent } from '../models/event.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { q, city } = req.query;
    const events = await listEvents({ q, city });
    res.render('events/index', { title: 'Eventos', events, filters: { q, city } });
  } catch (e) {
    res.status(500).send('Erro ao listar eventos');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await getEvent(req.params.id);
    if (!event) return res.status(404).render('404', { title: 'Evento não encontrado' });
    res.render('events/show', { title: event.title, event });
  } catch (e) {
    res.status(500).send('Erro ao carregar evento');
  }
});

export default router;
