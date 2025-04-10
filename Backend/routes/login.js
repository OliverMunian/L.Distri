var express = require("express");
var router = express.Router();
const multer = require("multer");
const bcrypt = require("bcrypt");



router.post("/api/signin", (req, res) => {
  if (req.body.password === process.env.ADMIN_PASSWORD) {
    return res.status(200).json({ success: true, message: "Vous êtes connecté !" });
  } else {
    return res.status(401).json({ success: false, message: "Mot de passe incorrect" });
  }
});

module.exports = router;
