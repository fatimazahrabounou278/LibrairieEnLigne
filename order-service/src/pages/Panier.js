import React, { useState } from 'react';
import axios from 'axios';

const Panier = () => {
  const [items, setItems] = useState([
    { bookId: '1', quantity: 2 },
    { bookId: '3', quantity: 1 }
  ]);

  const userId = localStorage.getItem("userId") || "u123";
  const total = 45.50; // Simulé

  const validerCommande = async () => {
    try {
      await axios.post('http://localhost:8002/api/commandes', {
        userId,
        items,
        total
      });
      alert("Commande validée !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la validation.");
    }
  };

  return (
    <div>
      <h2>🛒 Mon Panier</h2>
      <ul>
[11:18, 17/04/2025] ChatGPT: {items.map((item, i) => (
          <li key={i}>Livre ID: {item.bookId} — Quantité: {item.quantity}</li>
        ))}
      </ul>
      <p>Total: {total} €</p>
      <button onClick={validerCommande}>Valider ma commande</button>
    </div>
  );
};

export default Panier;