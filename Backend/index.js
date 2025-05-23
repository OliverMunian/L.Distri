require("dotenv").config()
console.log(">>> Dotenv loaded. MONGODB_URI is:", process.env.MONGODB_URI ? "SET" : "!!! UNDEFINED !!!");
require("./model/connection");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 4000;

var announcesRouter = require("./routes/announce");
var contactRouter = require("./routes/contact");
var loginRouter = require("./routes/login");


app.use(
  cors({
    origin: "https://www.ldistri.fr", // Permet les requêtes de ce domaine
  })
);
// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/announces", announcesRouter);
app.use("/api/contact", contactRouter);
app.use("/api/connect", loginRouter);

// app.use("/announces", announcesRouter);
// app.use("/contact", contactRouter);
// app.use("/connect", loginRouter);

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
// app.listen(PORT, () => {
//   console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
// });
console.log("Après app.listen()");
