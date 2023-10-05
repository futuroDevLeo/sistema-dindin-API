const { Router } = require('express');
const { createNewUser } = require('../controllers/userController');

const router = Router();

router.post('/usuario', createNewUser);

module.exports = router;