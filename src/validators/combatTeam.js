module.exports = function (payLoad) {
    var validate = function()
    {
        var errorMessage = '';
        var totalAttack = parseInt('0' + payLoad['character-attack-1']) +
            parseInt('0' + payLoad['character-attack-2']) +
            parseInt('0' + payLoad['character-attack-3']) +
            parseInt('0' + payLoad['character-attack-4']);
        if (totalAttack != 100) {
            errorMessage += 'Error - You have to assign 100 points! You entered a total of ' + totalAttack + '. ';
        }

        var totalValue = parseInt('0' + payLoad['character-value-1']) +
            parseInt('0' + payLoad['character-value-2']) +
            parseInt('0' + payLoad['character-value-3']) +
            parseInt('0' + payLoad['character-value-4']);
        if (totalValue != 50) {
            errorMessage += 'Error - You have to assign 50 points! You entered a total of ' + totalValue + '. ';
        }
        return errorMessage;
    };

    return {
        validate : validate
    };

};