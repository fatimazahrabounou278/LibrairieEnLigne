// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Importation de la fonction de connexion à MongoDB
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();

// Connexion à la base de données MongoDB
connectDB(); // Connexion à MongoDB avant de démarrer le serveur

// Middleware pour analyser les corps de requêtes JSON
app.use(express.json());

// Middleware CORS pour autoriser les requêtes depuis un frontend local
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,  // Permettre les cookies et sessions
}));

// Utiliser les routes d'authentification
app.use('/api/auth', authRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
