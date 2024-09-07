const express = require('express');
const { listUsers, createUser,getUserById } = require('../controllers/userController');

const router = express.Router();

// Define routes
router.get('/', listUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);

module.exports = router;
