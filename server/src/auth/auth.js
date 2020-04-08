const express = require('express');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const DB = require("../db/db.js");

require('dotenv').config();

const schema = Joi.object({

    email: Joi.string()
        .trim()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr', 'be'] } })
        .required(),

    // TODO : update the regex for the password
    password: Joi.string()
        .trim()
        .pattern(new RegExp('^[a-zA-Z0-9_]{10,50}$'))
        .required(),
    salt: Joi.string(),
})
.with('email', 'password')
.xor('password');

router.get('/', (req, res) => {
    res.json({
        message: '🔒 You are inside the authentication system 🔒',
    });
});

router.post('/signup', (req, res, next) => {

    // Validate user
    const result = schema.validate(req.body);
    if (result.error) {
        req.statusCode = 400;
        return next(result.error);
    }

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds).then(createdSalt => {
        bcrypt.hash(req.body.password, createdSalt).then(hashedPassword => {
            const user = {
                email: req.body.email,
                password: hashedPassword,
                salt: createdSalt,
            }
            const newUser = new DB.User(user);
            newUser.save(function (err, newUser) {
                if (err) {
                    req.statusCode = 400;
                    return next(err)
                };
            });

            res.json({
                message: "You successfully signed up."
            });
        });
    });
});

router.post('/login', (req, res, next) => {

    // TODO: Add a rate limit on specific request

    // Validate user
    const result = schema.validate(req.body);
    if (result.error) {
        const error = new Error("Unable to login.");
        req.statusCode = 400;
        return next(error);
    }

    const query = DB.User.where({
        email: req.body.email,
    });

    query.findOne((err, user) => {
      
        if(err || !user) {
            const error = new Error("Unable to login.");
            res.statusCode = 400;
            return next(error);
        }

        bcrypt.hash(req.body.password, user.salt).then(hashedPassword => {
            if(hashedPassword !== user.password) {
                const error = new Error("Unable to login.");
                res.statusCode = 400;
                return next(error);
            }
    
            const payload = {
                _id: user._id,
                email: user.email,
            };
            jwt.sign(payload, 
                process.env.TOKEN_SECRET, 
                { expiresIn: '1d' }, 
                (err, token) => {
                    if(err) {
                        console.log(err);
                        const error = new Error("Unable to login.");
                        res.statusCode = 400;
                        return next(error);
                    }

                    res.json({
                        token
                    });
                });
        }).catch(() => {
            const error = new Error("Unable to login.");
            res.statusCode = 400;
            return next(error);
        });
    })
});

module.exports = router;