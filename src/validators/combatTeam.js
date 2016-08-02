module.exports = function (payLoad) {
    var validate = function()
    {
        var errorMessage = '';
        var totalAttack = parseInt('0' + payLoad['character-attack-1']) +
            parseInt('0' + payLoad['character-attack-2']) +
            parseInt('0' + payLoad['character-attack-3']) +
            parseInt('0' + payLoad['character-attack-4']);
        if (totalAttack > 100) {
            errorMessage += 'Error -  Too much Attack! ' + totalAttack + '. ';
        }

        var totalValue = parseInt('0' + payLoad['character-value-1']) +
            parseInt('0' + payLoad['character-value-2']) +
            parseInt('0' + payLoad['character-value-3']) +
            parseInt('0' + payLoad['character-value-4']);
        if (totalValue > 50) {
            errorMessage += 'Error - Too much Value! ' + totalValue + '. ';
        }
        return errorMessage;
    };

    return {
        validate : validate
    };

};