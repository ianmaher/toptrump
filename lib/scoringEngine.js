var func = require('./functions');
var opponent = require('./opponent');

module.exports = (function() {
    var computerCharacters;

    var calclateScore = function(characters) {
        var score = 0;
        computerCharacters = opponent.createOpponent();
        for (var i = 0 ; i < characters.length ; i++)  {
            if (characters[i].attack > computerCharacters[i].attack) {
                score += computerCharacters[i].value;
            }
        }
        return score;
    };
    var charScore = function(p1Characters,p2Characters) {
            var score = [0,0];

            for (var i = 0 ; i < p1Characters.length ; i++)  {
                switch (true){
                    case(p1Characters[i].attack > p2Characters[i].attack):
                        score[0] += p2Characters[i].value;
                        break;
                    case(p1Characters[i].attack < p2Characters[i].attack):
                        score[1] += p1Characters[i].value;
                        break;
                }
            }
            return score;
        };

    return {
        calclateScore :calclateScore,
        charScore :charScore
    };
})();
