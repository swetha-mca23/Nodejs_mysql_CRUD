require('dotenv').config();
const mysql = require('mysql2/promise');

async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT || 3306
        });

        console.log(" DB connected");
        return connection;
    } catch (err) {
        console.error(" Database connection failed:", err);
        throw err;
    }
}

module.exports = connectToDatabase;
