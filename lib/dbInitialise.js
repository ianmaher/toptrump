'use string';
var GameModel = require('../src/models/game.server.model');
var LeagueModel = require('../src/models/league.server.model');

var dataInitializer = (function () {
    var initializeData = function (errorCallback) {
        var myGame = new GameModel(
            {
                name: 'gary',
                winner: '',
                rounds: [{
                        roundCounter : 1,
                        players : [{
                            name : 'Kingdom03',
                            score : 5,
                            numOfGames : 1,
                            characters : [{
                                type : 'Warrior',
                                attack : 9001,
                                value : 0,
                                charOrder : 2
                            },{
                                type : 'Wizard',
                                attack : 3,
                                value : 10,
                                charOrder : 1
                            },{
                                type : 'Thief',
                                attack : 2,
                                value : 9001,
                                charOrder : 4
                            },{
                                type : 'Priest',
                                attack : 100,
                                value : 10,
                                charOrder : 3
                            }]
                        },{
                            name : 'green',
                            score : 5,
                            numOfGames : 1,
                            characters : [{
                                type : 'Warrior',
                                attack : 9001,
                                value : 0,
                                charOrder : 2
                            },{
                                type : 'Wizard',
                                attack : 9999,
                                value : 0,
                                charOrder : 1
                            },{
                                type : 'Thief',
                                attack : 9999,
                                value : 0,
                                charOrder : 4
                            },{
                                type : 'Priest',
                                attack : 9999,
                                value : 0,
                                charOrder : 3
                            }]
                        }]
                    },
                    {
                    roundCounter : 2,
                    players : [{
                            name : 'Kingdom03',
                            score : 5,
                            numOfGames : 1,
                            characters : [{
                                type : 'Warrior',
                                attack : 9001,
                                value : 0,
                                charOrder : 2
                            },{
                                type : 'Wizard',
                                attack : 3,
                                value : 10,
                                charOrder : 1
                            },{
                                type : 'Thief',
                                attack : 2,
                                value : 9001,
                                charOrder : 4
                            },{
                                type : 'Priest',
                                attack : 100,
                                value : 10,
                                charOrder : 3
                            }]
                        } ,
                    {
                        name : 'green',
                        score : 5,
                        numOfGames : 1,
                        characters : [{
                            type : 'Warrior',
                            attack : 1,
                            value : 9999,
                            charOrder : 2
                        },{
                            type : 'Wizard',
                            attack : 0,
                            value : 9999,
                            charOrder : 1
                        },{
                            type : 'Thief',
                            attack : 0,
                            value : 9999,
                            charOrder : 4
                        },{
                            type : 'Priest',
                            attack : 0,
                            value : 9999,
                            charOrder : 3
                        }]
                    }]
                }
            ],
        });

        myGame.save(function (err) {
            console.log('saved seed records');
            if (err) {
                return errorCallback(err);
            }
        });

        var myLeague = new LeagueModel({
            name:'player league',
            matches: []
        });

        myLeague.save(function (err) {
            console.log('saved seed records');
            if (err) {
                return errorCallback(err);
            }
        });

    };

    return {
        initializeData: initializeData,
    };
} ());

module.exports = dataInitializer;