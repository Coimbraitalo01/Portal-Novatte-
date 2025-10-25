import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { listProperties, getProperty, createProperty, updateProperty, deleteProperty, addImages, removeImage } from '../models/property.js';
import { listJobs, getJob, createJob, updateJob, deleteJob, addJobImages, removeJobImage } from '../models/job.js';
import { listEvents, getEvent, createEvent, updateEvent, deleteEvent, addEventImages, removeEventImage } from '../models/event.js';
import { listServices, getService, createService, updateService, deleteService, addServiceImages, removeServiceImage } from '../models/service.js';
import { listCompanies, getCompany, createCompany, updateCompany, deleteCompany, addCompanyImages, removeCompanyImage } from '../models/company.js';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', '..', 'public', 'uploads')),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  }
});
const upload = multer({ storage });

router.get('/imoveis', async (req, res) => {
  const properties = await listProperties({});
  res.render('admin/properties/index', { title: 'Admin - Imóveis', properties });
});

router.get('/imoveis/novo', (req, res) => {
  res.render('admin/properties/form', { title: 'Novo Imóvel', property: null });
});

router.post('/imoveis', upload.array('images', 10), async (req, res) => {
  try {
    const imagePaths = (req.files || []).map(f => `/uploads/${f.filename}`);
    const id = await createProperty(req.body, imagePaths);
    res.redirect(`/admin/imoveis/${id}/editar`);
  } catch (e) {
    res.status(500).send('Erro ao criar imóvel');
  }
});

router.get('/imoveis/:id/editar', async (req, res) => {
  const property = await getProperty(req.params.id);
  if (!property) return res.status(404).render('404', { title: 'Imóvel não encontrado' });
  res.render('admin/properties/form', { title: 'Editar Imóvel', property });
});

router.post('/imoveis/:id', upload.array('images', 10), async (req, res) => {
  try {
    await updateProperty(req.params.id, req.body);
    const imagePaths = (req.files || []).map(f => `/uploads/${f.filename}`);
    if (imagePaths.length) await addImages(req.params.id, imagePaths);
    res.redirect(`/admin/imoveis/${req.params.id}/editar`);
  } catch (e) {
    res.status(500).send('Erro ao atualizar imóvel');
  }
});

router.post('/imoveis/:id/excluir', async (req, res) => {
  try {
    await deleteProperty(req.params.id);
    res.redirect('/admin/imoveis');
  } catch (e) {
    res.status(500).send('Erro ao excluir imóvel');
  }
});

router.post('/imagens/:imageId/excluir', async (req, res) => {
  try {
    await removeImage(req.params.imageId);
    res.redirect('back');
  } catch (e) {
    res.status(500).send('Erro ao excluir imagem');
  }
});

// Admin - Vagas
router.get('/vagas', async (req, res) => {
  const jobs = await listJobs({});
  res.render('admin/jobs/index', { title: 'Admin - Vagas', jobs });
});

router.get('/vagas/novo', (req, res) => {
  res.render('admin/jobs/form', { title: 'Nova Vaga', job: null });
});

router.post('/vagas', upload.array('images', 10), async (req, res) => {
  try {
    const imagePaths = (req.files || []).map(f => `/uploads/${f.filename}`);
    const id = await createJob(req.body, imagePaths);
    res.redirect(`/admin/vagas/${id}/editar`);
  } catch (e) {
    res.status(500).send('Erro ao criar vaga');
  }
});

router.get('/vagas/:id/editar', async (req, res) => {
  const job = await getJob(req.params.id);
  if (!job) return res.status(404).render('404', { title: 'Vaga não encontrada' });
  res.render('admin/jobs/form', { title: 'Editar Vaga', job });
});

router.post('/vagas/:id', upload.array('images', 10), async (req, res) => {
  try {
    await updateJob(req.params.id, req.body);
    const imagePaths = (req.files || []).map(f => `/uploads/${f.filename}`);
    if (imagePaths.length) await addJobImages(req.params.id, imagePaths);
    res.redirect(`/admin/vagas/${req.params.id}/editar`);
  } catch (e) {
    res.status(500).send('Erro ao atualizar vaga');
  }
});

router.post('/vagas/:id/excluir', async (req, res) => {
  try {
    await deleteJob(req.params.id);
    res.redirect('/admin/vagas');
  } catch (e) {
    res.status(500).send('Erro ao excluir vaga');
  }
});

router.post('/vagas/imagens/:imageId/excluir', async (req, res) => {
  try {
    await removeJobImage(req.params.imageId);
    res.redirect('back');
  } catch (e) {
    res.status(500).send('Erro ao excluir imagem da vaga');
  }
});

// Admin - Eventos
router.get('/eventos', async (req, res) => {
  const events = await listEvents({});
  res.render('admin/events/index', { title: 'Admin - Eventos', events });
});

router.get('/eventos/novo', (req, res) => {
  res.render('admin/events/form', { title: 'Novo Evento', event: null });
});

router.post('/eventos', upload.array('images', 10), async (req, res) => {
  try {
    const imagePaths = (req.files || []).map(f => `/uploads/${f.filename}`);
    const id = await createEvent(req.body, imagePaths);
    res.redirect(`/admin/eventos/${id}/editar`);
  } catch (e) {
    res.status(500).send('Erro ao criar evento');
  }
});

