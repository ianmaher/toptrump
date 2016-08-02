var express = require('express');
var authRouter = express.Router();

var router = function() {
    var authController = require('../controllers/authController')();

    authRouter.route('/signin')
        .get(authController.signIn)
        .post(authController.signInPost);

    authRouter.route('/signout')
        .get(function(req,res) {
            req.logout();
            res.redirect('/');
        });

    authRouter.route('/signup')
        .get(authController.signUp)
        .post(authController.signUpPost);

    authRouter.route('/profile')
        .all(function(req,res,next) {
            if (!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get(function(req,res) {
            res.json(req.user);
        });
    return authRouter;
};

module.exports = router;