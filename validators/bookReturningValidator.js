const { body, validationResult } = require('express-validator');

const validateReturningBook = [
  body('score')
    .optional()
    .isInt({ min: 0, max: 10 }).withMessage('Score must be an integer between 0 and 10.'),
  
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

module.exports = { validateReturningBook };
