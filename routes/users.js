const express = require('express');

const router = express.Router();

const userControllers = require('../controllers/user_controllers');

router.get('/profile',userControllers.profile);
router.get('/sign-up',userControllers.signUp);
router.get('/sign-in',userControllers.signIn);
router.post('/create',userControllers.create);
router.post('/create-session',userControllers.createSession);

router.get('/sign-out',userControllers.signOut);

module.exports = router;