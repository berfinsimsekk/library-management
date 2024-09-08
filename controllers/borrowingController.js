const express = require('express');
const router = express.Router();
const Borrowing = require('../models/borrowing');
const User = require('../models/user');
const Book = require('../models/book');
const { Op } = require('sequelize');
const redis = require('redis');

const client = redis.createClient();
let isRedisConnected = false; 


client.connect()
  .then(() => {
    isRedisConnected = true;
    console.log('Connected to Redis');
  })
  .catch((error) => {
    isRedisConnected = false;
    console.error('Redis connection failed:', error.message);
  });

const borrowBook = async (req, res) => {
    const { userId, bookId } = req.params;
    try {

      const existingBorrowing = await Borrowing.findOne({
        where: { bookId, returnedAt: null },
      });
  
      if (existingBorrowing) {
        return res.status(400).send('Book is already borrowed.');
      }
      const user = await User.findByPk(userId);
      const book = await Book.findByPk(bookId);
  
      if (!user || !book) {
        return res.status(404).send('User or Book not found');
      }
  
      const existingBorrow = await Borrowing.findOne({
        where: { userId, bookId, returnedAt: null },
      });
  
      if (existingBorrow) {
        return res.status(400).send('Book is already borrowed by the user.');
      }
  
      await Borrowing.create({ userId, bookId });

      if (isRedisConnected) {

        await client.del('books'); 
        await client.del(`book:${bookId}`); 
      }


      res.status(200).send('Book borrowed');
    } catch (err) {
      res.status(500).send(err.message);
    }
}
  
const returnBook = async (req, res) => {
  const { userId, bookId } = req.params;
  let { score } = req.body;

  try {
      const borrowing = await Borrowing.findOne({
          where: { userId, bookId, returnedAt: null },
      });

      if (!borrowing) {
          return res.status(404).send('No borrowing record found.');
      }

      borrowing.returnedAt = new Date();
      borrowing.rating = score; 
      await borrowing.save();

      // Update book's average rating
      const book = await Book.findByPk(bookId);
      const ratings = await Borrowing.findAll({
          where: { bookId, rating: { [Op.not]: null } },
      });

      if (ratings.length > 0) {
          book.rating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
      } else {
          book.rating = null; // or 0 if you want to show a default value
      }
      await book.save();

      if (isRedisConnected) {
        await client.del('books'); 
        await client.del(`book:${bookId}`); 
      }

      res.status(200).send('Book returned');
  } catch (err) {
      res.status(500).send(err.message);
  }
};

module.exports = {borrowBook ,returnBook};
