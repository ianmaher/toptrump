var mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var characterSchema = new Schema({
    type: {type:String},
    attack: Number,
    value:   Number,
    date: {type: Date, default: Date.now},
    __order: Number
});
// TODO: may not require this hack. depends on what is saved to DB.
characterSchema.virtual('combatOrder').get(function () {
    return this.__order;
});
characterSchema.virtual('combatOrder').set(function (order) {
    this.__order = order;
});

var playerSchema = new Schema({
    name: String,
    score: Number,
    characters: [characterSchema],
});

var roundSchema = new Schema({
    players: [playerSchema],
});

var gameSchema = new Schema({
    name: String,
    rounds: [roundSchema],
    currentRound: {type: Number, default: 0},
    maxRound: {type: Number, default: 3},
    winner : String,
    score: Number
});

var memberSchema = new Schema({
    name: String,
    leagueScore: Number
});

var leagueSchema = new Schema({
    name: String,
    players: [memberSchema]
});

var gameModel = mongoose.model('game',gameSchema);
module.exports = gameModel;
