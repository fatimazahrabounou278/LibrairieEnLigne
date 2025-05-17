// "Base de données" fictive partagée ici
const users = [
  { id: 1, username: "admin", email: "admin@test.com", password: "admin123", role: "admin" },
  { id: 2, username: "responsable", email: "resp@test.com", password: "resp123", role: "responsable" },
  { id: 3, username: "client1", email: "client1@test.com", password: "client123", role: "client" },
];

const getUsersByRole = (req, res) => {
  const { role } = req.query;
  if (role) {
    return res.json(users.filter((u) => u.role === role));
  }
  res.json(users);
};

const addResponsable = (req, res) => {
  const { username, email, password } = req.body;
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "Email déjà utilisé" });
  }
  const newResponsable = {
    id: users.length + 1,
    username,
    email,
    password,
    role: "responsable",
  };
  users.push(newResponsable);
  res.status(201).json({ message: "Responsable ajouté avec succès" });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  users.splice(index, 1);
  res.json({ message: "Utilisateur supprimé" });
};

module.exports = {
  getUsersByRole,
  addResponsable,
  deleteUser,
};
