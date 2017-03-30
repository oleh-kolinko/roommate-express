const express = require('express');
const router  = express.Router();
const ensure = require('connect-ensure-login');
const Vote = require('../models/vote');
const Task = require('../models/task');
const House = require('../models/house');

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

module.exports = router;
