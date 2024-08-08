const User = require('../models/userModel');
const passport = require('passport');

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if ( err ){
            // 서버 에러
            console.error(err);
            return next(err);
        }
        if ( !user ){
            return res.redirect(`/?loginError=${info.message}`);
        }

        return req.login(user, (loginError) => {
            if ( loginError ){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/user/myPage');
        });
    })(req,res, next); // 미들웨어 확정 패턴
}

exports.logout = (req, res) => {
    console.log('Before logout: ', req.session);

    req.logout((err) => { // 콜백 함수 추가
        if (err) {
            console.error('Logout Error:', err);
            return next(err);
        }

        req.session.destroy((err) => {
            if (err) {
                console.error('Session Destruction Error:', err);
                return res.status(500).send('Session destruction failed');
            }
            console.log('Session destroyed');
            res.clearCookie('sessionName'); // 쿠키 삭제
            console.log('Session destroyed');
            res.redirect('/');
        });
    });
};