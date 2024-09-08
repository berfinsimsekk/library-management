const Book = require('../models/book');
const redis = require('redis');

const client = redis.createClient();
let isRedisConnected = false; 


client.connect()
  .then(() => {
    isRedisConnected = true;
  })
  .catch((error) => {
    isRedisConnected = false;
    console.error('Redis connection failed:', error.message);
  });


const listBooks = async (req, res) => {
  try {

    if (isRedisConnected) {
      const cachedBooks = await client.get('books');
    
      if (cachedBooks) {
        return res.json(JSON.parse(cachedBooks));
      }
    }
    const books = await Book.findAll();
    if (isRedisConnected) {
      await client.setEx('books', 60, JSON.stringify(books));
    }
    res.json(books);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


const getBookById = async (req, res) => {
  const { bookId } = req.params;
  try {

    if (isRedisConnected) {
      const cachedBook = await client.get(`book:${bookId}`);

      if (cachedBook) {
        console.log("returned from cache")
        return res.json(JSON.parse(cachedBook));
      }
  
    }
   
    const book = await Book.findOne({ where: { id: bookId } });

    if (!book) {
      return res.status(404).send('Book not found');
    }
    if (isRedisConnected) {
      await client.setEx(`book:${bookId}`, 60, JSON.stringify(book));
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
    if (isRedisConnected) {
      await client.del('books'); 
    }
    res.status(201).send('Book created');
  } catch (err) {
    res.status(500).send(err.message);
  }
};



module.exports = { listBooks, getBookById, createBook};
