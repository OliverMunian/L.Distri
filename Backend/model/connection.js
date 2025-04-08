const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECTION_STRING, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected - CONNECTION_STRING =", process.env.CONNECTION_STRING))
  .catch((error) => console.error('ligne 6: ',error));
