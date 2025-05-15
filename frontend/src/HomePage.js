import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <header className="header">
        <div className="logo">📚 MyLibrary</div>
        <nav className="nav">
          <button className="btn" onClick={() => navigate('/register')}>
            Inscription
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/login')}>
            Connexion
          </button>
        </nav>
      </header>

      <section className="hero">
        <h1>Lire, c'est s'évader sans bouger.</h1>
        <p>Découvrez des milliers de livres, explorez de nouveaux mondes et enrichissez votre esprit chaque jour.</p>
        <button className="cta-btn" >
          Explorer la Librairie
        </button>
      </section>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          
        }

        body {
          font-family: 'Segoe UI', sans-serif;
          background-color: #f4f6f8;
          color: #2c3e50;
          
        }

        .homepage {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .header {
          background-color: white;
          padding: 20px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #2c3e50;
        }

        .nav button {
          margin-left: 12px;
        }

        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          background-color: #27ae60;
          color: white;
          transition: background 0.3s;
        }

        .btn:hover {
          background-color: #219150;
        }

        .btn-outline {
          background-color: transparent;
          color: #27ae60;
          border: 2px solid #27ae60;
        }

        .btn-outline:hover {
          background-color: #27ae60;
          color: white;
        }

        .hero {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 80px 20px;
          background-image: linear-gradient(to right, #f1f2f6, #dff9fb);
        }

        .hero h1 {
          font-size: 42px;
          margin-bottom: 20px;
          max-width: 800px;
        }

        .hero p {
          font-size: 20px;
          margin-bottom: 30px;
          max-width: 600px;
        }

        .cta-btn {
          padding: 14px 28px;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 18px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .cta-btn:hover {
          background-color: #2980b9;
        }

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            gap: 10px;
          }

          .hero h1 {
            font-size: 32px;
          }

          .hero p {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
