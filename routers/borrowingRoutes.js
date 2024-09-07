const express = require('express');
const { borrowBook, returnBook} = require('../controllers/borrowingController');

const router = express.Router();

// Define routes
router.post('/users/:userId/borrow/:bookId', borrowBook);
router.post('/users/:userId/return/:bookId', returnBook)
module.exports = router;
