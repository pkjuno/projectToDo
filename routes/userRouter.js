const express = require('express');
const {isNotLoggedIn, isLoggedIn} = require("../middleWares");
const router = express.Router();

router.use( (req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get('/myPage', isLoggedIn, (req, res)=>{
    const user = req.user; // 사용자 정보를 가져옵니다.
    console.info(`req :::::::  ${req} `);
    console.log(`user :::::: router :::::  ${user}`);
    console.log(`user :::::: session :::::  ${req.session}`);
    res.render("user/myPage", {session:user});
});

module.exports = router;