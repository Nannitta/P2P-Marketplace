require('dotenv').config();

const PORT = process.env.PORT;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_PORT = process.env.MYSQL_PORT;
const MYSQL_DB_NAME = process.env.MYSQL_DB_NAME;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const SECRET = process.env.SECRET;
const UPLOADS_DIR = process.env.UPLOADS_DIR;

module.exports = {
    PORT,
    MYSQL_USER,
    MYSQL_HOST,
    MYSQL_PASSWORD,
    MYSQL_DB_NAME,
    SMTP_USER,
    SMTP_PASSWORD,
    SECRET,
    UPLOADS_DIR,
    MYSQL_PORT
};
