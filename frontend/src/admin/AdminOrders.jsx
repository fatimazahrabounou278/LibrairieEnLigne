import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
   // axios.get("http://localhost:5000/api/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>Commandes Clients</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Client : {order.clientName} — Total : {order.total} €
            <ul>
              {order.books.map((book) => (
                <li key={book._id}>{book.title} - {book.price} €</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOrders;
