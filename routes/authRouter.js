const express = require('express');
const passport = require('passport');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middleWares');
const { login, logout } = require('../controllers/authController');

// POST /auth/login
router.post('/login', isNotLoggedIn, login);

// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

// GET /auth/kakao
router.get('/kakao', passport.authenticate('kakao'));

// GET /auth/kakao/callback
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/?error=카카오로그인 실패',
}), (req, res) => {
    console.log("성공");
    res.redirect('/user/myPage'); // 성공 시에는 /로 이동
});

module.exports = router;