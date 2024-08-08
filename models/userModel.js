const pool = require('../config/database');

class User {
    constructor(user_sno, user_id, user_password, user_name, user_email, user_created_dt, user_updated_dt, user_final_login_dt) {
        this.user_sno = user_sno;
        this.user_id = user_id;
        this.user_password = user_password;
        this.user_name = user_name;
        this.user_email = user_email;
        this.user_created_dt = user_created_dt;
        this.user_updated_dt = user_updated_dt;
        this.user_final_login_dt = user_final_login_dt;
    }

    static async findById(user_sno) {

        const [rows] = await pool.query(
            'SELECT * FROM TBL_USER WHERE USER_SNO = ?',
            [user_sno]
        );
        console.log(`Executing query: SELECT * FROM TBL_USER WHERE user_sno = ${user_sno}`);

        if (rows.length > 0) {
            const { USER_SNO, USER_ID, USER_PASSWORD, USER_NAME, USER_EMAIL, USER_CREATED_DT, USER_UPDATE_DT, USER_FINAL_LOGIN_DT } = rows[0];
            console.log('Query result:', rows);
            return new User(USER_SNO, USER_ID, USER_PASSWORD, USER_NAME, USER_EMAIL, USER_CREATED_DT, USER_UPDATE_DT, USER_FINAL_LOGIN_DT);
        }
    }

    static async findByEmail(user_email) {
        const [rows] = await pool.query(
            'SELECT * FROM TBL_USER WHERE USER_EMAIL = ?',
            [user_email]
        );
        if (rows.length > 0) {
            const { USER_SNO, USER_ID, USER_PASSWORD, USER_NAME, USER_EMAIL, USER_CREATED_DT, USER_UPDATE_DT, USER_FINAL_LOGIN_DT } = rows[0];
            console.log('Query result:', rows);
            return new User(USER_SNO, USER_ID, USER_PASSWORD, USER_NAME, USER_EMAIL, USER_CREATED_DT, USER_UPDATE_DT, USER_FINAL_LOGIN_DT);
        }
    }

    static async findByEmailAndPass(user_email, user_password) {
        const [rows] = await pool.query(
            'SELECT * FROM TBL_USER WHERE USER_EMAIL = ? AND USER_PASSWORD = ?',
            [user_email, user_password]
        );
        console.log(`Executing query: SELECT * FROM TBL_USER WHERE USER_EMAIL = ${user_email} AND USER_PASSWORD = ${user_password}`);
        if (rows.length > 0) {
            const { USER_SNO, USER_ID, USER_PASSWORD, USER_NAME, USER_EMAIL, USER_CREATED_DT, USER_UPDATE_DT, USER_FINAL_LOGIN_DT } = rows[0];
            console.log('Query result:', rows);
            return new User(USER_SNO, USER_ID, USER_PASSWORD, USER_NAME, USER_EMAIL, USER_CREATED_DT, USER_UPDATE_DT, USER_FINAL_LOGIN_DT);
        }
    }

    static async createKakaoUser(user_email){
        const [result] = await pool.query(
            'INSERT INTO TBL_USER (USER_EMAIL, USER_CREATED_DT) VALUES (?,NOW())',
            [user_email]
        );
        console.log(`Executing query: INSERT INTO TBL_USER (USER_EMAIL, USER_CREATED_DT) VALUES (${user_email},NOW())`);

        // `insertId`를 사용하여 새로 생성된 USER_SNO 가져오기
        const { insertId } = result;
        return new User(insertId);
    }
    static async createProvider(provider_id, provider_name){
        const [rows] = await pool.query(
            'INSERT INTO TBL_SOCIAL_PROVIDERS (PROVIDER_ID, PROVIDER_NAME, CREATED_DT, UPDATED_DT) VALUES (?,?, NOW(), NOW())',
            [provider_id, provider_name]
        );
        console.log(`Executing query: INSERT INTO TBL_SOCIAL_PROVIDERS (PROVIDER_ID, PROVIDER_NAME, CREATED_DT, UPDATED_DT) VALUES (${provider_id},${provider_name}, NOW(), NOW())`);
    }

    static async createKaKaoAuth(user_sno, provider_id, accessToken, refreshToken){
        const [rows] = await pool.query(
            'INSERT INTO TBL_SOCIAL_AUTH ( USER_SNO, PROVIDER_ID, ACCESS_TOKEN, REFRESH_TOKEN, CREATED_AT, UPDATED_AT) VALUES (?, ?, ?, ?, NOW(), NOW())',
            [user_sno, provider_id, accessToken, refreshToken]
        );
        console.log(`Executing query: INSERT INTO TBL_SOCIAL_AUTH ( USER_SNO, PROVIDER_ID, ACCESS_TOKEN, REFRESH_TOKEN, CREATED_AT, UPDATED_AT) VALUES (${user_sno}, ${provider_id}, ${accessToken}, ${refreshToken}, NOW(), NOW())`);
    }
}

module.exports = User;