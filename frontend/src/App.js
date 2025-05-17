import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BooksList from "./User/BooksList"; 
import BookDetailPage from './User/BookDetailPage';
import BookstorePage from './User/BookstorePage';
import Register from "./Register";
import Login from "./Login";
import ResponsableDashboard from "./responsable/ResponsableDashboard";
import BookManager from "./responsable/BookManager";
import Orders from "./responsable/Orders";
import CreateLibrary from "./responsable/CreateLibrary";
import HomePage from "./HomePage";
import MesCommandes from "./User/Cart";
import AdminDashboard from "./admin/AdminDashboard";
import ResponsableManager from "./admin/ResponsableManager";
import ClientBooks from "./admin/ClientBooks";
import AdminOrders from "./admin/AdminOrders";
import AdminUserList from './admin/listUsers';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<BooksList />} />
        
        <Route path="/books/:id" element={<BookDetailPage />} />
        {/* Route avec paramètre name pour la librairie */}
        <Route path="/bookstores/:name" element={<BookstorePage />} />

        <Route path="/cart" element={<MesCommandes />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/responsable/dashboard" element={<ResponsableDashboard />} />
        <Route path="/responsable/reservations" element={<Orders />} />
        <Route path="/responsable/create-library" element={<CreateLibrary />} />
        <Route path="/responsable/books" element={<BookManager />} />

        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="responsables" element={<ResponsableManager />} />
          <Route path="livres" element={<ClientBooks />} />
          <Route path="commandes" element={<AdminOrders />} />
          <Route path="/admin/listUsers" element={<AdminUserList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
