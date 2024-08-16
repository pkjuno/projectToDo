const pool = require('../config/database');

const dayjs = require('dayjs');
const now = dayjs();

class Todo {
    constructor(todo_sno, todo_reg_no, todo_title, todo_contents, todo_start_dt, todo_end_dt, todo_priority, todo_reg_id, todo_reg_dt, todo_update_id, todo_update_dt) {
        this.todo_sno = todo_sno;
        this.todo_reg_no = todo_reg_no;
        this.todo_title = todo_title;
        this.todo_contents = todo_contents;
        this.todo_priority = todo_priority;
        this.todo_reg_id = todo_reg_id;
        this.todo_reg_dt = todo_reg_dt;
        this.todo_update_id = todo_update_id;
        this.todo_update_dt = todo_update_dt;
    }

    static async getTodoRegNo(todo_reg_id) {
        const prefix = now.format('YYYYMMDD');
        const [rows] = await pool.query(
            'SELECT LPAD(COALESCE(MAX(SUBSTR(todo_reg_no, 9)), 0) + 1, 5,0) AS REG_NO FROM TBL_TODO WHERE TODO_REG_ID = ?',
            [todo_reg_id]
        );
        const suffix = rows[0].REG_NO;

        return prefix.concat(suffix);
    }

    static async insertTodo(todo_title, todo_contents, todo_start_dt, todo_end_dt, todo_priority, todo_reg_id) {
        const todo_reg_no = await this.getTodoRegNo(todo_reg_id);

        console.log(todo_reg_no);
        const [rows] = await pool.query(
            'INSERT INTO TBL_TODO ' +
            '(TODO_REG_NO, TODO_TITLE, TODO_CONTENTS, TODO_START_DT, TODO_END_DT, TODO_PRIORITY, TODO_REG_ID, TODO_REG_DT) ' +
            'VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
            [todo_reg_no, todo_title, todo_contents, todo_start_dt, todo_end_dt, todo_priority, todo_reg_id]
        );
        console.log(`Executing query: INSERT INTO TBL_TODO (TODO_REG_NO, TODO_TITLE, TODO_CONTENTS, TODO_START_DT, TODO_END_DT, TODO_PRIORITY, TODO_REG_ID, TODO_REG_DT) VALUES (${todo_reg_no}, ${todo_title}, ${todo_contents}, ${todo_start_dt}, ${todo_end_dt}, ${todo_priority}, ${todo_reg_id})`);
    }
}

module.exports = Todo;