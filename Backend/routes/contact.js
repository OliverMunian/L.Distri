require("dotenv").config({ path: ".env.local" });
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const router = express.Router();

router.post("/send", async (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;

  // Vérifie si tous les champs sont remplis
  if (!firstName || !lastName || !email || !subject || !message) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  // Configure le transporteur pour envoyer les emails
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Utilisation de STARTTLS
    auth: {
      user: process.env.MAIL_USER, // L'email d'authentification
      pass: process.env.MAIL_PASS, // Le mot de passe d'application
    },
  });

  const logoPath = path.join(__dirname, "../public/logo.png");
  const parisAirLogoPath = path.join(__dirname, "../public/ParisAir_logo.png");
  const logoCID = "logo@ldistri";
  const parisAirLogoCID = "parisAirLogo@ldistri";

  // ✉️ 1. Envoi vers toi (admin)
  const adminMail = {
    from: `"L'DISTRI - Contact" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_USER, // Ton email
    subject: `📩 Nouveau message de ${firstName} ${lastName} – ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <!-- Logo principal -->
        <img src="cid:${logoCID}" alt="Logo" style="width: 120px; margin-bottom: 20px;" />
        <h3>Nouveau message reçu depuis le formulaire de contact LDISTRI :</h3>
        <p><strong>Nom :</strong> ${lastName}</p>
        <p><strong>Prénom :</strong> ${firstName}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${subject}</p>
        <p><strong>Message :</strong></p>
        <p style="white-space: pre-line; background: #f5f5f5; padding: 10px; border-radius: 5px;">${message}</p>
        
        <!-- Logo ParisAir ajouté en bas -->
        <div style="text-align: center; margin-top: 20px;">
          <img src="cid:${parisAirLogoCID}" alt="ParisAir Logo" style="width: 80px;" />
        </div>
      </div>
    `,
    attachments: [
      {
        filename: "logo.png",
        path: logoPath,
        cid: logoCID, // Identifiant pour le logo principal
      },
      {
        filename: "ParisAir_logo.png",
        path: parisAirLogoPath,
        cid: parisAirLogoCID, // Identifiant pour le logo ParisAir
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
        <div style="text-align: center; margin-top: 20px;">
          <img src="cid:${parisAirLogoCID}" alt="ParisAir Logo" style="width: 80px;" />
        </div>
      </div>
    `,
    attachments: [
      {
        filename: "logo.png",
        path: logoPath,
        cid: logoCID, // Identifiant pour la balise cid
      },
      {
        filename: "ParisAir_logo.png",
        path: parisAirLogoPath,
        cid: parisAirLogoCID, // Identifiant pour le logo ParisAir
      },
    ],
  };

  try {
    // Envoi des deux emails
    await transporter.sendMail(adminMail); // Vers l'admin
    await transporter.sendMail(clientMail); // Vers le client

    res.status(200).json({ message: "Emails envoyés avec succès !" });
  } catch (error) {
    console.error("Erreur Nodemailer :", error);
    res.status(500).json({ message: "Erreur lors de l'envoi des emails" });
  }
});

module.exports = router;
