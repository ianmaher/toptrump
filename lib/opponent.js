var funcs = require('./functions');

module.exports = (function() {
    var chooseType = function() {
        var types = ['Warrior', 'Thief', 'Wizzard', 'Priest'];
        return types[funcs.numberBetween(1,types.length) - 1];

    };
    var evenSplit = function(cnt, number) {
        var ret = [];
        var isOdd = false;
        var r = 0;
        for (var i = 0 ; i < cnt ; i++) {
            r = number / cnt;
            if (isOdd) {
                r = Math.ceil(r);
            } else {
                r = Math.round(r - 0.1);
            }
            ret.push(r);
            isOdd = !isOdd;
        }
        return ret;
    };

    var intervalSplit = function(cnt, number) {

        var ret = [];
        var r = 0;
        var total = 0;
        var interval = Math.round(number / (cnt - 1));
        for (var i = 0 ; i < cnt - 1 ; i++) {
            r = funcs.numberBetween(1,interval);
            total += r;
            ret.push(r);
        }
        ret.push(number - total);
        return ret;

    };

    var randomStrategy = function() {
        var idx = funcs.numberBetween(1,2);
        switch (idx) {
            case 1:
                return evenSplit;
            case 2:
                return intervalSplit;
            default:
                return evenSplit;
        }
    };

    var checkArray = function(target, arr) {
        var total = 0;
        for (var i = 0 ; i < arr.length ; i++) {
            console.log('checking ' + i + ' ' + arr[i]);
            total += arr[i];
        }
        return target === total ;
    };

    var chooseStrategy = function(strategy) {
        switch (strategy) {
            case 'even':
                return evenSplit;
            case 'interval':
                return intervalSplit;
            case 'random':
                return randomStrategy();
        }
    };

    var createOpponent = function() {
        var attacks = chooseStrategy('random')(4,100);
        var values = chooseStrategy('random')(4,50);
        return [
                {
                    type: chooseType(),
                    attack: attacks[0],
                    value: values[0]
                },
                {
                    type: chooseType(),
                    attack: attacks[1],
                    value: values[1]
                },
                {
                    type: chooseType(),
                    attack: attacks[2],
                    value: values[2]
                },
                {
                    type: chooseType(),
                    attack: attacks[3],
                    value: values[3]
                }
            ];

    } ;

    return {
        chooseStrategy : chooseStrategy,
        checkArray : checkArray,
        createOpponent : createOpponent
    };
})();
