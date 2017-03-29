const express = require('express');
const router  = express.Router();
const ensure = require('connect-ensure-login');
const Vote = require('../models/vote');
const Task = require('../models/task');
const House = require('../models/house');

router.get('/votes', (req, res, next) => {
  Vote.find({}).sort({createdAt: -1}).exec((err,result)=>{
    if(err) return  res.json(err);

    res.json(result);
  });
});

router.post('/votes', (req, res, next)=>{
  const newDoc = new Vote(req.body);
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

router.delete('/votes',(req,res,next)=>{
  
});

router.get('/tasks', (req, res, next) => {
  Task.find({}).sort({date: 1}).exec((err,result)=>{
    if(err) return  res.json(err);

    res.json(result);
  });
});

router.post('/tasks', (req, res, next)=>{
  const newDoc = new Task(req.body);
  newDoc.save( (err,result)=>{
    if(err) return res.json(err);
     res.json({message: 'Doc has been created successfully', object: result});
  });
});



module.exports = router;
