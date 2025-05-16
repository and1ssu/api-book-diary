const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateSchema } = require('../middlewares/validate.middleware');
const { registerSchema, loginSchema } = require('../validations/auth.validation');

router.post('/register', validateSchema(registerSchema), authController.register);
router.post('/login', validateSchema(loginSchema), authController.login);

module.exports = router;