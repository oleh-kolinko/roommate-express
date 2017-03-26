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

//get new house page
router.get('/house',ensure.ensureLoggedIn(), (req, res, next) => {
  if(req.user.house){
    res.redirect('/');
  }
  res.render('house');
});

//create new house
router.post('/house', ensure.ensureLoggedIn(), (req, res, next)=>{
  const newDoc = new House({
    roommates: [req.user._id]
  });
  newDoc.save( (err,result)=>{
    if(err) return next(err);

    req.user.house = result._id; //save id of house to user profile
    User.findByIdAndUpdate( req.user._id , req.user, (err) =>{
        if(err) return next(err);
        console.log('house created id = ', result._id);
        res.redirect('/');
    });
  });
});

//Connect to existing house
router.post('/house/:id', ensure.ensureLoggedIn(), (req, res, next)=>{
  const houseId = req.params.id;

  House.findByIdAndUpdate( id , {$push: {"roommates": req.user._id }}, (err,result)=>{
      if(err) return next(err);

      req.user.house = result._id; //save id of house to user profile
      User.findByIdAndUpdate( req.user._id , req.user, (err) =>{
          if(err) return next(err);

          console.log('house updated ');
          res.redirect('/');
      });
  });
});

module.exports = router;
