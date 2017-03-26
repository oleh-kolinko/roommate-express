const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const houseSchema = new Schema({
  roommates: [String],

});

const House = mongoose.model('House', houseSchema);

module.exports = House;
