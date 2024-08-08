const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/userModel');

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_RESTAPI_KEY,
        callbackURL: 'http://localhost:3000/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
            const exUser = await User.findByEmail(profile._json.kakao_account.email);
            if (exUser) {
                done(null, exUser);
            } else {
                // 등록된 이메일이 없으므로 회원가입 페이지로 이동 해야함
                console.log('No existing user found. Creating new user...');
                const newUser = await User.createKakaoUser(profile._json.kakao_account.email);
                console.log(newUser.user_sno);

                console.log('New user created:', newUser);

                await User.createProvider(profile.id, 'kakao');

                const kakaoAuth = await User.createKaKaoAuth(
                    newUser.user_sno,
                    profile.id,
                    accessToken,
                    refreshToken
                );

                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};