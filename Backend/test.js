const express = require('express');
const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
  res.send('Serveur de test');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur de test lancé sur le port ${PORT}`);
});