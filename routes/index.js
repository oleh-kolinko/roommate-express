const express = require('express');
const router  = express.Router();
const ensure = require('connect-ensure-login');
const House = require('../models/house');
const User = require('../models/user');
const mongoose = require('mongoose');

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
  res.render('house',{
    errorMessage: '',
    user: req.user
  });
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
router.post('/house/connect', ensure.ensureLoggedIn(), (req, res, next)=>{
  const id = req.body.token;
  if(!mongoose.Types.ObjectId.isValid(id)){
    res.render('house',{
      errorMessage: 'Invalid token',
    });
  }
  console.log(req.body);
  House.findByIdAndUpdate( id , {$push: {"roommates": req.user._id }}, (err,result)=>{
      if(err) return next(err);

      if(!result){
        res.render('house',{
          errorMessage: 'Invalid token',
        });
      }
      req.user.house = result._id; //save id of house to user profile
      User.findByIdAndUpdate( req.user._id , req.user, (err) =>{
          if(err) return next(err);

          console.log('house updated ');
          res.redirect('/');
      });
  });
});

// router.post('/house/:id/invite', ensure.ensureLoggedIn(), (req, res, next)=>{
//   const id = req.params.token;
//   if(!mongoose.Types.ObjectId.isValid(id)){
//     res.render('house',{
//       errorMessage: 'Invalid token',
//     });
//   }
//   console.log(req.body);
//   House.findByIdAndUpdate( id , {$push: {"roommates": req.user._id }}, (err,result)=>{
//       if(err) return next(err);
//
//       if(!result){
//         res.render('house',{
//           errorMessage: 'Invalid token',
//         });
//       }
//       req.user.house = result._id; //save id of house to user profile
//       User.findByIdAndUpdate( req.user._id , req.user, (err) =>{
//           if(err) return next(err);
//
//           console.log('house updated ');
//           res.redirect('/');
//       });
//   });
// });

module.exports = router;
