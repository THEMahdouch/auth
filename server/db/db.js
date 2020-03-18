const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/auth', {useNewUrlParser: true});

const user =  new mongoose.Schema({
    username: String,
    password: String
  });