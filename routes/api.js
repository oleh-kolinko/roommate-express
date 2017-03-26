const express = require('express');
const router  = express.Router();
const ensure = require('connect-ensure-login');
const Vote = require('../models/vote');
const Task = require('../models/task');
const House = require('../models/house');

router.get('/votes', (req, res, next) => {
  Vote.find({},(err,result)=>{
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

router.get('/tasks', (req, res, next) => {
  Task.find({},(err,result)=>{
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
