import React from 'react';
import { Link } from 'react-router-dom';

const ResponsableDashboard = () => {
  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <h2>📘 Responsable</h2>
        <ul>
          <li><Link to="/responsable/create-library">Créer Librairie</Link></li>
          <li><Link to="/responsable/books">Gérer les Livres</Link></li>
          <li><Link to="/responsable/reservations">Réservations</Link></li>
        </ul>
      </nav>

      <div className="dashboard-content">
        <h1>Bienvenue sur votre tableau de bord</h1>
        <p>Sélectionnez une action dans le menu de gauche pour commencer.</p>
      </div>

      <style>{`
        .dashboard-container {
          display: flex;
          height: 100vh;
          font-family: 'Segoe UI', sans-serif;
          background-color: #f9fafb;
        }

        .sidebar {
          width: 240px;
          background-color: #2c3e50;
          color: white;
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
        }

        .sidebar h2 {
          font-size: 24px;
          margin-bottom: 30px;
        }

        .sidebar ul {
          list-style: none;
          padding: 0;
        }

        .sidebar ul li {
          margin-bottom: 20px;
        }

        .sidebar ul li a {
          color: white;
          text-decoration: none;
          font-size: 16px;
          transition: color 0.2s;
        }

        .sidebar ul li a:hover {
          color: #1abc9c;
        }

        .dashboard-content {
          flex: 1;
          padding: 60px 40px;
        }

        .dashboard-content h1 {
          font-size: 32px;
          color: #2c3e50;
          margin-bottom: 10px;
        }

        .dashboard-content p {
          font-size: 18px;
          color: #555;
        }

        @media (max-width: 768px) {
          .dashboard-container {
            flex-direction: column;
          }

          .sidebar {
            width: 100%;
            flex-direction: row;
            justify-content: space-around;
            padding: 20px;
          }

          .sidebar ul {
            display: flex;
            flex-direction: row;
            gap: 20px;
          }

          .dashboard-content {
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default ResponsableDashboard;
