const express = require('express');
const {
  listBooks,
  createBook,
  getBookById
} = require('../controllers/bookController');
const { validateUserBookCreation } = require('../validators/userBookValidator');
const router = express.Router();

// Define routes
router.get('/', listBooks);
router.post('/', validateUserBookCreation, createBook);
router.get('/:bookId', getBookById);

module.exports = router;
