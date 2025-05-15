import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    author: '',
    price: '',
    stock: '',
    description: '',
    category: '',
    library_id: ''
  });
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:8001/api/books');
      setBooks(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors de la récupération des livres :', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:8001/api/books', form);
      setForm({ title: '', author: '', price: '', stock: '', description: '', category: '', library_id: '' });
      fetchBooks();
    } catch (err) {
      console.error('Erreur lors de l’ajout du livre :', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/api/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error('Erreur lors de la suppression du livre :', err);
    }
  };

  if (loading) return <div className="books-container">Chargement...</div>;

  return (
    <div className="books-container">
      <h1>Gestion des Livres</h1>

      <div className="form-container">
        <input name="title" placeholder="Titre" value={form.title} onChange={handleChange} />
        <input name="author" placeholder="Auteur" value={form.author} onChange={handleChange} />
        <input name="price" placeholder="Prix" value={form.price} onChange={handleChange} />
        <input name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} />
        <input name="category" placeholder="Catégorie" value={form.category} onChange={handleChange} />
        <input name="library_id" placeholder="ID de la librairie" value={form.library_id} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <button onClick={handleAdd}>Ajouter</button>
      </div>

      <ul>
        {books.map((book) => (
          <li key={book.id} className="book-item">
            <h2>{book.title}</h2>
            <p>Auteur : {book.author}</p>
            <p>Prix : {book.price}€</p>
            <p>Stock : {book.stock}</p>
            <p>Catégorie : {book.category}</p>
            <p>Description : {book.description}</p>
            <p>
              Librairies :
              {book.libraries?.map((library) => (
                <span key={library.id}> {library.name}</span>
              ))}
            </p>
            <button onClick={() => handleDelete(book.id)} className="delete-btn">
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      <style>{`
        .books-container {
          max-width: 1200px;
          margin: 40px auto;
          padding: 30px;
          background-color: #fdfdfd;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
          border-radius: 12px;
          font-family: 'Segoe UI', sans-serif;
        }

        .books-container h1 {
          text-align: center;
          color: #2c3e50;
          margin-bottom: 30px;
          font-size: 2em;
        }

        .form-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 15px;
          margin-bottom: 40px;
        }

        .form-container input,
        .form-container textarea {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 15px;
        }

        .form-container textarea {
          grid-column: span 2;
          resize: vertical;
          min-height: 80px;
        }

        .form-container button {
          grid-column: span 2;
          padding: 12px;
          background-color: #4a90e2;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.2s ease;
        }

        .form-container button:hover {
          background-color: #3c7acb;
        }

        .book-item {
          background-color: #ffffff;
          border: 1px solid #eaeaea;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        }

        .book-item h2 {
          color: #34495e;
          margin-bottom: 10px;
        }

        .book-item p {
          margin: 5px 0;
          color: #555;
        }

        .delete-btn {
          margin-top: 10px;
          padding: 8px 16px;
          background-color: #e74c3c;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .delete-btn:hover {
          background-color: #c0392b;
        }

        span {
          background-color: #ecf0f1;
          color: #333;
          padding: 2px 8px;
          margin-left: 5px;
          border-radius: 4px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default BookManager;
