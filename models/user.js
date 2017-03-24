const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScema = new Schema({
  username: {type: String, required: [true, 'The username is required']},
  password: {type: String, required: [true, 'The password is required']},
  img: String,
  house: String
});

const User = mongoose.model('User', userScema);

module.exports = User;
