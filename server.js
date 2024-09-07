const express = require('express');
const User = require('./models/user');
const Book = require('./models/book');
const Borrowing = require('./models/borrowing')
const sequelize = require('./models');
const bookRoutes = require('./routers/bookRoutes')
const userRoutes = require('./routers/userRoutes');
const borrowingRoutes = require('./routers/borrowingRoutes')
const app = express();
const port = 3000;


User.hasMany(Borrowing, { foreignKey: 'userId' });
Book.hasMany(Borrowing, { foreignKey: 'bookId' });
Borrowing.belongsTo(User, { foreignKey: 'userId' });
Borrowing.belongsTo(Book, { foreignKey: 'bookId' });

app.use(express.json());
app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('', borrowingRoutes);

// Sync database and models
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Error syncing database:', err));

// Global error handler
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
