import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/api/books/${id}`);
        if (isMounted) {
          if (response.data && Object.keys(response.data).length > 0) {
            setBook(response.data);
          } else {
            setError('Livre introuvable');
          }
        }
      } catch (error) {
        if (isMounted) {
          setError('Erreur lors de la récupération du livre');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBook();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleReservation = () => {
    alert(`📚 Réservation effectuée pour "${book.title}"`);
  };

  if (loading) return <p className="books-container">Chargement...</p>;
  if (error) return <p className="books-container" style={{ color: 'red' }}>{error}</p>;
  if (!book) return null;

  return (
    <div className="books-page">
      <header className="books-header">
        <h1>Détails du Livre</h1>
        <nav>
          <Link to="/home" style={{ marginRight: 10 }}>Accueil</Link>
          <Link to="/cart" style={{ marginRight: 10 }}>Panier</Link>
          <Link to="/profile">Mon compte</Link>
        </nav>
      </header>

      <div style={{ textAlign: 'center', marginTop: 20 }}>
        {/* Ici on enlève le lien vers /bookstores/:name car il faut un nom réel */}
        {book.bookstore && (
          <Link
            to={`/bookstores/${encodeURIComponent(book.bookstore)}`}
            style={{ fontWeight: 'bold', textDecoration: 'underline', color: '#007BFF' }}
          >
            📚 Voir tous les livres de {book.bookstore}
          </Link>
        )}
      </div>

      <div className="books-container" style={{ justifyContent: 'center' }}>
        <div
          style={{
            backgroundColor: 'white',
            padding: 25,
            borderRadius: 12,
            maxWidth: 900,
            width: '100%',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 30,
            alignItems: 'flex-start',
          }}
        >
          <img
            src={
              book.image
                ? book.image.startsWith('http')
                  ? book.image
                  : `/${book.image}`
                : '/default-book.jpg'
            }
            alt={book.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/default-book.jpg';
            }}
            style={{ width: 280, height: 400, objectFit: 'cover', borderRadius: 8 }}
          />

          <div style={{ flex: '1 1 300px' }}>
            <h2 style={{ marginTop: 0 }}>{book.title}</h2>
            <p><strong>Auteur :</strong> {book.author}</p>
            <p><strong>Prix :</strong> {(Number(book.price) || 0).toFixed(2)} €</p>
            <p>
              <strong>Stock :</strong>{' '}
              {book.stock > 0 ? (
                <span style={{ color: 'green' }}>{book.stock} en stock</span>
              ) : (
                <span style={{ color: 'red' }}>Rupture de stock</span>
              )}
            </p>
            <p><strong>Description :</strong> {book.description}</p>

            <button
              onClick={handleReservation}
              disabled={book.stock <= 0}
              title={book.stock <= 0 ? 'Stock épuisé' : ''}
              style={{
                marginTop: 25,
                padding: '12px 24px',
                fontSize: 16,
                backgroundColor: book.stock > 0 ? '#4CAF50' : '#999',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: book.stock > 0 ? 'pointer' : 'not-allowed',
              }}
            >
              Réserver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;