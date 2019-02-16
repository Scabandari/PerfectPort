const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoinListing = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('listings', CoinListing);