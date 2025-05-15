import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Admin</h2>
        <ul>
          <li><Link to="/admin/responsables">Gérer Responsables</Link></li>
          <li><Link to="/admin/livres">Livres Clients</Link></li>
          <li><Link to="/admin/commandes">Commandes</Link></li>
        </ul>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>

      <style>{`
        .admin-dashboard {
          display: flex;
          height: 100vh;
          font-family: 'Segoe UI', sans-serif;
        }
        .sidebar {
          width: 250px;
          background-color: #2c3e50;
          color: white;
          padding: 20px;
        }
        .sidebar h2 {
          margin-bottom: 30px;
        }
        .sidebar ul {
          list-style: none;
          padding: 0;
        }
        .sidebar li {
          margin: 15px 0;
        }
        .sidebar a {
          color: white;
          text-decoration: none;
          font-weight: 500;
        }
        .sidebar a:hover {
          text-decoration: underline;
        }
        .main-content {
          flex: 1;
          padding: 40px;
          background: #ecf0f1;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
