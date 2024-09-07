const { body, validationResult } = require('express-validator');

const validateUserBookCreation = [
  body('name')
    .isString().withMessage('Name should be a string.')
    .notEmpty().withMessage('Name cannot be empty.')
    .isLength({ min: 1, max: 50 }).withMessage('Name should be between 1 and 50 characters.'),
  
  // Middleware to check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((err) => err.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  },
];

module.exports = { validateUserBookCreation };
