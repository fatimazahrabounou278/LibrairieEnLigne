import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const isHomePage = location.pathname === "/admin" || location.pathname === "/admin/";

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
          <h2>Administration</h2>
          <button className="close-sidebar" onClick={toggleMobileSidebar}>×</button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li className={isActive("/admin/responsables") ? "active" : ""}>
              <Link to="/admin/responsables">
                <svg className="nav-icon" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                Gérer Responsables
              </Link>
            </li>
            <li className={isActive("/admin/livres") ? "active" : ""}>
              <Link to="/admin/livres">
                <svg className="nav-icon" viewBox="0 0 24 24">
                  <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
                </svg>
                Livres Clients
              </Link>
            </li>
            <li className={isActive("/admin/commandes") ? "active" : ""}>
              <Link to="/admin/commandes">
                <svg className="nav-icon" viewBox="0 0 24 24">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
                Commandes
              </Link>
            </li>
            <li className={isActive("/admin/ListUsers") ? "active" : ""}>
              <Link to="/admin/ListUsers">
                <svg className="nav-icon" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
                Liste Utilisateurs
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
        {isHomePage && (
          <div className="welcome-card">
            <div className="welcome-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
              </svg>
            </div>
            <div className="welcome-content">
              <h1>Bonjour Admin</h1>
              <p>Bienvenue dans votre tableau de bord d'administration.</p>
              <div className="dashboard-actions">
                <Link to="/admin/responsables" className="action-button">
                  Gérer les Responsables
                </Link>
                <Link to="/admin/commandes" className="action-button">
                  Voir les Commandes
                </Link>
              </div>
            </div>
          </div>
        )}
        <Outlet />
      </main>

      {/* Overlay pour fermer le menu mobile en cliquant à l'extérieur */}
      {isMobileSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleMobileSidebar}></div>
      )}

      <style>{`
        /* Variables globales */
        :root {
          --primary-color: #3498db;
          --primary-dark: #2980b9;
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
          background-color: #f0f7ff;
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

export default AdminDashboard;