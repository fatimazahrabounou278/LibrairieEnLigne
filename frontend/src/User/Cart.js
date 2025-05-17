import React, { useState, useEffect } from "react";

const MesCommandes = () => {
  const [commandes, setCommandes] = useState([]);
  const [sommeTotale, setSommeTotale] = useState(0);

  useEffect(() => {
    // Charger le panier depuis localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      setCommandes(cartItems);

      const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setSommeTotale(total);
    }
  }, []);

  return (
    <div>
      <h1>🛒 Mes Commandes</h1>
      <h2>💰 Total : {sommeTotale.toFixed(2)} €</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {commandes.length === 0 && <p>Votre panier est vide.</p>}

        {commandes.map((commande) => (
          <div
            key={commande.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
            }}
          >
            <img
              src={commande.image}
              alt={commande.title}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h3>{commande.title}</h3>
            <p>Auteur: {commande.author}</p>
            <p>Prix unitaire: {commande.price} €</p>
            <p>Quantité: {commande.quantity}</p>
            <p>Total: {(commande.price * commande.quantity).toFixed(2)} €</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MesCommandes;
