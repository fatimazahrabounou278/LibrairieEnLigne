import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BooksList.css";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/books")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des livres :", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="books-container">Chargement...</div>;
  }

  return (
    <div className="books-page">
      <header className="books-header">
        <h1> Library</h1>
        <nav>
          <a href="/home">Accueil</a>
          <a href="/cart">Panier</a>
          <a href="/profile">Mon compte</a>
        </nav>
      </header>

      <div className="books-container">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h2>{book.title}</h2>
            <p><strong>Auteur :</strong> {book.author}</p>
            <p><strong>Prix :</strong> {book.price} €</p>
            <p><strong>Description :</strong> {book.description}</p>
            <p><strong>Librairies :</strong> {book.libraries.map(lib => lib.name).join(", ")}</p>
            <button className="buy-button">Acheter</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksList;
