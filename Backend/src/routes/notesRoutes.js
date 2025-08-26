import express from "express";
import {
  getAllNotes,
  createNode,
  updateNode,
  deleteNode,
  getNotesById,
} from "../controllers/notesController.js";
const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNotesById);
router.post("/", createNode);

router.put("/:id", updateNode);

router.delete("/:id", deleteNode);

export default router;

// app.get("/api/notes", (req, res) => {
//   res.status(200).send("Hello ");
// });

// app.post("/api/note", (req, res) => {
//   res.status(201).json({ message: " create sucess" });
// });
// app.put("/api/note/:id", (req, res) => {
//   res.status(200).json({ message: " update sucess" });
// });

// app.delete("/api/note/:id", (req, res) => {
//   res.status(200).json({ message: " delete sucess" });
// });
