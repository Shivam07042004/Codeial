const express = require('express');

const router = express.Router();

const passport = require('passport');

const userControllers = require('../controllers/user_controllers');

router.get('/profile/:id',passport.checkAuthentication,userControllers.profile);
router.post('/update/:id',passport.checkAuthentication,userControllers.update);
router.get('/sign-up',userControllers.signUp);
router.get('/sign-in',userControllers.signIn);
router.post('/create',userControllers.create);


router.post('/create-session',passport.authenticate(

    'local',
    {failureRedirect : '/users/sign-in'}
),  userControllers.createSession);

router.get('/sign-out',userControllers.signOut);

module.exports = router;