const Joi = require('joi');

// Define validation schemas
const schemas = {
  book: Joi.object({
    title: Joi.string().required().trim().messages({
      'string.empty': 'Book title is required',
      'any.required': 'Book title is required'
    }),
    author: Joi.string().required().trim().messages({
      'string.empty': 'Author name is required',
      'any.required': 'Author name is required'
    }),
    description: Joi.string().allow('').trim(),
    publishedYear: Joi.number().integer().min(1000).max(new Date().getFullYear()),
    genre: Joi.string().allow('').trim(),
    rating: Joi.number().required().min(1).max(5).messages({
      'number.base': 'Rating must be a number',
      'number.min': 'Rating must be at least 1',
      'number.max': 'Rating must be at most 5',
      'any.required': 'Rating is required'
    }),
    status: Joi.string().valid('to-read', 'reading', 'completed'),
    notes: Joi.string().allow('').trim()
  })
};

/**
 * Middleware to validate request body against a schema
 * @param {string} schemaName - The name of the schema to validate against
 * @returns {Function} Express middleware
 */
exports.validateSchema = (schemaName) => {
  return (req, res, next) => {
    const schema = schemas[schemaName];

    if (!schema) {
      return res.status(500).json({
        success: false,
        message: `Schema '${schemaName}' not found`
      });
    }

    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errorMessages
      });
    }

    // Replace request body with validated value
    req.body = value;
    next();
  };
};

