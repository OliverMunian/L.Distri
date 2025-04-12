process.on('uncaughtException', (err) => {
  console.error('Erreur non gérée !', err);
  // Gérer l'erreur et potentiellement quitter proprement
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Rejet de promesse non géré !', promise, 'raison:', reason);
  // Gérer le rejet et potentiellement quitter proprement
  process.exit(1);
});

require("dotenv").config({ path: ".env.local" });
require("./model/connection");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 4000;

var announcesRouter = require("./routes/announce");
var contactRouter = require("./routes/contact");
var loginRouter = require("./routes/login");

app.use(
  cors({
    origin: "https://www.ldistri.fr", // Permet les requêtes de ce domaine
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/announces", announcesRouter);
app.use("/api/contact", contactRouter);
app.use("/api/connect", loginRouter);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, path) => {
      if (path.match(/\.(jpg|jpeg|png|webp|gif|svg)$/)) {
        res.set("Cache-Control", "public, max-age=2592000"); //30jours
      } else {
        res.set("Cache-Control", "public, max-age=86400"); //1jour
      }
    },
  })
);

console.log("Avant app.listen()");
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
console.log("Après app.listen()");
