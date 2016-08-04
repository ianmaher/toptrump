'use strict';
var GameModel = require('../src/models/game.server.model');
var LeagueModel = require('../src/models/league.server.model');
var session = require('./session');

var gameRepository = (function() {

    var fetchLeague = function(callback) {
        LeagueModel.findOne({'name' : 'Player Vs Player League'},function(err, league) {
            if (err || !league) {
                var newLeague = new LeagueModel({
                    name : 'Player Vs Player League'
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

    var createGame = function(player, gameName, callback) {
        var newGame = new GameModel({
            name : gameName,
            creator : player,
            roundCnt: 0,
            players:[{
                name: player
            },{
                name: 'unknown'
            }]
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

    var fetchGameByName = function(gameName, callback) {
        GameModel.findOne({'name' : gameName}, function(err, game) {
            if (err) {
                console.log('error fetching game - ' + err);
                callback(err, null);
            } else {
                callback(null, game);
            }
        });
    };

    var addRoundToGame = function(gameId, round, playerIdx, callback) {
        console.log('addRoundToGame');
        GameModel.findById(gameId, function(err, game) {
            if (err) {
                console.log('error fetching game - ' + err);
                callback(err, null);
            } else {
                console.log('found game');
                game.players[playerIdx].currentRound += 1;
                game.players[playerIdx].rounds.push(round);
                var gameOver = false ;
                if (game.players[playerIdx].currentRound >= game.maxRound) {
                    game.players[playerIdx].gameOver = true;
                    if (game.players[0].gameOver && game.players[1].gameOver) {
                        gameOver = true;
                    }
                }
                game.save(function(err) {
                    console.log('saved game');
                    callback(err, game, game.players[playerIdx].gameOver, gameOver);
                });
            }
        });
    };

    var saveGame = function(game, callback) {
        game.save(function(err) {
            if (err) {
                console.log('cannot save game ' + err);
            }
            else {
                callback(null, game);
            }
        });
    };

    var gameOver = function(game, callback) {
            var members = [];
            for (var i = 0; i < game.players.length ; i++) {
                members.push({name: game.players[i].name, gameScore: game.players[i].gameScore});
            }

            fetchLeague(function(err, league) {
                league.matches.push({
                    winner : game.winner,
                    members : members
                });
                league.save(function(err) {
                    if (err) {
                        console.log('error saving league ' + err);

                    } else {
                        callback(null,game);
                    }
                });
            });
        };

    return {
        gameOver : gameOver,
        addRoundToGame : addRoundToGame,
        saveGame : saveGame,
        fetchGame : fetchGame,
        fetchLeagueTable : fetchLeagueTable,
        createGame : createGame,
        fetchGameByName : fetchGameByName
    };
})();

module.exports = gameRepository;
