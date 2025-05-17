// src/Models/commande.js
const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      livreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Livre' }, // Référence vers le modèle Livre
      quantity: Number,
    }
  ],
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Commande', commandeSchema);
