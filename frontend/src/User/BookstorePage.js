import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookstorePage = () => {
  const { name } = useParams(); // récupère le paramètre "name" dans l’URL
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/books-with-libraries')
      .then((response) => {
        const allBooks = response.data;

        // Décoder le paramètre name pour correspondre aux noms réels
        const decodedName = decodeURIComponent(name).toLowerCase();

        // Filtrer les livres qui ont une librairie avec ce nom (insensible à la casse)
        const filteredBooks = allBooks.filter(book =>
          book.libraries.some(lib => lib.name.toLowerCase() === decodedName)
        );

        setBooks(filteredBooks);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des livres :', error);
        setLoading(false);
      });
  }, [name]);

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Livres disponibles dans la librairie : <strong>{decodeURIComponent(name)}</strong></h2>
      {books.length === 0 ? (
        <p>Aucun livre trouvé dans cette librairie.</p>
      ) : (
        <ul>
          {books.map(book => (
            <li key={book.id}>
              <strong>{book.title}</strong> – {book.author}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookstorePage;
