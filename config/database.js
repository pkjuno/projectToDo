/* database.js */
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
const dbInfo =
    {
        host: process.env.DBURL, //DB 주소
        port: process.env.DBPORT, //DB Port
        user: process.env.DBUSER, //DB 계정 ID
        password: process.env.DBPASS, //DB 계정 PW
        database: process.env.DATABASE, //DB 내 사용 database
    };

//모듈화
//pool에 DB 정보를 담아 연결한 Pool 저장
const pool = mysql.createPool(dbInfo).promise();

module.exports = pool;