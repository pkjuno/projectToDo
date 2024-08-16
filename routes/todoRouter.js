const express = require('express');
const { isLoggedIn } = require('../middleWares');
const { testTodo, insertTodo } = require('../controllers/todoController');
const router = express.Router();

router.get('/getTodoList', isLoggedIn,(req,res)=>{
    const user = req.user; // 사용자 정보를 가져옵니다.
    res.render('todo/todoList', {session:user});
});

router.post('/addTask', insertTodo);

module.exports = router;