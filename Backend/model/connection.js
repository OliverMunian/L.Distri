const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected - MONGODB_URI =", process.env.MONGODB_URI))
  .catch(error => console.error("Mongoose Connection Error:", error));

      