const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rankingSchemaMedium = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    numberOfGames: Number,
    totalScore: Number,
});

rankingSchemaMedium.set('timestamps', true);

const RankingModelMedium = mongoose.model('RankingModelMedium', rankingSchemaMedium);

module.exports = RankingModelMedium;
