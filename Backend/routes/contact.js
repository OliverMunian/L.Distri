require("dotenv").config({ path: ".env.local" });
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.post("/send", async (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;

  if (!firstName || !lastName || !email || !subject || !message) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});


  const logoPath = path.join(__dirname, "../public/logo.png");
  const logoCID = "logo@ldistri";

  // ✉️ 1. Envoi vers toi (admin)
  const adminMail = {
    from: `"L'DISTRI - Contact" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_USER, // ← vers toi-même
    subject: `📩 LDISTRI - Nouveau message de ${firstName} ${lastName} – ${subject}`,
    html: `
        <div style="font-family: Arial, sans-serif;">
        <img src="cid:${logoCID}" alt="Logo" style="width: 120px; margin-bottom: 20px;" />
          <h3>Nouveau message reçu depuis le formulaire de contact LDISTRI :</h3>
          <p><strong>Nom :</strong> ${lastName}</p>
          <p><strong>Prénom :</strong> ${firstName}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Sujet :</strong> ${subject}</p>
          <p><strong>Message :</strong></p>
          <p style="white-space: pre-line; background: #f5f5f5; padding: 10px; border-radius: 5px;">${message}</p>
        </div>
      `,
    attachments: [
      {
        filename: "logo.png",
        path: logoPath,
        cid: logoCID,
      },
    ],
  };

  // ✉️ 2. Réponse automatique au client
  const clientMail = {
    from: `"LDISTRI" <${process.env.MAIL_USER}>`,
    to: email,
    subject: `Merci pour votre message – ${subject}`,
    html: `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <img src="cid:${logoCID}" alt="Logo" style="width: 120px; margin-bottom: 20px;" />
          <h2>Bonjour ${firstName} ${lastName},</h2>
          <p>Merci pour votre message. Nous reviendrons vers vous rapidement.</p>
          <p style="margin-top: 20px;">À bientôt !<br/>L'équipe L'DISTRI</p>
        </div>
      `,
    attachments: [
      {
        filename: "logo.png",
        path: logoPath,
        cid: logoCID,
      },
    ],
  };

  try {
    // Envoie d'abord vers toi
    await transporter.sendMail(adminMail);
    // Ensuite vers le client
    await transporter.sendMail(clientMail);

    res.status(200).json({ message: "Emails envoyés avec succès !" });
  } catch (error) {
    console.error("Erreur Nodemailer :", error);
    res.status(500).json({ message: "Erreur lors de l'envoi des emails" });
  }
});

module.exports = router;
