import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8002/api/auth/users", {
        params: { role: "client" },
      });
      setUsers(res.data);
      setError("");
    } catch (err) {
      console.error("Erreur lors du chargement des utilisateurs", err);
      setError("Erreur lors du chargement des utilisateurs");
      setUsers([]);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
    try {
      await axios.delete(`http://localhost:8002/api/auth/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Erreur lors de la suppression", err);
      setError("Erreur lors de la suppression de l'utilisateur");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.username || !form.email || !form.password) {
      setError("Tous les champs sont obligatoires");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:8002/api/auth/register", {
        ...form,
        role: "client",
      });
      setForm({ username: "", email: "", password: "" });
      fetchUsers();
    } catch (err) {
      console.error("Erreur lors de l'inscription", err);
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Liste des utilisateurs clients</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 space-y-4 max-w-md">
        <div>
          <label className="block font-medium">Nom d'utilisateur</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block font-medium">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Inscription..." : "Inscrire un client"}
        </button>
      </form>

      {users.length === 0 ? (
        <p>Aucun utilisateur trouvé.</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.id} // ici on prend user.id
              className="flex justify-between items-center bg-gray-100 p-2 rounded"
            >
              <span>
                {user.username || "Nom inconnu"} - {user.email} ({user.role})
              </span>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminUserList;
