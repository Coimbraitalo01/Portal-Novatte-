BEGIN TRANSACTION;
INSERT INTO properties (title, price, description, address, city, area, status) VALUES
('Casa Moderna no Centro', 650000, 'Excelente casa com 3 quartos, 2 banheiros, garagem para 2 carros.', 'Rua A, 123', 'Santo Antônio de Pádua', 320, 'Venda'),
('Apartamento 2 Quartos', 1200, 'Apartamento bem localizado, com 2 quartos e varanda gourmet.', 'Rua B, 456', 'Itaperuna', 85, 'Aluguel');

INSERT INTO property_images (property_id, url) VALUES
(1, '/public/img/sample-house-1.jpg'),
(2, '/public/img/sample-apartment-1.jpg');

-- Jobs seed
INSERT INTO jobs (title, company, city, type, salary, description) VALUES
('Corretor de Imóveis', 'Imobiliária ABC', 'Santo Antônio de Pádua', 'CLT', 'A combinar', 'Atendimento a clientes, captação e negociação.'),
('Engenheiro Civil', 'Construtora XYZ', 'Itaperuna', 'PJ', 'R$ 4.500,00', 'Experiência em obras residenciais, liderança de equipe.');

INSERT INTO job_images (job_id, url) VALUES
(1, '/public/img/sample-job-1.jpg');

-- Events seed
INSERT INTO events (title, local, city, date, price, description) VALUES
('Festival de Música Regional', 'Praça Central', 'Santo Antônio de Pádua', '2025-10-15', 'Entrada Franca', 'Shows gratuitos e comida típica.'),
('Feira de Artesanato', 'Centro de Eventos', 'Itaperuna', '2025-10-22', 'Entrada Franca', 'Produtos artesanais e gastronomia local.');

INSERT INTO event_images (event_id, url) VALUES
(1, '/public/img/sample-event-1.jpg');

-- Services seed
INSERT INTO services (title, category, description) VALUES
('Assistência Técnica', 'Reparo', 'Conserto de eletrodomésticos e eletrônicos.'),
('Reformas e Reparos', 'Construção', 'Pedreiros, pintores, encanadores e eletricistas.');

INSERT INTO service_images (service_id, url) VALUES
(1, '/public/img/sample-service-1.jpg');

-- Companies seed
INSERT INTO companies (name, category, phone, address, city, description) VALUES
('Mercado Central', 'Supermercado', '(22) 1234-5678', 'Rua das Laranjeiras, 10', 'Centro', 'Completo com hortifruti, açougue e padaria.'),
('Auto Center Silva', 'Autopeças', '(22) 9876-5432', 'Av. Industrial, 200', 'Zona Industrial', 'Mecânica geral e revisão preventiva.');

INSERT INTO company_images (company_id, url) VALUES
(1, '/public/img/sample-company-1.jpg');
COMMIT;
