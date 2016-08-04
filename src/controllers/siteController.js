
var GameModel = require('../models/game.server.model');
var gameRepository = require('../../lib/toptrumpRepository');
var scoringEngine = require('../../lib/scoringEngine');
var session = require('../../lib/session');

module.exports = function (payLoad) {
    var index = function (req, res) {
        gameRepository.fetchLeagueTable(function(err,leagueTable) {
            payLoad.leaderBoard = leagueTable;
            console.log(payLoad.leaderBoard);
        });
        payLoad.me = '';
        payLoad.avatarURL = '';
        res.render('index', payLoad);
    };

    var game = function (req, res) {
        res.render('game', payLoad);
    };

    var playRound = function (req, res) {
        payLoad.errorMessage = '';
        switch (req.body['player-action']) {
            case 'runaway':
                payLoad.errorMessage = 'Ran Away. No score this game';
                payLoad.gameName = '';
                req.session.gameId = '';
                payLoad.gameId = '';
                res.render('game', payLoad);
                break;
            case 'newgame':
                gameRepository.fetchLeagueTable(function(err,leagueTable) {
                    payLoad.leaderBoard = leagueTable;
                });

                gameRepository.createGame(req.session.passport.user.username, req.body['game-name'], function(err,newGame) {
                    req.session.gameId = newGame.id;
                    req.session.creator = newGame.creator;
                    payLoad.creator = newGame.creator;
                    payLoad.gameName = newGame.name;
                    payLoad.gameId = newGame.id;
                    payLoad.rounds = [];
                    res.render('game', payLoad);
                });
                break;
            case 'joingame':
                gameRepository.fetchLeagueTable(function(err,leagueTable) {
                    payLoad.leaderBoard = leagueTable;
                });

                gameRepository.fetchGameByName(req.body['game-name'], function(err,existingGame) {
                    req.session.gameId = existingGame.id;
                    req.session.creator = existingGame.creator;
                    payLoad.creator = existingGame.creator;
                    payLoad.gameName = existingGame.name;
                    payLoad.gameId = existingGame.id;
                    payLoad.rounds = [];
                    existingGame.players[1].name = req.session.passport.user.username;
                    gameRepository.saveGame(existingGame, function(err,existingGame) {
                        res.render('game', payLoad);
                    });

                });
                break;
            case 'fight':
                var combatTeam = require('../validators/combatTeam')(req.body);
                var playerIdx = 0;

                payLoad.errorMessage = combatTeam.validate();

                // error detected by validator(s). Just return page with current set of data.
                if (payLoad.errorMessage !== '') {
                    res.render('game', payLoad);
                }
                // player has entered valid information. Play the round

                payLoad.gameId = req.session.gameId;
                if (req.session.creator === req.session.passport.user.username) {
                    playerIdx = 0;
                }
                else {
                    playerIdx = 1;
                }

                var round = {
                        characters : [
                            {
                                type:req.body['character-type-1'],
                                attack: req.body['character-attack-1'],
                                value: req.body['character-value-1']
                            },
                            {
                                type:req.body['character-type-2'],
                                attack: req.body['character-attack-2'],
                                value: req.body['character-value-2']
                            },
                            {
                                type:req.body['character-type-3'],
                                attack: req.body['character-attack-3'],
                                value: req.body['character-value-3']
                            },
                            {
                                type:req.body['character-type-4'],
                                attack: req.body['character-attack-4'],
                                value: req.body['character-value-4']
                            }
                        ]
                    };

//                round.players[0].score = scoringEngine.calclateScore(round.players[0].characters);

                gameRepository.addRoundToGame(payLoad.gameId, round, playerIdx, function(err, game, myGameOver, gameOver) {
                    var totScores = [0,0];
                    for (var r = 0 ; r < Math.min(game.players[0].rounds.length,game.players[1].rounds.length) ; r++) {
                        var scores = scoringEngine.charScore(game.players[0].rounds[r].characters,
                                                        game.players[1].rounds[r].characters);
                        game.players[0].rounds[r].score = scores[0];
                        game.players[1].rounds[r].score = scores[1];

                        totScores[0] += game.players[0].rounds[r].score;
                        totScores[1] += game.players[1].rounds[r].score;

                    }

                    if (myGameOver === true) {
                        payLoad.gameName = '';
                        req.session.gameId = '';
                        payLoad.gameId = '';
                        payLoad.rounds = [];

                    }

                    if (gameOver === true) {

                        switch (true){
                            case(totScores[0] > totScores[1]):
                                game.winner = game.players[0].name;
                                break;
                            case(totScores[0] < totScores[1]):
                                game.winner = game.players[1].name;
                                break;
                            default:
                                game.winner = 'no one (DRAW)';
                        }
                        game.players[0].gameScore = totScores[0];
                        game.players[1].gameScore = totScores[1];

                        payLoad.errorMessage = 'Game Over. You scored ' + totScores[playerIdx];

                    }
                    gameRepository.saveGame(game, function(err) {
                        payLoad.rounds = game.players[playerIdx].rounds;
                        if (gameOver === true) {
                            // todo : change league table
                            gameRepository.gameOver(game, function(err,game) {
                                res.render('game', payLoad);
                            });
                        }
                        else {
                            res.render('game', payLoad);
                        }
                    });
                });
                // display page to allow the player to continue with game.
                break;
        }
    };
    return {
        game: game,
        index: index,
        playRound: playRound
    };
};