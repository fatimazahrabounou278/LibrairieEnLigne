import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await axios.get('http://localhost:8002/api/commandes');

        setReservations(res.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Liste des Réservations</h1>
      {reservations.length === 0 ? (
        <p>Aucune réservation trouvée.</p>
      ) : (
        <ul>
          {reservations.map((res) => (
            <li key={res._id}>
              <strong>Client :</strong> {res.userId} <br />
              <strong>Livres :</strong> {res.items.map(i => `${i.bookId} (x${i.quantity})`).join(', ')} <br />
              <strong>Total :</strong> {res.total} DH
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
