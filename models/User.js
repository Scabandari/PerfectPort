const mongoose = require('mongoose');
//const Schema   = mongoose.Schema;
//De-strcuturing
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	coins: [{type: mongoose.Schema.Types.ObjectId, ref: 'coins'}]
});

module.exports = mongoose.model('users', userSchema);
