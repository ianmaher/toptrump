'use strict';
var gameRepository = require('./lib/toptrumpRepository'),
  config = require('./config/config.development.json'),
  db = require('./lib/database'),
  se = require('./lib/scoringEngine');

db.init(config.databaseConfig);

gameRepository.fetchGameByName('gary', function (err, myGame) {
    if (err) {
        console.log(err);
    } else {
        console.log('Data Retrieved!');
        var totScorePl1 = 0;
        var totScorePl2 = 0;
        for (var r = 0 ; r < myGame.rounds.length ; r++) {
            var round = myGame.rounds[r];
            var scores = se.charScore(round.players[0].characters,round.players[1].characters);
            console.log('');
            console.log('Player 1 score - ' + scores[0]);
            console.log('Player 2 score - ' + scores[1]);
            console.log('');

            round.players[0].score = scores[0];
            round.players[1].score = scores[1];

            totScorePl1 += round.players[0].score;
            totScorePl2 += round.players[1].score;
        }

        switch (true){
            case(totScorePl1 > totScorePl2):
                myGame.winner = myGame.rounds[0].players[0].name;
                break;
            case(totScorePl1 < totScorePl2):
                myGame.winner = myGame.rounds[0].players[1].name;
                break;
            default:
                myGame.winner = 'no one (DRAW)';
        }

        console.log('The winner is ' + myGame.winner)

        gameRepository.saveGame(myGame, function(err, myGame) {
            gameRepository.fetchLeagueTable(function(err,league){
                league.games.push({winner: myGame.winner});
                league.save();
            })

        });
    }
});
