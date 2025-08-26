import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); //newset firast
    res.status(200).json(notes);
  } catch (error) {
    console.error("IN get NOde", error);
    res.status(500).json({ message: "Error: in internal server" });
  }
};

export const getNotesById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "id not found" });
    res.status(200).json({ message: "message sucessfull", note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const createNode = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error ", error });
  }
};

export const updateNode = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNode = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );
    if (!updateNode) return res.status(404).json({ message: "Note not found" });
    res.status(201).json({ message: "Update successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal error" });
  }
};

export const deleteNode = async (req, res) => {
  try {
    const { title, content } = req.body;
    const deletedNode = await Note.findByIdAndDelete(req.params.id, {
      title,
      content,
    });
    if (!deleteNode) return res.status(404).json({ message: "Note not found" });
    res.status(201).json({ message: "NOte deletes successfully" });
  } catch (error) {
    console.log(error);
    req.status(401).json({ message: "internal error" });
  }
};
