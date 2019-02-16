const CoinListing = require('../models/CoinListing');
const Coin = require('../models/Coin');
const User = require('../models/User');

const mongoose = require('mongoose');

module.exports = app => {

  // todo: Modify this so that a symbol is passed through the request
  app.get('/api/listing', (req, res) => {
    //console.log('Get request for CoinListing received');
      CoinListing.findOne({
        symbol: req.query.symbol
      }).then(coin => {
        res.json(coin);
      }).catch(err => {
        console.log("ERROR during get request for a listing on the server side: ", err);
      });
  });

  // Update a user's list of coins
  app.put('/api/coins', (req, res) => {
    console.log('request body', req.body);
    console.log('POST request to add a Coin to a users coins received');
    new Coin({
      ticker: req.body.params.ticker,
      id: req.body.params.id,
      name: req.body.params.id,
      positionSize: req.body.params.positionSize,
      price: req.body.params.price,
      volume_24h: req.body.params.volume_24h,
      percent_change_1h: req.body.params.percent_change_1h,
      percent_change_24h: req.body.params.percent_change_24h,
      percent_change_7d: req.body.params.percent_change_7d
    }).save().then(coin => {
      User.findOne({_id: req.body.params.user_id}).then(user => {
        user_coins = user.coins;
        user_coins.push(coin);
        user.coins = user_coins;
        user.save().then(user => {
          res.json(user);
        }).catch(err => {
          console.log("ERROR while saving a User to mongodb, coinRoutes: ", err);
        });
      })
    }).catch(err => {
      console.log("ERROR while saving a Coin to mongodb, coinRoutes: ", err);
    });
  });


  // Include user_id in request params to get that user back from which can access their coins
  app.get('/api/coins', (req, res) => {
    //console.log('request body', req.query);
    User.findOne({
      _id: req.query.user_id
    }).populate('coins').then(coins => {
      console.log("user's coins: ", coins);
      res.json(coins);
    }).catch(err => {
      console.log("ERROR : ", err);
    });
  });

  app.post('/api/twitter', (req, res) => {
    console.log('request body', req.body);
    console.log('POST request to add a Coin to a users coins received');
    new Twitter({
      ticker: 'BTC',
      sentiment: req.body.params.sentiment
    }).save().then(coin => {
      res.send("Success fud");
    }).catch(err => {
      console.log("ERROR while saving a User to mongodb, coinRoutes: ", err);
    });
  });

};

