var mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var characterSchema = new Schema({
    type : {type:String},
    attack : Number,
    value : Number,
    charOrder : Number,
});

var roundSchema = new Schema({
    characters : [characterSchema],
    score : {type: Number, default: 0},
});

var playerSchema = new Schema({
    name : String,
    runAway : {type:Boolean, default: false},
    gameOver : {type:Boolean, default: false},
    currentRound : {type: Number, default: 0},
    gameScore: {type: Number, default: 0},
    rounds : [roundSchema]
});

var gameSchema = new Schema({
    name : String,
    creator: String,
    winner : String,
    players : [playerSchema],
    maxRound : {type: Number, default: 3}
});

var gameModel = mongoose.model('game',gameSchema);
module.exports = gameModel;
