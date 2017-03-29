const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {type: String, required: [true, 'The name is required']},
  //  description: String,
  category: String,
  repeat: String,
  date: Date,

});
taskSchema.set('timestamps', true);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
