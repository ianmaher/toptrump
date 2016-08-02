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

    return {
        calclateScore :calclateScore
    };
})();
