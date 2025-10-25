import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { listProperties, getProperty } from '../models/property.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { q, minPrice, maxPrice, status, city } = req.query;
    const properties = await listProperties({ q, minPrice, maxPrice, status, city });
    res.render('properties/index', { title: 'Imóveis', properties, filters: { q, minPrice, maxPrice, status, city } });
  } catch (e) {
    res.status(500).send('Erro ao listar imóveis');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const property = await getProperty(req.params.id);
    if (!property) return res.status(404).render('404', { title: 'Imóvel não encontrado' });
    res.render('properties/show', { title: property.title, property });
  } catch (e) {
    res.status(500).send('Erro ao carregar imóvel');
  }
});

export default router;
