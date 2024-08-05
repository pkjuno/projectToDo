const User = require('../models/userModel');
const passport = require('passport');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        //const user = await User.create(username, email, password);

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

exports.getUserInfo = async (req, res) => {
    console.log(req.params);
    const { user_sno } = req.params;
    try{
        const user = await User.findById(Number(user_sno));
        console.log(user);
        if (user) {
            res.render('user/userPage', { user });
        } else {
            res.status(404).render('404', { message: 'User not found' });
        }
    } catch (error){
        res.status(500).json({ message: 'Error getting user information', error });
    }


}
//
// exports.login = async (req, res, next) => {
//     // const { user_email, user_password } = req.body;
//     // try {
//     //     const user = await User.findByEmailAndPass(user_email, user_email);
//     //     if (user){
//     //         req.session.user = {
//     //             user_sno: user.user_sno,
//     //             user_id: user.user_id,
//     //             user_name: user.user_name,
//     //             user_email: user.user_email
//     //         };
//     //         console.log(req.session.user);
//     //         res.json({ success: true }); // 클라이언트에 성공 응답
//     //         //res.redirect('/main'); // 로그인 후 메인 페이지로 리다이렉트
//     //     }
//     // }catch (error){
//     //
//     // }
// };

exports.logout = (req, res, next) => {
    req.logout(() => {

    });
};