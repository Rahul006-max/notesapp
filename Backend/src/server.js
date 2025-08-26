import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/ratelLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  ); //url request
}

app.use(express.json());
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log`method ${req.method} and URL: ${req.url}`;
  next();
});

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile.join(__dirname, "../frontend", "dist", "index.html");
  });
}
connectDB().then(() => {
  app.listen(5001, () => {
    console.log("server is started on port:", PORT);
  });
});
//
