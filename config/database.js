/* database.js */
const mysql = require('mysql2');

const dbInfo =
    {
        host: "127.0.0.1", //DB 주소
        port: "3306", //DB Port
        user: "HRDBA", //DB 계정 ID
        password: "hrdba9999", //DB 계정 PW
        database: "PROJECTHR", //DB 내 사용 database
    };

//모듈화
//pool에 DB 정보를 담아 연결한 Pool 저장
const pool = mysql.createPool(dbInfo).promise();

module.exports = pool;