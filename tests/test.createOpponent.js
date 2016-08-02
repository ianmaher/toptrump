var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var opponent = require('../lib/opponent');

describe('CreateOpponent - even split', function() {
    it ('evenSplit() should return 25 for each Attack when 100 is split by 4', function() {
        var evenSplit = opponent.chooseStrategy('even');
        var attackValues = evenSplit(4,100);
        expect(attackValues[0]).to.equal(25);
        expect(attackValues[1]).to.equal(25);
        expect(attackValues[2]).to.equal(25);
        expect(attackValues[3]).to.equal(25);
    });

    it ('evenSplit() should add up to 100  when 100 is split by 4', function() {
        var evenSplit = opponent.chooseStrategy('even');
        var attackValues = evenSplit(4,100);
        expect(opponent.checkArray(100,attackValues)).to.equal(true);
    });

    it ('evenSplit() should return 12 or 13 for each Value when 50 is split by 4', function() {
        var evenSplit = opponent.chooseStrategy('even');
        var attackValues = evenSplit(4,50);
        expect(attackValues[0]).to.equal(12);
        expect(attackValues[1]).to.equal(13);
        expect(attackValues[2]).to.equal(12);
        expect(attackValues[3]).to.equal(13);
    });

   it ('evenSplit() should add up to 50  when 50 is split by 4', function() {
        var evenSplit = opponent.chooseStrategy('even');
        var attackValues = evenSplit(4,50);
        expect(opponent.checkArray(50,attackValues)).to.equal(true);
    });

});

describe('CreateOpponent - interval split', function() {
    it ('intervalSplit() should add up to 100  when 100 is split by 4', function() {
        var intervalSplit = opponent.chooseStrategy('interval');
        var attackValues = intervalSplit(4,100);
        expect(opponent.checkArray(100,attackValues)).to.equal(true);
    });


   it ('intervalSplit() should add up to 50  when 50 is split by 4', function() {
        var intervalSplit = opponent.chooseStrategy('interval');
        var attackValues = intervalSplit(4,50);
        expect(opponent.checkArray(50,attackValues)).to.equal(true);
    });

});

describe('CreateOpponent - random split', function() {
    it ('randomSplit() should add up to 100  when 100 is split by 4', function() {
        var randomSplit = opponent.chooseStrategy('interval');
        var attackValues = randomSplit(4,100);
        expect(opponent.checkArray(100,attackValues)).to.equal(true);
    });


   it ('randomSplit() should add up to 50  when 50 is split by 4', function() {
        var randomSplit = opponent.chooseStrategy('interval');
        var attackValues = randomSplit(4,50);
        expect(opponent.checkArray(50,attackValues)).to.equal(true);
    });

});