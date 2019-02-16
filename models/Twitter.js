const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Twitter = new Schema({
  ticker: String,
  sentiment: Number
});

module.exports = mongoose.model('twitter', Twitter);