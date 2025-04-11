module.exports = {
  apps : [
    {
      // --- Configuration Frontend ---
      name   : "ldistrib-frontend",
      script : "node_modules/.bin/next", // Vérifie ce chemin dans ton projet Frontend
      args   : "start -p 3000",
      cwd    : "/opt/sites/L.Distri/Frontend", // Chemin absolu vers le dossier Frontend
      exec_mode : "fork", // Mode d'exécution
      instances : 1, // Nombre d'instances
      autorestart: true, // Redémarrage automatique
      watch  : false, // Désactive le 'watch' en production
      env_production: {
         NODE_ENV: "production"
      }
    },
    {
      // --- Configuration Backend ---
      name   : "ldistrib-backend",
      script : "index.js", // Script de démarrage du backend
      args   : "", // Pas d'args si port/env gérés autrement
      cwd    : "/opt/sites/L.Distri/Backend", // Chemin absolu vers le dossier Backend
      exec_mode : "fork",
      instances : 1,
      autorestart: true,
      watch  : false,
      env_production: {
         NODE_ENV: "production",
         // PORT: 4000 // Décommente et ajuste si ton backend lit process.env.PORT
         // Assure-toi que CONNECTION_STRING etc. sont bien chargées par dotenv dans index.js
      }
    }
  ]
}
