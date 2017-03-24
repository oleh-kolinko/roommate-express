const express = require('express');
const router  = express.Router();
const ensure = require('connect-ensure-login');

/* GET home page. */
router.get('/', ensure.ensureLoggedIn(),(req, res, next) => {
  res.send('to angular');
});
router.get('/login', (req, res, next) => {
  res.render('index',{
    errorLogin: '',
    errorSignup: '',
  });
});
router.get('/house',ensure.ensureLoggedIn(), (req, res, next) => {
  res.render('house');
});
module.exports = router;
