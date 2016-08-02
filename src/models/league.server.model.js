var mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var memberSchema = new Schema({
    name: String,
    leagueScore: Number
});

var leagueSchema = new Schema({
    name: String,
    players: [memberSchema]
});

var leagueModel = mongoose.model('league', leagueSchema);
module.exports = leagueModel;