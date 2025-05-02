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
    <div className="books-container">
      <h1>Liste des livres</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id} className="book-item">
            <h2>{book.title}</h2>
            <p>Auteur : {book.author}</p>
            <p>Prix : {book.price}€</p>
            <p>Description : {book.description}</p>
            <p>
              Librairies :
              {book.libraries.map((library) => (
                <span key={library.id}>{library.name}</span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
