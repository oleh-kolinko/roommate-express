const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  name: {type: String, required: [true, 'The name is required']},
  description: String,
  category: String,
  repeat: String,

});

const Task = mongoose.model('Task', voteSchema);

module.exports = Task;
