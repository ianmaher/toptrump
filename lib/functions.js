module.exports = (function() {
    var numberBetween = function(min, max) {
        var r = Math.floor(Math.random() * (max - min + 1) + min);
        return r;
    };
    return {
        numberBetween: numberBetween
    };
})();