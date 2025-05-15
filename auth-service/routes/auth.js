const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Enregistrement
router.post('/register', register);

// Connexion
router.post('/login', login);

// Récupération des infos de l'utilisateur connecté
router.get('/me', authenticateToken, (req, res) => {
  res.json({
    message: "Utilisateur authentifié.",
    user: req.user,
  });
});

module.exports = router;
