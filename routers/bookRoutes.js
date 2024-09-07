const express = require('express');
const {
  listBooks,
  createBook,
  getBookById
} = require('../controllers/bookController');

const router = express.Router();

// Define routes
router.get('/', listBooks);
router.post('/', createBook);
router.get('/:bookId', getBookById);

module.exports = router;
