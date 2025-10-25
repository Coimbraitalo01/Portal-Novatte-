import { Router } from 'express';
import { listCompanies, getCompany } from '../models/company.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { q, city, category } = req.query;
    const companies = await listCompanies({ q, city, category });
    res.render('companies/index', { title: 'Empresas', companies, filters: { q, city, category } });
  } catch (e) {
    res.status(500).send('Erro ao listar empresas');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const company = await getCompany(req.params.id);
    if (!company) return res.status(404).render('404', { title: 'Empresa não encontrada' });
    res.render('companies/show', { title: company.name, company });
  } catch (e) {
    res.status(500).send('Erro ao carregar empresa');
  }
});

export default router;
