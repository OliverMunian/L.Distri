require('dotenv').config();
require("./model/connection");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");


const app = express();
const PORT = 4000;

var usersRouter = require('./routes/user');
var announcesRouter = require('./routes/announce')
var contactRouter = require('./routes/contact')

app.use(cors());
app.use(express.json());
app.use('/users', usersRouter);
app.use('/announces', announcesRouter);
app.use("/contact", contactRouter);

app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  setHeaders: (res, path) => {
    if (path.match(/\.(jpg|jpeg|png|webp|gif|svg)$/)) {
      res.set('Cache-Control', 'public, max-age=2592000'); //30jours
    } else {
      res.set('Cache-Control', 'public, max-age=86400');//1jour
    }
  }
}));


app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});