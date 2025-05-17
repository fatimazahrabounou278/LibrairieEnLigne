const express = require('express');
const router = express.Router();
const Commande = require('../Models/commande');

// 🛒 Créer une commande
router.post('/', async (req, res) => {
  try {
    const { userId, items, total, livreId, quantite } = req.body;
    let commande;

    // 🎯 Format simplifié
    if (livreId && quantite) {
      const item = { bookId: livreId, quantity: quantite };
      commande = new Commande({
        userId: userId || "demo-user",
        items: [item],
        total: 0,
      });
    }

    // 🎯 Format classique
    else if (userId && items && total !== undefined) {
      commande = new Commande({ userId, items, total });
    }

    else {
      return res.status(400).json({ message: "Champs manquants ou invalides" });
    }

    await commande.save();

    // ✅ Envoyer événement RabbitMQ
    const channel = req.app.get("rabbitChannel");
    if (channel) {
      channel.sendToQueue("order.placed", Buffer.from(JSON.stringify({
        userId: commande.userId,
        items: commande.items,
        total: commande.total,
        orderId: commande._id
      })));
      console.log(`✅ Commande ${commande._id} envoyée à RabbitMQ`);
    } else {
      console.warn("⚠️ RabbitMQ non connecté, événement non publié.");
    }

    res.status(201).json({ message: "Commande créée avec succès", commande });
  } catch (err) {
    console.error("❌ Erreur lors de la création de la commande :", err);
    res.status(500).json({ message: "Erreur lors de la création de la commande", error: err.message || err });
  }
});

// 📜 Historique commandes utilisateur
router.get('/:userId', async (req, res) => {
  try {
    const commandes = await Commande.find({ userId: req.params.userId });
    if (commandes.length === 0) {
      return res.status(404).json({ message: "Aucune commande trouvée pour cet utilisateur" });
    }
    res.json(commandes);
  } catch (err) {
    console.error("❌ Erreur lors de la récupération des commandes :", err);
    res.status(500).json({ message: "Erreur lors de la récupération des commandes", error: err.message || err });
  }
});


// 🔎 Récupérer toutes les commandes (pour le responsable)
router.get('/', async (req, res) => {
  try {
    const commandes = await Commande.find();
    res.json(commandes);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message || err });
  }
});



module.exports = router;
