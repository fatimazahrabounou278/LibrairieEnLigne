import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  
  const currentYear = new Date().getFullYear();
  
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
        <div className="hero-content">
          <h1>Lire, c'est s'évader sans bouger.</h1>
          <p>Découvrez des milliers de livres, explorez de nouveaux mondes et enrichissez votre esprit chaque jour.</p>
          <button className="cta-btn">
            Explorer la Librairie
          </button>
        </div>
        <div className="hero-shape"></div>
      </section>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>MyLibrary</h3>
            <p>Votre bibliothèque numérique personnelle, accessible partout et à tout moment.</p>
          </div>
          
          <div className="footer-section">
            <h3>Liens Rapides</h3>
            <ul>
              <li><a href="#">Accueil</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact</h3>
            <ul>
              <li><a href="mailto:contact@mylibrary.com">contact@mylibrary.com</a></li>
              <li><a href="tel:+33123456789">+33 1 23 45 67 89</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} MyLibrary. Tous droits réservés.</p>
        </div>
      </footer>
      
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Poppins', 'Segoe UI', sans-serif;
          background-color: #f8fafc;
          color: #334155;
          line-height: 1.6;
        }
        
        .homepage {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        /* Header Styles */
        .header {
          background-color: rgba(255, 255, 255, 0.95);
          padding: 20px 5%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .logo {
          font-size: 26px;
          font-weight: 700;
          color: #1e293b;
          letter-spacing: -0.5px;
        }
        
        .nav button {
          margin-left: 16px;
        }
        
        .btn {
          padding: 10px 24px;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          background-color: #22c55e;
          color: white;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
        }
        
        .btn:hover {
          background-color: #16a34a;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(34, 197, 94, 0.25);
        }
        
        .btn-outline {
          background-color: transparent;
          color: #22c55e;
          border: 2px solid #22c55e;
          box-shadow: none;
        }
        
        .btn-outline:hover {
          background-color: #22c55e;
          color: white;
          box-shadow: 0 6px 16px rgba(34, 197, 94, 0.25);
        }
        
        /* Hero Section Styles */
        .hero {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 100px 5%;
          position: relative;
          overflow: hidden;
          background-color: #f8fafc;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
        }
        
        .hero-shape {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.1) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 80%);
          z-index: 1;
        }
        
        .hero h1 {
          font-size: 48px;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #22c55e 0%, #0ea5e9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero p {
          font-size: 20px;
          margin-bottom: 40px;
          color: #64748b;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .cta-btn {
          padding: 16px 32px;
          background: linear-gradient(135deg, #22c55e 0%, #0ea5e9 100%);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(14, 165, 233, 0.25);
        }
        
        .cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(14, 165, 233, 0.35);
        }
        
        /* Footer Styles */
        .footer {
          background-color: #1e293b;
          color: #f8fafc;
          padding: 60px 5% 20px;
        }
        
        .footer-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: 40px;
        }
        
        .footer-section {
          flex: 1;
          min-width: 240px;
        }
        
        .footer-section h3 {
          font-size: 20px;
          margin-bottom: 20px;
          color: #f8fafc;
          font-weight: 600;
        }
        
        .footer-section p {
          color: #cbd5e1;
          margin-bottom: 20px;
          line-height: 1.6;
        }
        
        .footer-section ul {
          list-style: none;
        }
        
        .footer-section ul li {
          margin-bottom: 12px;
        }
        
        .footer-section ul li a {
          color: #cbd5e1;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .footer-section ul li a:hover {
          color: #0ea5e9;
        }
        
        .footer-bottom {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #334155;
        }
        
        .footer-bottom p {
          color: #94a3b8;
          font-size: 14px;
        }
        
        /* Responsive Styles */
        @media (max-width: 768px) {
          .header {
            padding: 16px 5%;
          }
          
          .logo {
            font-size: 22px;
          }
          
          .nav button {
            margin-left: 10px;
            padding: 8px 16px;
            font-size: 14px;
          }
          
          .hero {
            padding: 60px 5%;
          }
          
          .hero h1 {
            font-size: 32px;
            margin-bottom: 16px;
          }
          
          .hero p {
            font-size: 16px;
            margin-bottom: 30px;
          }
          
          .cta-btn {
            padding: 14px 24px;
            font-size: 16px;
          }
          
          .footer-content {
            flex-direction: column;
            gap: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;