
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
                console.log('call create game');
                gameRepository.fetchLeagueTable(function(err,leagueTable) {
                    payLoad.leaderBoard = leagueTable;
                });

                gameRepository.createGame(function(err,newGame) {
                    payLoad.gameName = newGame.name;
                    req.session.gameId = newGame.id;
                    payLoad.gameId = newGame.id;
                    payLoad.rounds = [];
                    res.render('game', payLoad);
                });
                break;
            case 'fight':
                var combatTeam = require('../validators/combatTeam')(req.body);

                payLoad.errorMessage = combatTeam.validate();

                // error detected by validator(s). Just return page with current set of data.
                if (payLoad.errorMessage !== '') {
                    res.render('game', payLoad);
                }
                // player has entered valid information. Play the round

                payLoad.gameId = req.session.gameId;
                var round = {
                    players : [{
                        name: req.session.passport.user.username,
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
                    }]
                };
                round.players[0].score = scoringEngine.calclateScore(round.players[0].characters);

                gameRepository.addRoundToGame(payLoad.gameId, round, function(err, game, gameOver) {
                    payLoad.rounds = game.rounds;
                    if (gameOver === true) {
                        var gameScore = 0;
                        for (var i = 0 ; i < game.rounds.length ; i++)
                        {
                            if (game.rounds[i].players[0].score > 0) {
                                gameScore += game.rounds[i].players[0].score;
                            }
                        }
                        game.score = gameScore;
                        game.winner = req.session.passport.user.username;
                        gameRepository.gameOver(game, function(err) {
                            console.log('error in game over' + err);
                        });

                        payLoad.errorMessage = 'Game Over. You scored ' + gameScore;
                        payLoad.gameName = '';
                        req.session.gameId = '';
                        payLoad.gameId = '';
                        payLoad.rounds = [];

                    }
                    res.render('game', payLoad);
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