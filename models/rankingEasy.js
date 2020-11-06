const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rankingSchemaEasy = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    numberOfGames: Number,
    totalScore: Number,
});

rankingSchemaEasy.set('timestamps', true);

const RankingModelEasy = mongoose.model('RankingModelEasy', rankingSchemaEasy);

module.exports = RankingModelEasy;
