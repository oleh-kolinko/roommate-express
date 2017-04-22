const express = require('express');
const router  = express.Router();
const ensure = require('connect-ensure-login');

//import models:
const Vote = require('../models/vote');
const Task = require('../models/task');
const House = require('../models/house');
const User = require('../models/user');
const Loan = require('../models/loan');

//VOTES
router.get('/votes', (req, res, next) => {

  Vote.find({house: req.user.house}).sort({createdAt: -1}).exec((err,result)=>{
    if(err) return  res.json(err);

    res.json(result);
  });
});

router.post('/votes', (req, res, next)=>{
  const newDoc = new Vote(req.body);
  newDoc.house = req.user.house;
  newDoc.save( (err,result)=>{
    if(err) return res.json(err);
     res.json({message: 'Doc has been created successfully', object: result});
  });
});

router.put('/votes',(req, res, next)=>{
  const id = req.body.id;
  const i = req.body.i;
  const userId = req.body.userId;

  Vote.findById(id, (err,result)=>{
    if(err) return res.json(err);

    console.log(result);
    result.options[+i].votes ++ ;
    result.totalVotes ++ ;
    result.votedUsers.push(userId);
    console.log(result);
    result.save( (err )=>{
      if(err) return res.json(err);

      res.json({message: 'Doc has been updated', object: result});

    });
  });
});

//TASKS
router.get('/tasks', (req, res, next) => {
  Task.find({house: req.user.house}).sort({date: 1}).exec((err,result)=>{
    if(err) return  res.json(err);

    res.json(result);
  });
});

router.post('/tasks', (req, res, next)=>{
  const newDoc = new Task(req.body);
  newDoc.house = req.user.house;

  newDoc.save( (err,result)=>{
    if(err) return res.json(err);
     res.json({message: 'Doc has been created successfully', object: result});
  });
});

router.patch('/tasks',(req,res,next)=>{
  const id = req.body.id;
  console.log(id);
  console.log(req.body);
  Task.findByIdAndRemove(id, (err,result)=>{
    if(err) return  res.json(err);
    res.json('Deleted');
  });
});

//roommates
router.patch('/roommates', (req, res, next) => {
  const houseid = req.body.id;
  User.find({house: houseid}).sort({createdAt: -1}).exec((err,result)=>{
    if(err) return  res.json(err);

    res.json(result);
  });
});

//LOANS
router.get('/loans', (req, res, next) => {

  Loan.find({$or:[ {payerId: req.user._id}, {receiverId: req.user._id}]}).exec((err,result)=>{
    if(err) return  res.json(err);

    res.json(result);
  });
});

router.post('/loans', (req, res, next)=>{


  req.body.payers.forEach( payer => {
    const cost = Number((req.body.cost / req.body.payers.length).toFixed(2));
    const newDoc = new Loan({
      name: req.body.name,
      cost: cost,
      payerId: payer._id,
      receiverId: req.user._id
    });
    if(newDoc.payerId != newDoc.receiverId){
      newDoc.save( (err,result)=>{
        if(err) return next(err);
      });
    }
  });

  res.json({});

});

module.exports = router;
