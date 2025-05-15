import React, { useEffect, useState } from "react";
import axios from "axios";

const ResponsableManager = () => {
  const [responsables, setResponsables] = useState([]);
  const [newResponsable, setNewResponsable] = useState({ username: "", email: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchResponsables();
  }, []);

  const fetchResponsables = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/responsables");
      setResponsables(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des responsables :", err);
      setError("Impossible de charger les responsables.");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/responsables", newResponsable);
      setNewResponsable({ username: "", email: "" });
      fetchResponsables();
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
      setError("Erreur lors de l'ajout du responsable.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/responsables/${id}`);
      fetchResponsables();
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      setError("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Gérer les Responsables</h2>

      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleAdd} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Nom"
          value={newResponsable.username}
          onChange={(e) => setNewResponsable({ ...newResponsable, username: e.target.value })}
          required
          className="border p-2 rounded w-1/3"
        />
        <input
          type="email"
          placeholder="Email"
          value={newResponsable.email}
          onChange={(e) => setNewResponsable({ ...newResponsable, email: e.target.value })}
          required
          className="border p-2 rounded w-1/3"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Ajouter
        </button>
      </form>

      <ul className="space-y-2">
        {responsables.map((r) => (
          <li key={r._id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{r.username}</p>
              <p className="text-sm text-gray-600">{r.email}</p>
            </div>
            <button
              onClick={() => handleDelete(r._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResponsableManager;
