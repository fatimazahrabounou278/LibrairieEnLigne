import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get('http://localhost:5000/api/orders');
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Commandes / Réservations</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Client</th>
            <th className="border px-4 py-2">Livre</th>
            <th className="border px-4 py-2">Quantité</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border px-4 py-2">{order.user.username}</td>
              <td className="border px-4 py-2">{order.book.title}</td>
              <td className="border px-4 py-2">{order.quantity}</td>
              <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
