# Novatte Portal (Next.js)

## Instalação
1. cd web-next
2. npm install
3. Copie `.env.example` para `.env`
4. npm run db:push && npm run db:seed
5. npm run dev (http://localhost:5173)

## Deploy (Vercel)
- Importe o projeto do GitHub na Vercel
- Variáveis: DATABASE_URL, NEXTAUTH_SECRET, SMTP_*
- Banco recomendado em produção: Postgres (Neon/Render)

## API
- GET /api/properties?q=&status=&city=&page=&take=

## Notas
- UI usa Tailwind; Header responsivo com menu hambúrguer. Migre gradualmente o restante do HTML para componentes.
