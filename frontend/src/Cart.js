import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/cart')
      .then(res => {
        setCartItems(res.data.items);
        const calculatedTotal = res.data.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(calculatedTotal);
      })
      .catch(err => console.error('Erreur de chargement du panier:', err));
  }, []);

  const handleRemove = (id) => {
    axios.delete(`http://localhost:5000/api/cart/${id}`)
      .then(() => setCartItems(prev => prev.filter(item => item.id !== id)))
      .catch(err => console.error('Erreur suppression article:', err));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-4">Votre panier</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Votre panier est vide.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map(item => (
              <li key={item.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p>Quantité : {item.quantity}</p>
                  <p>Prix : {item.price}€</p>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
          <div className="text-right mt-6 text-lg font-semibold">
            Total : {total.toFixed(2)} €
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
