const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Coin = new Schema({
  ticker: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  positionSize: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('coins', Coin);
//module.exports = MyCoins;