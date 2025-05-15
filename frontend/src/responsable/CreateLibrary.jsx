import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LibraryManager = () => {
  const [libraries, setLibraries] = useState([]);
  const [form, setForm] = useState({
    name: '',
    address: '',
    email: '',
  });
  const [message, setMessage] = useState('');

  const fetchLibraries = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/libraries');
      setLibraries(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des librairies', err);
    }
  };

  useEffect(() => {
    fetchLibraries();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/libraries', form);
      setMessage('✅ Librairie ajoutée avec succès');
      setForm({ name: '', address: '', email: '' });
      fetchLibraries();
    } catch (err) {
      console.error('Erreur lors de l’ajout', err);
      setMessage('❌ Erreur lors de l’ajout');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/libraries/${id}`);
      fetchLibraries();
    } catch (err) {
      console.error('Erreur lors de la suppression', err);
    }
  };

  return (
    <div className="library-container">
      <h2>📚 Gestion des Librairies</h2>

      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit} className="library-form">
        <input
          name="name"
          placeholder="Nom de la librairie"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Adresse"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          type="email"
        />
        <button type="submit">➕ Ajouter</button>
      </form>

      <div className="library-list">
        {libraries.map((lib) => (
          <div key={lib.id} className="library-card">
            <h3>{lib.name}</h3>
            <p><strong>📍 Adresse :</strong> {lib.address}</p>
            <p><strong>📧 Email :</strong> {lib.email || 'Non renseigné'}</p>
            <button onClick={() => handleDelete(lib.id)}>🗑 Supprimer</button>
          </div>
        ))}
      </div>

      <style>{`
        body {
          background-color: #f2f5f7;
        }

        .library-container {
          max-width: 1000px;
          margin: 40px auto;
          padding: 40px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          font-family: 'Segoe UI', sans-serif;
        }

        h2 {
          text-align: center;
          color: #1e272e;
          font-size: 32px;
          margin-bottom: 30px;
        }

        .message {
          text-align: center;
          margin-bottom: 20px;
          font-weight: bold;
          color: #27ae60;
        }

        .library-form {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: space-between;
          margin-bottom: 40px;
        }

        .library-form input {
          flex: 1 1 30%;
          padding: 12px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 10px;
        }

        .library-form button {
          padding: 12px 24px;
          background-color: #27ae60;
          color: white;
          font-size: 16px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .library-form button:hover {
          background-color: #219150;
        }

        .library-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .library-card {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 14px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          transition: transform 0.2s;
        }

        .library-card:hover {
          transform: translateY(-5px);
        }

        .library-card h3 {
          margin: 0 0 10px;
          color: #2c3e50;
        }

        .library-card p {
          margin: 5px 0;
          color: #555;
        }

        .library-card button {
          margin-top: 10px;
          padding: 8px 16px;
          background-color: #e74c3c;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        .library-card button:hover {
          background-color: #c0392b;
        }
      `}</style>
    </div>
  );
};

export default LibraryManager;
