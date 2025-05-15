import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage('Inscription réussie !');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l’inscription.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Créer un compte</h2>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Adresse email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">-- Sélectionner un rôle --</option>
            <option value="user">Utilisateur</option>
            <option value="admin">Admin</option>
            <option value="responsable">Responsable</option>
          </select>
          <button type="submit">S'inscrire</button>
        </form>
      </div>

      <style>{`
        .register-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(to right, #dff9fb, #ffffff);
          font-family: 'Segoe UI', sans-serif;
        }

        .register-box {
          background-color: white;
          padding: 40px 30px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }

        h2 {
          text-align: center;
          margin-bottom: 24px;
          color: #2c3e50;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        input, select {
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
          outline: none;
          transition: border 0.2s;
        }

        input:focus, select:focus {
          border-color: #3498db;
        }

        button {
          padding: 12px;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        button:hover {
          background-color: #2980b9;
        }

        .success-message {
          color: #27ae60;
          text-align: center;
          margin-bottom: 10px;
        }

        .error-message {
          color: #e74c3c;
          text-align: center;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default Register;
