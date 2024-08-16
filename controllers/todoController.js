const Todo = require('../models/todoModel');

exports.testTodo = async (req, res) => {
  const todo =   await Todo.getTodoRegNo();
  console.log("TODO     " + todo);
};

exports.insertTodo = async (req, res) => {
  const todo_title = req.body.todo_title;
  const todo_contents = req.body.todo_contents;
  const todo_start_dt = req.body.todo_start_dt;
  const todo_end_dt = req.body.todo_end_dt;
  const todo_priority = req.body.todo_priority;
  const todo_reg_id = req.body.todo_reg_id;

  await Todo.insertTodo(todo_title, todo_contents, todo_start_dt, todo_end_dt, todo_priority, todo_reg_id);

  res.redirect('/todo/getTodoList');
};

