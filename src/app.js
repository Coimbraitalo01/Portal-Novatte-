import express from 'express';
import path from 'path';
import methodOverride from 'method-override';
import { fileURLToPath } from 'url';
import expressLayouts from 'express-ejs-layouts';
import cors from 'cors';
import homeRouter from './routes/home.js';
import propertiesRouter from './routes/properties.js';
import jobsRouter from './routes/jobs.js';
import eventsRouter from './routes/events.js';
import servicesRouter from './routes/services.js';
import companiesRouter from './routes/companies.js';
import newsRouter from './routes/news.js';
import adminRouter from './routes/admin.js';
import contactRouter from './routes/contact.js';
import apiRouter from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(methodOverride('_method'));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));

app.use('/', homeRouter);
app.use('/imoveis', propertiesRouter);
app.use('/vagas', jobsRouter);
app.use('/eventos', eventsRouter);
app.use('/servicos', servicesRouter);
app.use('/empresas', companiesRouter);
app.use('/noticias', newsRouter);
app.use('/admin', adminRouter);
app.use('/contato', contactRouter);
app.use('/api', apiRouter);

app.get('/health', (req, res) => res.json({ ok: true }));

app.use((req, res) => {
  res.status(404).render('404', { title: 'Página não encontrada' });
});

export default app;
