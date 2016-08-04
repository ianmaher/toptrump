var mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var memberSchema = new Schema({
    name: String,
    gameScore: {type: Number, default: 0},
    runAway: {type: Boolean, default: false}
});

var matchSchema = new Schema({
    winner: String,
    members: [memberSchema],
    date: {type: Date, default: Date.now}
});

var leagueSchema = new Schema({
    name: String,
    matches: [matchSchema]
});

var leagueModel = mongoose.model('league', leagueSchema);
module.exports = leagueModel;