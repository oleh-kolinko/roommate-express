const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loanSchema = new Schema({
  name: {type: String, required: [true, 'The name is required']},
  amount
});
loanSchema.set('timestamps', true);

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
