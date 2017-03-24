const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const houseSchema = new Schema({
  name: {type: String, required: [true, 'The name is required']},
  roommates: [String],

});

const House = mongoose.model('House', houseSchema);

module.exports = House;
