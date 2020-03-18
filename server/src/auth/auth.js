const express = require('express');
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const router = express.Router();


const schema = Joi.object({

  // TODO : update the regex for the username
  username: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9_]{3,30}$'))
    .required(),

  // TODO : update the regex for the username
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9_]{10,50}$'))
    .required(),
})
  .with('username', 'password')
  .xor('password');


router.get('/', (req, res) => {
  res.json({
    message: '🔒 You are inside the authentication system 🔒',
  });
});

router.post('/signup', (req, res) => {
  const result = schema.validate(req.body);

  if (result.error) {
    res.json({
        message: "Invalid username or password",
        status: 400
    });
  } else {

    res.json({
        message: "You successfully signed up."
    });
  }

  
});

module.exports = router;
