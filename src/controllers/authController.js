var passport = require('passport'),
    mongodb = require('mongodb').MongoClient;

module.exports = function (nav) {

    var signIn = function (req, res) {
        res.render('signin',{title:'Sign In', nav: nav});
    };

    var signInPost = function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err || !user) {
                res.status(400).send(info);
            } else {
                // Remove sensitive data before login
                user.password = undefined;
                req.login(user, function (err) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.redirect('/game');
                    }
                });
            }
        })(req, res, next);
    };

    var signUp = function (req, res) {
        res.render('signup',{title:'Sign Up', nav: nav});
    };

    var signUpPost = function(req,res) {
        var url = 'mongodb://localhost:27017/toptrumps';
        mongodb.connect(url, function(err,db) {
            var collection = db.collection('users');
            var user = {
                username: req.body.username,
                password: req.body.password
            };
            collection.insert(user, function(err,results) {
                req.login(results, function() {
                    res.redirect('/game');
                });
            });
        });
    };

    var profile = function (req, res) {
        res.render('profile',{title:'Profile', nav: nav});
    };

    return {
        signInPost: signInPost,
        signIn: signIn,
        signUpPost: signUpPost,
        signUp: signUp
    };
};