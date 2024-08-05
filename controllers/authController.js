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