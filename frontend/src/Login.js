import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', credentials);
      const { role } = res.data;

      if (role === 'admin') navigate('/admin');
      else if (role === 'responsable') navigate('/responsable/dashboard');
      else navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Connexion</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Se connecter</button>
        </form>
      </div>

      <style>{`
        .login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(to right, #e0f7fa, #ffffff);
          font-family: 'Segoe UI', sans-serif;
        }

        .login-box {
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
        }

        input {
          padding: 12px 15px;
          margin-bottom: 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
          outline: none;
          transition: border 0.2s;
        }

        input:focus {
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

        .error-message {
          color: #e74c3c;
          margin-bottom: 16px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Login;
