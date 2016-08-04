var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
// authentication
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var config = require('./config/config.development.json'),
    db = require('./lib/database');

db.init(config.databaseConfig);

var port = process.env.PORT || 4000;

var payLoad = {
    title:' Top Trumps',
    gameName: '',
    creator: '',
    gameId: '',
    errorMessage: '',
    nav:[],
    leaderBoard:[],
    rounds:[],
    avatarURL: ''
};

var siteRoutes = require('./src/routes/siteRoutes')(payLoad);
var authRoutes = require('./src/routes/authRoutes')();

app.use(express.static('public'));
app.set('views','./src/views');
app.set('view engine','ejs');

// set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// auth middleware
app.use(cookieParser());
app.use(session({secret: 'secret'}));

require('./src/config/passport')(app);

// set up routing table
app.use('/',siteRoutes);
app.use('/auth',authRoutes);

app.listen(port, function () {
    console.log('example app listening on port ' + port + '!');

});