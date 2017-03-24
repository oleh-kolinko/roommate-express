const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  name: {type: String, required: [true, 'The name is required']},
  options: [{
    name: String,
    votes: {type: Number, default: 0},
  }],

});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
