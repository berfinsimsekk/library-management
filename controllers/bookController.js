const Book = require('../models/book');

// List all books
const listBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get a specific book by ID
const getBookById = async (req, res) => {
  const { bookId } = req.params; // Extract the book ID from the URL
  try {
    const book = await Book.findOne({ where: { id: bookId } });

    if (!book) {
      return res.status(404).send('Book not found');
    }

    res.json(book);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Create a new book
const createBook = async (req, res) => {
  const { name, rating } = req.body;
  try {
    await Book.create({ name, rating });
    res.status(201).send('Book created');
  } catch (err) {
    res.status(500).send(err.message);
  }
};



module.exports = { listBooks, getBookById, createBook};
