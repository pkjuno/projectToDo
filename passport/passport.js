const passport = require('passport');
const local = require('./localStrategy');

const User = require('../models/userModel');

module.exports = () => {
    passport.serializeUser((user, done) => {
        console.log('serialize');
        console.log(`User   ::::     [   ${user}    ]`);
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        console.log('deserialize');
        console.log(`User   ::::     [   ${user.user_sno}    ]`);
        User.findById(user.user_sno)
            .then(user => {
                console.log('user', user.user_sno);
                done(null, user);
            })
            .catch(err => done(err));
    });

    local();
};