//create a brand new express application
//import express library
//import passport
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const cors = require('cors');
require('./models/User');
require('./services/passport');
const Twitter = require('./models/Twitter');

mongoose.connect(keys.mongoURI);

const app = express();

//tell express to use cookies
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookie]
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors({origin: 'http://localhost:3000'}));

//export app function to authRoutes
require('./routes/authRoutes')(app);
require('./routes/coinRoutes')(app);

app.get('/', (req, res) => {
  //console.log('Get request for CoinListing received');
  res.send('okay');
});


app.get('/BTC', (req, res) => {
  //console.log('Get request for CoinListing received');
	//res.send("working");
  Twitter.findOne().then(coin => {
    //res.json(coin);
		res.send(coin);
  }).catch(err => {
    console.log("ERROR during get request for a listing on the server side: ", err);
  });
});

// app.put('/api/coins', (req, res) => {
//   console.log('request body', req.body);
//   console.log('POST request to add a Coin to a users coins received');
//   new Twitter({
//     ticker: 'BTC'
//   }).save().then(coin => {
//     res.send("Success");
//   }).catch(err => {
//     console.log("ERROR while saving a User to mongodb, coinRoutes: ", err);
//   });
// });

// app.post('/api/coins', (req, res) => {
//   console.log('request body', req.body);
//   console.log('POST request to add a Coin to a users coins received');
//   new Twitter({
//     ticker: 'BTC',
// 		sentiment: req.body.params.sentiment
//   }).save().then(coin => {
//     res.send("Success fud");
//   }).catch(err => {
//     console.log("ERROR while saving a User to mongodb, coinRoutes: ", err);
//   });
// });



//dynamically figure out what port to list to #heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);
