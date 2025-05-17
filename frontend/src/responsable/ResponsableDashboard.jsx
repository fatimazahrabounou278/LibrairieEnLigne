import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ResponsableDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    // Logique de déconnexion
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // Déterminer quelle section est active
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="admin-dashboard">
      {/* Bouton hamburger pour mobile */}
      <button 
        className="mobile-menu-toggle"
        onClick={toggleMobileSidebar}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isMobileSidebarOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h2>📘 Responsable</h2>
          <button className="close-sidebar" onClick={toggleMobileSidebar}>×</button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li className={isActive("/responsable/create-library") ? "active" : ""}>
              <Link to="/responsable/create-library">
                <svg className="nav-icon" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
                Créer Librairie
              </Link>
            </li>
            <li className={isActive("/responsable/books") ? "active" : ""}>
              <Link to="/responsable/books">
                <svg className="nav-icon" viewBox="0 0 24 24">
                  <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
                </svg>
                Gérer les Livres
              </Link>
            </li>
            <li className={isActive("/responsable/reservations") ? "active" : ""}>
              <Link to="/responsable/reservations">
                <svg className="nav-icon" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                </svg>
                Réservations
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-button">
            <svg className="logout-icon" viewBox="0 0 24 24">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
            </svg>
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="welcome-card">
          <div className="welcome-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </div>
          <div className="welcome-content">
            <h1>Bienvenue sur votre tableau de bord</h1>
            <p>Sélectionnez une action dans le menu de gauche pour commencer.</p>
            <div className="dashboard-actions">
              <Link to="/responsable/create-library" className="action-button">
                Créer une Librairie
              </Link>
              <Link to="/responsable/books" className="action-button">
                Gérer les Livres
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Overlay pour fermer le menu mobile en cliquant à l'extérieur */}
      {isMobileSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleMobileSidebar}></div>
      )}

      <style>{`
        /* Variables globales */
        :root {
          --primary-color: #1abc9c;
          --primary-dark: #16a085;
          --sidebar-bg: #2c3e50;
          --sidebar-active: #1a252f;
          --sidebar-text: #ecf0f1;
          --danger-color: #e74c3c;
          --success-color: #2ecc71;
          --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          --transition: all 0.3s ease;
        }

        /* Reset et styles généraux */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .admin-dashboard {
          display: flex;
          height: 100vh;
          font-family: 'Segoe UI', 'Roboto', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Styles du sidebar */
        .sidebar {
          width: 280px;
          background-color: var(--sidebar-bg);
          color: var(--sidebar-text);
          display: flex;
          flex-direction: column;
          transition: var(--transition);
          z-index: 100;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
        }

        .sidebar-header {
          padding: 24px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .sidebar-header h2 {
          font-size: 1.5rem;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .close-sidebar {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
        }

        .sidebar-nav {
          flex-grow: 1;
          padding: 20px 0;
          overflow-y: auto;
        }

        .sidebar-nav ul {
          list-style: none;
        }

        .sidebar-nav li {
          margin: 8px 0;
          transition: var(--transition);
        }

        .sidebar-nav li.active {
          background-color: var(--sidebar-active);
        }

        .sidebar-nav a {
          color: var(--sidebar-text);
          text-decoration: none;
          font-weight: 400;
          display: flex;
          align-items: center;
          padding: 12px 24px;
          transition: var(--transition);
          border-left: 3px solid transparent;
        }

        .sidebar-nav li.active a {
          border-left-color: var(--primary-color);
        }

        .sidebar-nav a:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .nav-icon {
          width: 20px;
          height: 20px;
          margin-right: 12px;
          fill: currentColor;
        }

        .sidebar-footer {
          padding: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logout-button {
          background: none;
          border: 1px solid var(--danger-color);
          color: var(--danger-color);
          padding: 10px 16px;
          font-size: 15px;
          border-radius: 4px;
          cursor: pointer;
          width: 100%;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logout-button:hover {
          background-color: var(--danger-color);
          color: white;
        }

        .logout-icon {
          width: 16px;
          height: 16px;
          margin-right: 8px;
          fill: currentColor;
        }

        /* Contenu principal */
        .main-content {
          flex: 1;
          padding: 32px;
          background: #f5f7fa;
          overflow-y: auto;
          position: relative;
        }

        /* Carte de bienvenue */
        .welcome-card {
          background: white;
          border-radius: 12px;
          padding: 32px;
          box-shadow: var(--card-shadow);
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .welcome-icon {
          width: 80px;
          height: 80px;
          background-color: #e8f7f4;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .welcome-icon svg {
          width: 40px;
          height: 40px;
          fill: var(--primary-color);
        }

        .welcome-content {
          flex-grow: 1;
        }

        .welcome-card h1 {
          color: #2c3e50;
          margin-bottom: 12px;
          font-size: 28px;
          font-weight: 600;
        }

        .welcome-card p {
          color: #7f8c8d;
          margin-bottom: 24px;
          font-size: 16px;
          line-height: 1.5;
        }

        .dashboard-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .action-button {
          background-color: var(--primary-color);
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          font-weight: 500;
          text-decoration: none;
          transition: var(--transition);
          font-size: 14px;
        }

        .action-button:hover {
          background-color: var(--primary-dark);
          transform: translateY(-2px);
        }

        /* Responsive design pour mobile */
        .mobile-menu-toggle {
          display: none;
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 101;
          background-color: var(--primary-color);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .mobile-menu-toggle span {
          display: block;
          width: 20px;
          height: 2px;
          background-color: white;
          transition: var(--transition);
        }

        .sidebar-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 99;
        }

        /* Media queries pour responsive */
        @media screen and (max-width: 992px) {
          .sidebar {
            width: 240px;
          }
        }

        @media screen and (max-width: 768px) {
          .mobile-menu-toggle {
            display: flex;
          }

          .sidebar {
            position: fixed;
            left: -280px;
            height: 100vh;
          }

          .sidebar.mobile-open {
            left: 0;
          }

          .close-sidebar {
            display: block;
          }

          .sidebar-overlay {
            display: block;
          }

          .main-content {
            padding: 24px 16px;
          }

          .welcome-card {
            flex-direction: column;
            text-align: center;
            padding: 24px;
          }

          .dashboard-actions {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default ResponsableDashboard;