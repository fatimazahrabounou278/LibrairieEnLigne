import React, { useEffect, useState } from "react";
import axios from "axios";

const ClientBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
   // axios.get("http://localhost:8001/api/books").then((res) => setBooks(res.data));
  }, []);

  return (
    <div>
      <h2>Livres ajoutés par les clients</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} - {book.author} - {book.price} €
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientBooks;