router.get('/eventos/:id/editar', async (req, res) => {
  const event = await getEvent(req.params.id);
  if (!event) return res.status(404).render('404', { title: 'Evento não encontrado' });
  res.render('admin/events/form', { title: 'Editar Evento', event });
});

router.post('/eventos/:id', upload.array('images', 10), async (req, res) => {
  try {
    await updateEvent(req.params.id, req.body);
    const imagePaths = (req.files || []).map(f => `/uploads/${f.filename}`);
    if (imagePaths.length) await addEventImages(req.params.id, imagePaths);
    res.redirect(`/admin/eventos/${req.params.id}/editar`);
  } catch (e) {
    res.status(500).send('Erro ao atualizar evento');
  }
});

router.post('/eventos/:id/excluir', async (req, res) => {
  try {
    await deleteEvent(req.params.id);
    res.redirect('/admin/eventos');
  } catch (e) {
    res.status(500).send('Erro ao excluir evento');
  }
});

router.post('/eventos/imagens/:imageId/excluir', async (req, res) => {
  try {
    await removeEventImage(req.params.imageId);
    res.redirect('back');
  } catch (e) {
    res.status(500).send('Erro ao excluir imagem do evento');
  }
});

// Admin - Serviços
router.get('/servicos', async (req, res) => {
  const services = await listServices({});
  res.render('admin/services/index', { title: 'Admin - Serviços', services });
});

router.get('/servicos/novo', (req, res) => {
  res.render('admin/services/form', { title: 'Novo Serviço', service: null });
});

router.post('/servicos', upload.array('images', 10), async (req, res) => {
  try {
    const imagePaths = (req.files || []).map(f => `/uploads/${f.filename}`);
    const id = await createService(req.body, imagePaths);
    res.redirect(`/admin/servicos/${id}/editar`);
  } catch (e) {
    res.status(500).send('Erro ao criar serviço');
  }
});

router.get('/servicos/:id/editar', async (req, res) => {
  const service = await getService(req.params.id);
  if (!service) return res.status(404).render('404', { title: 'Serviço não encontrado' });
  res.render('admin/services/form', { title: 'Editar Serviço', service });
});

router.post('/servicos/:id', upload.array('images', 10), async (req, res) => {
  try {
    await updateService(req.params.id, req.body);
    const imagePaths = (req.files || []).map(f => `/uploads/${f.filename}`);
    if (imagePaths.length) await addServiceImages(req.params.id, imagePaths);
    res.redirect(`/admin/servicos/${req.params.id}/editar`);
  } catch (e) {
    res.status(500).send('Erro ao atualizar serviço');
  }
});

router.post('/servicos/:id/excluir', async (req, res) => {
  try {
    await deleteService(req.params.id);
    res.redirect('/admin/servicos');
  } catch (e) {
    res.status(500).send('Erro ao excluir serviço');
  }
});

router.post('/servicos/imagens/:imageId/excluir', async (req, res) => {
  try {
    await removeServiceImage(req.params.imageId);
    res.redirect('back');
  } catch (e) {
    res.status(500).send('Erro ao excluir imagem do serviço');
  }
});

// Admin - Empresas
router.get('/empresas', async (req, res) => {
  const companies = await listCompanies({});
  res.render('admin/companies/index', { title: 'Admin - Empresas', companies });
});

router.get('/empresas/novo', (req, res) => {
  res.render('admin/companies/form', { title: 'Nova Empresa', company: null });
});

router.post('/empresas', upload.array('images', 10), async (req, res) => {
  try {
    const imagePaths = (req.files || []).map(f => `/uploads/${f.filename}`);
    const id = await createCompany(req.body, imagePaths);
    res.redirect(`/admin/empresas/${id}/editar`);
  } catch (e) {
    res.status(500).send('Erro ao criar empresa');
  }
});

router.get('/empresas/:id/editar', async (req, res) => {
  const company = await getCompany(req.params.id);
  if (!company) return res.status(404).render('404', { title: 'Empresa não encontrada' });
  res.render('admin/companies/form', { title: 'Editar Empresa', company });
});

router.post('/empresas/:id', upload.array('images', 10), async (req, res) => {
  try {
    await updateCompany(req.params.id, req.body);
    const imagePaths = (req.files || []).map(f => `/uploads/${f.filename}`);
    if (imagePaths.length) await addCompanyImages(req.params.id, imagePaths);
    res.redirect(`/admin/empresas/${req.params.id}/editar`);
  } catch (e) {
    res.status(500).send('Erro ao atualizar empresa');
  }
});

router.post('/empresas/:id/excluir', async (req, res) => {
  try {
    await deleteCompany(req.params.id);
    res.redirect('/admin/empresas');
  } catch (e) {
    res.status(500).send('Erro ao excluir empresa');
  }
});

router.post('/empresas/imagens/:imageId/excluir', async (req, res) => {
  try {
    await removeCompanyImage(req.params.imageId);
    res.redirect('back');
  } catch (e) {
    res.status(500).send('Erro ao excluir imagem da empresa');
  }
});
export default router;
