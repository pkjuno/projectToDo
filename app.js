const express = require('express');
const pool = require('./config/database');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const passportConfig = require('./passport/passport');

dotenv.config();
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const app = express();
passportConfig();
const hostname = '127.0.0.1';
const port = 3000;

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/adminlte', express.static(path.join(__dirname, 'node_modules/admin-lte')));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));
app.use(passport.initialize()); // req.user / req.login / req.isAuthenticate, req.logout 생성
app.use(passport.session()); // 세션 쿠키가 브라우저로 전송

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/user', userRouter); // 라우터 접두어 설정
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.render('main', {session: req.session });
});

app.get('/main', (req, res)=>{
    res.render('main', {session : req.session})
});
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});