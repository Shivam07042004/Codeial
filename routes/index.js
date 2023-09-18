const express = require('express');
const router = express.Router();
const homeController= require('../controllers/home_controllers');

console.log('router loaded');

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
// if any other router comes
// router.use('/routername',require('./routerfile'));

module.exports = router;