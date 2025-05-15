// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Remplace cette URL par l'URL de ta base de données MongoDB locale
    await mongoose.connect('mongodb://localhost:27017/librairieEnLigne', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error: ', error);
    process.exit(1); // Arrêter le processus si la connexion échoue
  }
};

module.exports = connectDB;
