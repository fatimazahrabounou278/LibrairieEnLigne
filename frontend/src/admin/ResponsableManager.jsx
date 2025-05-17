import React, { useEffect, useState } from "react";
import axios from "axios";

const ResponsableManager = () => {
  const [responsables, setResponsables] = useState([]);
  const [newResponsable, setNewResponsable] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Token fictif stocké dans localStorage (à remplacer par vrai token JWT)
  const token = localStorage.getItem("token") || "token-factice";

  useEffect(() => {
    fetchResponsables();
  }, []);

  const fetchResponsables = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/users?role=responsable",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResponsables(res.data);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les responsables.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (
      !newResponsable.username ||
      !newResponsable.email ||
      !newResponsable.password
    ) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/auth/responsables",
        newResponsable,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewResponsable({ username: "", email: "", password: "" });
      setSuccessMessage("Responsable ajouté avec succès!");
      fetchResponsables();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Erreur lors de l'ajout.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, username) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${username}?`)) {
      setError("");
      setSuccessMessage("");
      setLoading(true);
      try {
        await axios.delete(`http://localhost:5000/api/auth/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccessMessage(`${username} a été supprimé avec succès.`);
        fetchResponsables();
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la suppression.");
      } finally {
        setLoading(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="responsable-manager">
      <div className="page-header">
        <h2>Gérer les Responsables</h2>
        <p>Ajoutez ou supprimez des utilisateurs avec des droits de responsable</p>
      </div>

      <div className="content-container">
        <div className="form-container">
          <div className="card-header">
            <h3>Ajouter un responsable</h3>
          </div>

          {error && (
            <div className="alert alert-error">
              <svg className="alert-icon" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success">
              <svg className="alert-icon" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleAdd} autoComplete="off">
            <div className="form-group">
              <label htmlFor="username">Nom d'utilisateur</label>
              <div className="input-container">
                <svg className="input-icon" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <input
                  id="username"
                  type="text"
                  placeholder="Entrez le nom d'utilisateur"
                  value={newResponsable.username}
                  onChange={(e) =>
                    setNewResponsable({ ...newResponsable, username: e.target.value })
                  }
                  required
                  disabled={loading}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <svg className="input-icon" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <input
                  id="email"
                  type="email"
                  placeholder="Entrez l'adresse email"
                  value={newResponsable.email}
                  onChange={(e) =>
                    setNewResponsable({ ...newResponsable, email: e.target.value })
                  }
                  required
                  disabled={loading}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <div className="input-container">
                <svg className="input-icon" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrez le mot de passe"
                  value={newResponsable.password}
                  onChange={(e) =>
                    setNewResponsable({ ...newResponsable, password: e.target.value })
                  }
                  required
                  disabled={loading}
                  autoComplete="new-password"
                />
                <button 
                  type="button" 
                  className="password-toggle" 
                  onClick={togglePasswordVisibility}
                  tabIndex="-1"
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24">
                      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`submit-button ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="spinner" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <span>Chargement...</span>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
                  <span>Ajouter le responsable</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="list-container">
          <div className="card-header">
            <h3>Liste des responsables</h3>
            <button 
              onClick={fetchResponsables} 
              className="refresh-button" 
              disabled={loading}
              title="Rafraîchir la liste"
            >
              <svg viewBox="0 0 24 24">
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 9h7V2l-2.35 4.35z" />
              </svg>
            </button>
          </div>

          {loading && responsables.length === 0 ? (
            <div className="loading-container">
              <svg className="spinner large" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <p>Chargement des responsables...</p>
            </div>
          ) : responsables.length === 0 ? (
            <div className="empty-state">
              <svg viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
              </svg>
              <p>Aucun responsable trouvé</p>
              <span>Les responsables ajoutés apparaîtront ici</span>
            </div>
          ) : (
            <ul className="responsables-list">
              {responsables.map((r) => (
                <li key={r.id} className="responsable-item">
                  <div className="responsable-avatar">
                    {r.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="responsable-info">
                    <p className="responsable-name">{r.username}</p>
                    <p className="responsable-email">{r.email}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(r.id, r.username)}
                    className="delete-button"
                    disabled={loading}
                    title={`Supprimer ${r.username}`}
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <style>{`
        /* Variables globales */
        :root {
          --primary-color: #3498db;
          --primary-dark: #2980b9;
          --danger-color: #e74c3c;
          --danger-dark: #c0392b;
          --success-color: #2ecc71;
          --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          --transition: all 0.3s ease;
          --border-color: rgba(0, 0, 0, 0.1);
          --input-bg: #f8f9fa;
          --text-primary: #2c3e50;
          --text-secondary: #7f8c8d;
        }

        .responsable-manager {
          padding: 0 16px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 32px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 16px;
        }

        .page-header h2 {
          font-size: 24px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .page-header p {
          color: var(--text-secondary);
          font-size: 14px;
        }

        .content-container {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 24px;
        }

        .form-container, .list-container {
          background: white;
          border-radius: 12px;
          box-shadow: var(--card-shadow);
          overflow: hidden;
        }

        .card-header {
          padding: 16px 20px;
          background-color: #f8f9fa;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-header h3 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
        }

        form {
          padding: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 6px;
          font-size: 14px;
          color: var(--text-primary);
          font-weight: 500;
        }

        .input-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          width: 18px;
          height: 18px;
          fill: #95a5a6;
        }

        input {
          width: 100%;
          padding: 10px 10px 10px 40px;
          font-size: 14px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background-color: var(--input-bg);
          transition: var(--transition);
        }

        input:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
        }

        input:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .password-toggle svg {
          width: 20px;
          height: 20px;
          fill: #95a5a6;
        }

        .submit-button {
          width: 100%;
          padding: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background-color: var(--primary-color);
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .submit-button:hover:not(:disabled) {
          background-color: var(--primary-dark);
          transform: translateY(-1px);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-button svg {
          width: 18px;
          height: 18px;
          fill: currentColor;
        }

        .spinner {
          animation: rotate 1.5s linear infinite;
          width: 20px;
          height: 20px;
        }

        .spinner.large {
          width: 40px;
          height: 40px;
        }

        .spinner circle {
          stroke: currentColor;
          stroke-dasharray: 60, 200;
          stroke-dashoffset: 0;
          animation: dash 1.5s ease-in-out infinite;
        }

        @keyframes rotate {
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes dash {
          0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 200;
            stroke-dashoffset: -35px;
          }
          100% {
            stroke-dasharray: 90, 200;
            stroke-dashoffset: -125px;
          }
        }

        .alert {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          border-radius: 6px;
          margin: 16px 20px 0;
        }

        .alert-error {
          background-color: rgba(231, 76, 60, 0.1);
          color: var(--danger-color);
        }

        .alert-success {
          background-color: rgba(46, 204, 113, 0.1);
          color: var(--success-color);
        }

        .alert-icon {
          width: 20px;
          height: 20px;
          fill: currentColor;
        }

        .refresh-button {
          background: none;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
        }

        .refresh-button:hover:not(:disabled) {
          background-color: var(--input-bg);
        }

        .refresh-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .refresh-button svg {
          width: 16px;
          height: 16px;
          fill: var(--text-primary);
        }

        .responsables-list {
          list-style: none;
          padding: 0;
          margin: 0;
          max-height: 400px;
          overflow-y: auto;
        }

        .responsable-item {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-color);
          transition: var(--transition);
        }

        .responsable-item:last-child {
          border-bottom: none;
        }

        .responsable-item:hover {
          background-color: #f8f9fa;
        }

        .responsable-avatar {
          width: 40px;
          height: 40px;
          background-color: var(--primary-color);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 16px;
          margin-right: 16px;
        }

        .responsable-info {
          flex: 1;
        }

        .responsable-name {
          font-weight: 500;
          margin-bottom: 4px;
          color: var(--text-primary);
        }

        .responsable-email {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .delete-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: var(--transition);
        }

        .delete-button:hover:not(:disabled) {
          background-color: rgba(231, 76, 60, 0.1);
        }

        .delete-button svg {
          width: 18px;
          height: 18px;
          fill: var(--danger-color);
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          color: var(--text-secondary);
        }

        .loading-container p {
          margin-top: 16px;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          color: var(--text-secondary);
          text-align: center;
        }

        .empty-state svg {
          width: 48px;
          height: 48px;
          fill: #bdc3c7;
          margin-bottom: 16px;
        }

        .empty-state p {
          font-size: 16px;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .empty-state span {
          font-size: 14px;
        }

        /* Responsive design */
        @media screen and (max-width: 992px) {
          .content-container {
            grid-template-columns: 1fr;
          }
        }

        @media screen and (max-width: 576px) {
          .responsable-manager {
            padding: 0 12px;
          }

          .page-header h2 {
            font-size: 20px;
          }

          .card-header {
            padding: 14px 16px;
          }

          form {
            padding: 16px;
          }

          .alert {
            margin: 12px 16px 0;
            padding: 10px;
          }

          .responsable-item {
            padding: 12px 16px;
          }

          .responsable-avatar {
            width: 36px;
            height: 36px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default ResponsableManager;