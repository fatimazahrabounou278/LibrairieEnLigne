import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [booksById, setBooksById] = useState({});
  const [error, setError] = useState(null);
  
  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(6); // 3 cartes par ligne × 2 lignes

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8002/api/commandes");
        const ordersData = res.data;
        setOrders(ordersData);

        // Extraire tous les bookIds uniques
        const bookIds = new Set();
        ordersData.forEach(order => {
          order.items?.forEach(item => {
            if (item.bookId || item.bookID) {
              bookIds.add(item.bookId || item.bookID);
            }
          });
        });

        // Récupérer les détails des livres
        const booksDetails = {};
        await Promise.all(
          Array.from(bookIds).map(async (id) => {
            try {
              const res = await axios.get(`http://localhost:8001/api/books/${id}`);
              booksDetails[id] = res.data;
            } catch (e) {
              booksDetails[id] = { title: "Livre inconnu", author: "N/A" };
            }
          })
        );

        setBooksById(booksDetails);
      } catch (err) {
        console.error("Erreur lors de la récupération des commandes.", err);
        setError("Erreur lors de la récupération des commandes.");
      }
    };
    fetchOrders();
  }, []);

  // Logique de pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2>Commandes Clients</h2>
      </div>
      {error && <div className="error-message">{error}</div>}

      {orders.length === 0 ? (
        <div className="no-orders">Aucune commande trouvée.</div>
      ) : (
        <>
          <div className="orders-list">
            {currentOrders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <span className="order-id">Commande #{order._id.slice(-6)}</span>
                    <span className="order-date">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : "N/A"}
                    </span>
                  </div>
                  <div className="order-total">
                    Total: <span>{order.total?.toFixed(2) || "0.00"} €</span>
                  </div>
                </div>
                
                <div className="order-client">
                  <strong>Client:</strong> {order.userId || "Inconnu"}
                </div>
                
                <div className="order-items">
                  <h4>Articles</h4>
                  {order.items?.length > 0 ? (
                    <ul className="items-list">
                      {order.items.map((item, index) => {
                        const bookId = item.bookId || item.bookID;
                        const book = booksById[bookId];
                        return (
                          <li key={index} className="item">
                            <div className="item-details">
                              <div className="item-title">{book ? book.title : "Livre inconnu"}</div>
                              <div className="item-author">par {book ? book.author : "N/A"}</div>
                            </div>
                            <div className="item-quantity">
                              <span>Quantité: {item.quantity || 0}</span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div className="no-items">Aucun article dans cette commande.</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
                className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
              >
                &laquo; Précédent
              </button>
              
              <div className="pagination-numbers">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
              >
                Suivant &raquo;
              </button>
            </div>
          )}
        </>
      )}

      <style jsx>{`
        .orders-container {
          width: 100%;
          max-width: 1200px;
          padding: 30px;
          margin: 0 auto;
        }
        
        .orders-header {
          margin-bottom: 20px;
          width: 100%;
          background-color: white;
          padding: 15px 20px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        
        h2 {
          color: #2c3e50;
          margin: 0;
          font-size: 22px;
          padding-bottom: 10px;
          border-bottom: 2px solid #3498db;
          width: 100%;
          text-align: left;
          font-weight: 600;
          display: block;
        }
        
        .error-message {
          background-color: #ffeded;
          border-left: 4px solid #e74c3c;
          color: #c0392b;
          padding: 12px 16px;
          border-radius: 4px;
          margin-bottom: 20px;
        }
        
        .no-orders {
          background-color: #f8f9fa;
          padding: 32px;
          text-align: center;
          border-radius: 8px;
          color: #7f8c8d;
          font-style: italic;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .orders-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 30px;
        }
        
        .order-card {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          height: 100%;
          display: flex;
          flex-direction: column;
          font-size: 0.95rem;
        }
        
        .order-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
        
        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #2c3e50;
          color: white;
          padding: 8px 16px;
        }
        
        .order-info {
          display: flex;
          flex-direction: column;
        }
        
        .order-id {
          font-weight: bold;
          font-size: 14px;
        }
        
        .order-date {
          font-size: 12px;
          opacity: 0.8;
        }
        
        .order-total {
          font-size: 14px;
          font-weight: bold;
        }
        
        .order-client {
          padding: 10px 16px;
          border-bottom: 1px solid #ecf0f1;
          font-size: 14px;
          color: #34495e;
        }
        
        .order-items {
          padding: 10px 16px;
          flex-grow: 1;
        }
        
        .order-items h4 {
          margin-top: 0;
          color: #2c3e50;
          font-size: 14px;
          margin-bottom: 8px;
        }
        
        .items-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #ecf0f1;
        }
        
        .item:last-child {
          border-bottom: none;
        }
        
        .item-details {
          flex: 1;
        }
        
        .item-title {
          font-weight: 600;
          margin-bottom: 2px;
          color: #2c3e50;
          font-size: 13px;
        }
        
        .item-author {
          font-size: 12px;
          color: #7f8c8d;
        }
        
        .item-quantity {
          background-color: #e9f7fe;
          color: #2c3e50;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .no-items {
          color: #95a5a6;
          font-style: italic;
          text-align: center;
          padding: 20px 0;
        }
        
        /* Styles pour la pagination */
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 30px;
          padding: 15px 0;
        }
        
        .pagination-button {
          background-color: #2c3e50;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .pagination-button:hover:not(.disabled) {
          background-color: #34495e;
        }
        
        .pagination-button.disabled {
          background-color: #bdc3c7;
          cursor: not-allowed;
          opacity: 0.7;
        }
        
        .pagination-numbers {
          display: flex;
          margin: 0 15px;
        }
        
        .pagination-number {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 5px;
          border: 1px solid #e0e0e0;
          background-color: white;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .pagination-number:hover:not(.active) {
          background-color: #f5f5f5;
        }
        
        .pagination-number.active {
          background-color: #2c3e50;
          color: white;
          border-color: #2c3e50;
          font-weight: bold;
        }
        
        /* Style responsive */
        @media (max-width: 1024px) {
          .orders-list {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .orders-list {
            grid-template-columns: 1fr;
          }
          
          .pagination {
            flex-direction: column;
            gap: 10px;
          }
          
          .orders-container {
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminOrders;