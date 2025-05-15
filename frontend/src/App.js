import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BooksList from "./BooksList";         // page d'accueil (accessible à tous)
import Register from "./Register";           // page d'inscription
import Login from "./Login";                 // page de connexion
import ResponsableDashboard from "./responsable/ResponsableDashboard"; // dashboard du responsable
import BookManager from "./responsable/BookManager";
import Orders from "./responsable/Orders";
import CreateLibrary from "./responsable/CreateLibrary";
import HomePage from "./HomePage";
import Cart from "./Cart";
import Profile from "./Profile";
import AdminDashboard from "./admin/AdminDashboard";
import ResponsableManager from "./admin/ResponsableManager";
import ClientBooks from "./admin/ClientBooks";
import AdminOrders from "./admin/AdminOrders";

function App() {
  return (
    <Router>
      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<BooksList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />

        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard Responsable */}
        <Route path="/responsable/dashboard" element={<ResponsableDashboard />} />
        <Route path="/responsable/reservations" element={<Orders />} />
        <Route path="/responsable/create-library" element={<CreateLibrary />} />
        <Route path="/responsable/books" element={<BookManager />} />

        {/* Dashboard Admin avec routes imbriquées */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="responsables" element={<ResponsableManager />} />
          <Route path="livres" element={<ClientBooks />} />
          <Route path="commandes" element={<AdminOrders />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
