const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./user');
const Book = require('./book');

const Borrowing = sequelize.define('Borrowing', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: 'id',
    },
  },
  returnedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});


module.exports = Borrowing;
