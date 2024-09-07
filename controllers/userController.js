const User = require('../models/user')
const Borrowing = require('../models/borrowing');
const Book = require('../models/book');

// List all users
const listUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get a specific user by ID
const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Borrowing,
          include: [Book],
        },
      ],
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Extract currently borrowed and past borrowed books with ratings
    const borrowedBooks = user.Borrowings.map(borrowing => ({
      bookName: borrowing.Book.name,
      returnedAt: borrowing.returnedAt,
      rating: borrowing.rating,
    }));

    const currentlyBorrowed = borrowedBooks.filter(b => !b.returnedAt);
    const pastBorrowed = borrowedBooks.filter(b => b.returnedAt);

    res.json({
      name: user.name,
      currentlyBorrowedBooks: currentlyBorrowed,
      pastBorrowedBooks: pastBorrowed,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { name } = req.body;
  try {
    await User.create({ name });
    res.status(201).send('User created');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { listUsers, getUserById, createUser };
