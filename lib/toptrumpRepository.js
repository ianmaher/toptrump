'use strict';
var GameModel = require('../src/models/game.server.model');
var LeagueModel = require('../src/models/league.server.model');
var session = require('./session');

var gameRepository = (function() {

    var fetchLeague = function(callback) {
        LeagueModel.findOne({'name' : 'Summer Dev Group'},function(err, league) {
            if (err || !league) {
                var newLeague = new LeagueModel({
                    name : 'Summer Dev Group' ,
                    players:[{
                        name: 'computer',
                        leagueScore : 0
                    }]
                });
                newLeague.save(function(err) {
                    if (err) {
                        console.log('a problem creating league');
                    }
                    else {
                        callback(err, newLeague);
                    }
                });
            } else {
                callback(null, league);
            }

        });
    };

    var fetchLeagueTable = function(callback) {
        fetchLeague(callback);
    };

    var createGame = function(callback) {
        var newGame = new GameModel({
            name : 'Game ' + Date(),
            roundCnt: 0,
            rounds:[]
        });
        newGame.save(function(err) {
            if (err) {
                console.log('a problem');
            }
            else {
                callback(err, newGame);
            }
        });
    };

    var fetchGame = function(gameId, callback) {
        GameModel.findById(gameId, function(err, game) {
            if (err) {
                console.log('error fetching game - ' + err);
                callback(err, null);
            } else {
                callback(null, game);
            }
        });
    };

    var addRoundToGame = function(gameId, round, callback) {
        GameModel.findById(gameId, function(err, game) {
            if (err) {
                console.log('error fetching game - ' + err);
                callback(err, null);
            } else {
                game.currentRound += 1;
                game.rounds.push(round);
                var gameOver = false ;
                if (game.currentRound >= game.maxRound) {
                    gameOver = true;
                }
                game.save(function(err) {
                    callback(err, game, gameOver);
                });
            }
        });
    };

    var saveGame = function(game, callback) {
        game.save(function(err) {
            if (err) {
                console.log('cann not save game ' + err);
            }
            else {
                callback(null, game);
            }
        });
    };

    var gameOver = function(game, callback) {
        game.save().then(function(game) {

            fetchLeague(function(err, league) {
                var idx = -1;
                for (var i = 0 ; i < league.players.length ; i++) {
                    if (league.players[i].name === game.winner) {
                        idx = i;
                    }
                }

                if (idx === -1) {
                    // new member
                    league.players.push({
                        name : game.winner,
                        leagueScore : game.score
                    });
                }
                else
                {
                    league.players[idx].leagueScore += game.score;
                }
                league.save().then(function(err) {
                    console.log('error saving league ' + err);
                    callback(err);
                });
            });
        });
    };

    return {
        gameOver : gameOver,
        addRoundToGame : addRoundToGame,
        saveGame : saveGame,
        fetchGame : fetchGame,
        fetchLeagueTable : fetchLeagueTable,
        createGame : createGame
    };
})();

module.exports = gameRepository;
