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