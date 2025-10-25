import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('contact', { title: 'Contato' });
});

router.post('/', (req, res) => {
  // Aqui você pode integrar com um serviço de email futuramente
  res.render('contact', { title: 'Contato', success: true });
});

export default router;
