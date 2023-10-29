import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import routes from "./src/routes/index.js";
// Database
import db from "./src/config/Database.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// Database configurasi
try {
  await db.authenticate();
  console.log("Database Connection has been established successfully.");

  // uncomment untuk Generate Table otomatis
  await db.sync();
  // *
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Routes
app.use(routes);

// Middleware Error Handling
// Semua Error yang ada di Project Api ini akan masuk ke middleware ini jika tidak ada yang menangani
app.use((err, req, res, next) => {
  res.json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
