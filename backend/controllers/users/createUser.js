const getPool = require('../../db/connectDB');
const crypto = require('node:crypto');
const bcrypt = require('bcrypt');
const createUserSchema = require('../../schema/createUserSchema');
const generateError = require('../../helpers/generateError');
const { PORT } = require('../../config');
const emailVerification = require('../../helpers/emailVerification');
require('dotenv').config();
const verifyAccountEmail = require('../../emails/verifyAccount');

async function createUser (req, res, next) {

    const { error } = createUserSchema.validate(req.body);

    if (error) {
        return next(generateError(error.message, 400));
    }

    try {
        const { firstName, lastName, email, password, phone } = req.body;
        const id = crypto.randomUUID();
        const pool = await getPool();

        const [userEmail] = await pool.query('SELECT email FROM users WHERE email = ?', [email]);
        if (userEmail.length > 0) {
            return next(generateError('El email indicado ya está en uso', 400));
        };

        const registrationCode = crypto.randomUUID();
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(`INSERT INTO users(id, first_name, last_name, email, password, registration_code, phone_number) 
            values (?, ?, ?, ?, ?, ?, ?)`, [id, firstName, lastName, email, hashedPassword, registrationCode, phone]);

        const subject = '[Player2Player] Completa tu registro';
        const link = `http://localhost:${PORT}/user/activate/${registrationCode}`;
        const html = verifyAccountEmail(link);

        await emailVerification(email, subject, html);

        res.status(200).send({
            status: 'Ok',
            message: 'Usuario creado correctamente',
            data: {
                user_id: id,
                firstName,
                lastName,
                phone,
                email,
                registrationCode
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = createUser;
