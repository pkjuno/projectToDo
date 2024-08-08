const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/userModel');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'user_email', //req.body.user_email
        passwordField: 'user_password', // req.body.user_password
        passReqToCallback: false,
    }, async (email, password, done) => {
        try {
            // const exUser = await User.findOne({ where: { email } });
            const exUser = await  User.findByEmailAndPass(email, password);
            if (exUser) {
                const result = true;//await bcrypt.compare(password, exUser.user_password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                }
            } else {
                done(null, false, { message: '가입되지 않은 회원입니다.' });
            }
        } catch (error) {
            // 예상하지 못한 에러 발생시
            console.error(error);
            done(error);
        }
    }));
};