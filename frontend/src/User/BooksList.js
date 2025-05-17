import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./BooksList.css";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(() => {
    // Charger le panier depuis localStorage si existant
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [message, setMessage] = useState("");

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

  const addToCart = (book) => {
    // Vérifier si le livre est déjà dans le panier
    const exists = cart.find((item) => item.id === book.id);
    let newCart;
    if (exists) {
      // Augmenter la quantité
      newCart = cart.map((item) =>
        item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // Ajouter nouveau livre avec quantité 1
      newCart = [...cart, { ...book, quantity: 1 }];
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setMessage(`✔️ "${book.title}" ajouté au panier !`);
    // Effacer le message après 2s
    setTimeout(() => setMessage(""), 2000);
  };

  if (loading) {
    return <div className="books-container">Chargement...</div>;
  }

  return (
    <div className="books-page">
      <header className="books-header">
        <h1>Library</h1>
        <nav>
          <a href="/home">Accueil</a>
          <a href="/cart">
            Panier ({cart.reduce((acc, item) => acc + item.quantity, 0)})
          </a>
          <a href="/profile">Mon compte</a>
        </nav>
      </header>

      {message && <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>}

      <div className="books-container">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h2>{book.title}</h2>
            <p>
              <strong>Auteur :</strong> {book.author}
            </p>
            <p>
              <strong>Prix :</strong> {book.price} €
            </p>
            <p>
              <strong>Description :</strong> {book.description}
            </p>
            <p>
              <strong>Librairies :</strong>{" "}
              {book.libraries.map((lib) => lib.name).join(", ")}
            </p>

            <button className="buy-button" onClick={() => addToCart(book)}>
              Acheter
            </button>

            <Link
              to={`/books/${book.id}`}
              style={{ marginLeft: "10px", textDecoration: "none" }}
            >
              <button className="details-button">Détails</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksList;
