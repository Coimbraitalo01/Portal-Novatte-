import Head from 'next/head';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Portal Novatte</title>
        <meta name="description" content="Portal Novatte - Imóveis, Vagas, Eventos e Serviços" />
      </Head>

      <main>
        <h1>Bem-vindo ao Portal Novatte</h1>
        <p>Em breve, nosso portal estará no ar com novidades!</p>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        
        h1 {
          color: #0070f3;
          margin-bottom: 1rem;
        }
        
        p {
          font-size: 1.2rem;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
