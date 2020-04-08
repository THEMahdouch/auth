const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/auth', {useNewUrlParser: true, useUnifiedTopology: true} );

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const userSchema =  new mongoose.Schema({
    email: String,
    password: String,
    salt: String
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};