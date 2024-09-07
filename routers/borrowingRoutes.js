const express = require('express');
const { borrowBook, returnBook} = require('../controllers/borrowingController');
const { validateReturningBook } = require('../validators/bookReturningValidator');
const router = express.Router();

// Define routes
router.post('/users/:userId/borrow/:bookId', borrowBook);
router.post('/users/:userId/return/:bookId', validateReturningBook, returnBook)
module.exports = router;
