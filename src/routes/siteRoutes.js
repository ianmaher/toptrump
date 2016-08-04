var express = require('express');
var siteRouter = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var session = require('../../lib/session');

var router = function(payLoad) {
    console.log('calling router');
    var siteController = require('../controllers/siteController')(payLoad);

    siteRouter.route('/')
        .get(siteController.index);

    siteRouter.route('/game')
        .all(function(req,res,next) {

            if (!req.user) {
                res.redirect('/');
            }

            payLoad.me = req.session.passport.user.username;
            payLoad.avatarURL = req.session.passport.user.avatar;
            next();
        })
        .get(siteController.game)
        .post(urlencodedParser, siteController.playRound);

    return siteRouter;
};

module.exports = router;