const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// launderer: { type: Schema.Types.ObjectId, ref: 'User' }

const customSchema = new Schema({
    incorrect_answers: [String],
    question: String,
    correct_answer: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' }
});

customSchema.set('timestamps', true);

const CustomQuestions = mongoose.model('CustomQuestions', customSchema);

module.exports = CustomQuestions;
