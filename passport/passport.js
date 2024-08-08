const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');

const User = require('../models/userModel');

module.exports = () => {
    passport.serializeUser((user, done) => {
        console.log('serialize');
        console.log(`User   ::::     [   ${user.user_sno}    ]`); // user_sno 사용
        done(null, user.user_sno); // 세션에 사용자 ID만 저장
    });

    passport.deserializeUser((user_sno, done) => {
        console.log('deserialize');
        console.log(`User   ::::     [   ${user_sno}    ]`); // 사용자 ID 사용
        User.findById(user_sno)
            .then(user => {
                console.log('Deserialized User', user); // 복원된 사용자 정보
                done(null, user); // 사용자 객체를 세션에 복원
            })
            .catch(err => done(err));
    });

    local();
    kakao();
};