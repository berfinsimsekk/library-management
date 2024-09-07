const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER
  },
}, {
  timestamps: false, // Disable automatic createdAt and updatedAt fields
});

module.exports = Book;
