const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const amqplib = require("amqplib");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const commandeRoutes = require("./src/routes/commandes");

let channel, connection;

// ✅ Connexion à RabbitMQ
async function connectRabbit() {
  try {
    connection = await amqplib.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue("order.placed");
    console.log("✅ RabbitMQ connecté");

    // Injecter channel dans les routes (optionnel selon l’implémentation)
    app.set("rabbitChannel", channel);
  } catch (err) {
    console.error("❌ Erreur de connexion à RabbitMQ :", err.message || err);
  }
}

// ✅ Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connecté"))
  .catch(err => console.error("❌ Erreur MongoDB :", err.message || err));

// ✅ Routes des commandes
app.use("/api/commandes", commandeRoutes);

// 🚀 Lancer la connexion RabbitMQ avant le serveur
connectRabbit();

// ✅ Démarrer le serveur
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`🚀 Commande Service running on port ${PORT}`);
});
