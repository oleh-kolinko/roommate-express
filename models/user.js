const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: [true, 'The username is required']},
  password: {type: String, required: [true, 'The password is required']},
  img: {type: String, default: '/images/profile.png'},
  house: String
});
userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);

module.exports = User;
