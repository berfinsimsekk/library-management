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

//  sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
//  .then(() => sequelize.sync({ force: true }))
//  .then(() => sequelize.query('SET FOREIGN_KEY_CHECKS = 1'))
//  .then(() => console.log('Database synced with foreign key checks disabled'))
//  .catch(err => console.error('Error syncing database:', err));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
