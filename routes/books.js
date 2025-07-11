const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// GET all books
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// GET single book
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Book not found");
    res.json(book);
  } catch (err) {
    res.status(400).send("Invalid ID");
  }
});

// CREATE a new book
router.post("/", async (req, res) => {
  const { title, author } = req.body;
  try {
    const newBook = new Book({ title, author });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE a book
router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBook) return res.status(404).send("Book not found");
    res.json(updatedBook);
  } catch (err) {
    res.status(400).send("Invalid ID or data");
  }
});

// DELETE a book
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).send("Book not found");
    res.status(204).send();
  } catch (err) {
    res.status(400).send("Invalid ID");
  }
});

module.exports = router;