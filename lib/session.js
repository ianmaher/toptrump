var passport = require('passport'),
    mongodb = require('mongodb').MongoClient;

module.exports = (function() {
    var user = {
        username: 'n/a'
    };
    var game = {
        id: String
    };
    return {
        user: user,
        game: game
    };
})();