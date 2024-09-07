const express = require('express');
const { listUsers, createUser,getUserById } = require('../controllers/userController');
const { validateUserBookCreation } = require('../validators/userBookValidator');
const router = express.Router();

// Define routes
router.get('/', listUsers);
router.get('/:userId', getUserById);
router.post('/', validateUserBookCreation, createUser);

module.exports = router;
