var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    id: String,
    saldo: String
});

module.exports = User = mongoose.model('User', UserSchema);