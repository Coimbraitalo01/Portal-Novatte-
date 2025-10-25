import { Router } from 'express';
import { listNews, getNews } from '../models/news.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1');
    const take = Math.min(parseInt(req.query.take || '10'), 50);
    const q = req.query.q || '';
    const city = req.query.city || '';
    const all = await listNews({ q, city });
    const total = all.length;
    const start = (page - 1) * take;
    const items = all.slice(start, start + take);
    res.render('news/index', { title: 'Notícias da Cidade', items, page, take, total, q, city });
  } catch (e) {
    res.status(500).send('Erro ao listar notícias');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await getNews(req.params.id);
    if (!item) return res.status(404).render('404', { title: 'Notícia não encontrada' });
    res.render('news/show', { title: item.title, item });
  } catch (e) {
    res.status(500).send('Erro ao carregar notícia');
  }
});

export default router;
