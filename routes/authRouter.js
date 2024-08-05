const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middleWares');
const { login, logout } = require('../controllers/authController');

router.use( (req, res, next) => {
    res.locals.user = req.user;
    next();
});

// POST /auth/login
router.post('/login', isNotLoggedIn, login);

// GET /auth/logout
router.get('/logout', isLoggedIn, (req, res)=>{
    console.log('00000000000000000000000000000');
    console.log(req);
    console.log('00000000000000000000000000000');
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;