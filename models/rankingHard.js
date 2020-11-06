const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rankingSchemaHard = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    numberOfGames: Number,
    totalScore: Number,
});

rankingSchemaHard.set('timestamps', true);

const RankingModelHard = mongoose.model('RankingModelHard', rankingSchemaHard);

module.exports = RankingModelHard;
