const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbQuestionsSchema = new Schema({
    incorrect_answers: [String],
    category: String,
    type: String,
    difficulty: String,
    question: String,
    correct_answer: String
});

dbQuestionsSchema.set('timestamps', true);

const DBQuestions = mongoose.model('DBQuestions', dbQuestionsSchema);

module.exports = DBQuestions;
