const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  name: {type: String, required: [true, 'The name is required']},
  category: String,
  votedUsers: {type: [String] , default: []},
  totalVotes: {type: Number, default: 0},
  options: [{
    name: String,
    votes: {type: Number, default: 0},
  }],

});
voteSchema.set('timestamps', true);

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
