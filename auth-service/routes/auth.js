const express = require("express");
const router = express.Router();

const {
  getUsersByRole,
  addResponsable,
  deleteUser,
} = require("../controllers/authController");

// Middleware d'authentification factice (à remplacer par JWT réel)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Token manquant" });
  // accepte n'importe quel token pour le test
  next();
};

// Middleware d'autorisation factice admin
const authorizeRoles = (role) => (req, res, next) => {
  // On simule un admin, pour test seulement
  if (role !== "admin") return res.status(403).json({ message: "Non autorisé" });
  next();
};

router.get("/users", authenticateToken, authorizeRoles("admin"), getUsersByRole);
router.post("/responsables", authenticateToken, authorizeRoles("admin"), addResponsable);
router.delete("/users/:id", authenticateToken, authorizeRoles("admin"), deleteUser);

module.exports = router;
