require("dotenv").config({ path: ".env.local" });
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Utilisation de STARTTLS
  auth: {
    user: process.env.MAIL_USER, // L'email
    pass: process.env.MAIL_PASS, // Le mot de passe d'application
  },
});

transporter.sendMail({
  from: process.env.MAIL_USER,
  to: process.env.MAIL_USER,
  subject: "Test Email",
  text: "Ceci est un test de connexion à Gmail.",
}, (err, info) => {
  if (err) {
    console.log("Erreur:", err);
  } else {
    console.log("Email envoyé:", info);
  }
});
