const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: [true, 'The username is required']},
  password: {type: String, required: [true, 'The password is required']},
  img: {type: String, default: 'https://lh3.googleusercontent.com/-y9vU3BHc-xw/AAAAAAAAAAI/AAAAAAAAjgY/fb_G5jN3JjA/s640/photo.jpg'},
  house: String
});
userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);

module.exports = User;
