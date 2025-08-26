import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "../middleware/ratelLimiter.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
); //url request

app.use(express.json());
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log`method ${req.method} and URL: ${req.url}`;
  next();
});

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(5001, () => {
    console.log("server is started on port:", PORT);
  });
});
//
