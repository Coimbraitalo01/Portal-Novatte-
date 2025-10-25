import { Router } from 'express';
import { listProperties, getProperty } from '../models/property.js';
import { listJobs, getJob } from '../models/job.js';
import { listEvents, getEvent } from '../models/event.js';
import { listServices, getService } from '../models/service.js';
import { listCompanies, getCompany } from '../models/company.js';

const router = Router();

router.get('/imoveis', async (req, res) => {
  try {
    const { q, minPrice, maxPrice, status, city } = req.query;
    const properties = await listProperties({ q, minPrice, maxPrice, status, city });
    res.json({ items: properties });
  } catch (e) {
    res.status(500).json({ error: 'Erro ao listar imóveis' });
  }
});

router.get('/imoveis/:id', async (req, res) => {
  try {
    const property = await getProperty(req.params.id);
    if (!property) return res.status(404).json({ error: 'Imóvel não encontrado' });
    res.json(property);
  } catch (e) {
    res.status(500).json({ error: 'Erro ao carregar imóvel' });
  }
});

router.get('/vagas', async (req, res) => {
  try {
    const { q, city, type } = req.query;
    const jobs = await listJobs({ q, city, type });
    res.json({ items: jobs });
  } catch (e) {
    res.status(500).json({ error: 'Erro ao listar vagas' });
  }
});

router.get('/vagas/:id', async (req, res) => {
  try {
    const job = await getJob(req.params.id);
    if (!job) return res.status(404).json({ error: 'Vaga não encontrada' });
    res.json(job);
  } catch (e) {
    res.status(500).json({ error: 'Erro ao carregar vaga' });
  }
});

router.get('/eventos', async (req, res) => {
  try {
    const { q, city } = req.query;
    const events = await listEvents({ q, city });
    res.json({ items: events });
  } catch (e) {
    res.status(500).json({ error: 'Erro ao listar eventos' });
  }
});

router.get('/eventos/:id', async (req, res) => {
  try {
    const event = await getEvent(req.params.id);
    if (!event) return res.status(404).json({ error: 'Evento não encontrado' });
    res.json(event);
  } catch (e) {
    res.status(500).json({ error: 'Erro ao carregar evento' });
  }
});

router.get('/servicos', async (req, res) => {
  try {
    const { q, category } = req.query;
    const services = await listServices({ q, category });
    res.json({ items: services });
  } catch (e) {
    res.status(500).json({ error: 'Erro ao listar serviços' });
  }
});

router.get('/servicos/:id', async (req, res) => {
  try {
    const service = await getService(req.params.id);
    if (!service) return res.status(404).json({ error: 'Serviço não encontrado' });
    res.json(service);
  } catch (e) {
    res.status(500).json({ error: 'Erro ao carregar serviço' });
  }
});

router.get('/empresas', async (req, res) => {
  try {
    const { q, city, category } = req.query;
    const companies = await listCompanies({ q, city, category });
    res.json({ items: companies });
  } catch (e) {
    res.status(500).json({ error: 'Erro ao listar empresas' });
  }
});

router.get('/empresas/:id', async (req, res) => {
  try {
    const company = await getCompany(req.params.id);
    if (!company) return res.status(404).json({ error: 'Empresa não encontrada' });
    res.json(company);
  } catch (e) {
    res.status(500).json({ error: 'Erro ao carregar empresa' });
  }
});

export default router;
