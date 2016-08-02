var passport = require('passport');

module.exports = function(app) {
console.log('passport config');
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user,done) {
        done(null, user);
    });

    passport.deserializeUser(function(user,done) {
        done(null, user);
    });

    // execute the local strategy
    require('./strategies/local.strategy')();

};