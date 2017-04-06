const mongoose = require('mongoose');//get mongoose
mongoose.connect('mongodb://heroku_r1f9fvl7:tci5r3165r2mdqf55jucuv00c0@ds145370.mlab.com:45370/heroku_r1f9fvl7');//connect to DB
const User = require('../models/user.js');

const users =[
  {
    username: 'Oleh',
    img: 'https://pbs.twimg.com/profile_images/569701450985398272/j3mFgFn9.jpeg',
    password: '$2a$10$VkK9nbvT3DdoIuclpvtLFOBx5Du4IHSA8ttCmA3rk3OvyQpSlXFN.'
  },
  {
    username: 'Kevin',
    img: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAy8AAAAJDgxYzBkN2VhLWIwZTMtNDhkNS1iYmY0LWU0NjczMDIxM2Q0YQ.jpg',
    password: '$2a$10$VkK9nbvT3DdoIuclpvtLFOBx5Du4IHSA8ttCmA3rk3OvyQpSlXFN.'
  },
  {
    username: 'JP',
    img: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAdmAAAAJDQ5MDA5YWFhLTBiMjYtNGUzMC1hMmYyLTU1ZmNjYzIzNDlhNg.jpg',
    password: '$2a$10$VkK9nbvT3DdoIuclpvtLFOBx5Du4IHSA8ttCmA3rk3OvyQpSlXFN.'
  },
];
User.create(users, (err,docs)=>{
  if(err) throw err;
  docs.forEach((oneDoc)=>{
      console.log(`${oneDoc.name} ${oneDoc._id}`);
  });
  mongoose.disconnect();
});
