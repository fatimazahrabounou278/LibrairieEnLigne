import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8001/api/books");
        setBooks(res.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la récupération des livres.");
      }
    };

    fetchBooks();
  }, []);

  return (
    <div style={{
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      padding: "16px",
      margin: "20px 0"
    }}>
      <h2 style={{
        fontSize: "20px",
        fontWeight: "600",
        marginBottom: "16px",
        color: "#333"
      }}>Livres ajoutés par tous les clients</h2>
      
      {error && 
        <div style={{
          backgroundColor: "#FEE2E2",
          borderLeft: "4px solid #EF4444",
          color: "#B91C1C",
          padding: "12px",
          marginBottom: "16px"
        }}>
          {error}
        </div>
      }
      
      <ul style={{
        listStyle: "none",
        padding: 0
      }}>
        {books.map((book) => (
          <li key={book._id || book.id} style={{
            borderBottom: "1px solid #E5E7EB",
            paddingBottom: "8px",
            marginBottom: "8px"
          }}>
            <span style={{ fontWeight: "500" }}>{book.title}</span> - {book.author} - <span style={{ color: "#2563EB" }}>{book.price} €</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminBooks;

