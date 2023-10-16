const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const getPool = require('../../db/connectDB');
const loginUserSchema = require('../../schema/loginUserSchema');
const generateError = require('../../helpers/generateError');
const { SECRET } = require('../../config');

async function loginUser (req, res, next) {
    const { error } = loginUserSchema.validate(req.body);

    if (error) {
        return next(generateError(error.message, 400));
    }

    try {
        const pool = await getPool();

        const { email, password } = req.body;

        const [userInfo] = await pool.query(
            'SELECT first_name, last_name, avatar, active, id FROM users WHERE email = ?;'
            , [email]);

        const [[userPassword]] = await pool.query(
            'SELECT password from users WHERE email = ?'
            , [email]);

        if (userInfo.length < 1) {
            return next(generateError('Email y/o contraseña incorrectos', 404));
        }

        const validatePassword = await bcrypt.compare(password, userPassword.password);

        if (!validatePassword) {
            return next(generateError('Email y/o contraseña incorrectos', 404));
        }

        if (userInfo[0].active === 0) {
            return next(generateError('Debes activar tu usuario primero. Revisa la bandeja de entrada o spam de tu correo.', 403));
        }

        const payload = {
            id: userInfo[0].id
        };

        const token = jwt.sign(payload, SECRET, { expiresIn: '1w' });

        res.header({ token });

        res.status(200).send({
            status: 'Ok',
            message: 'Usuario logueado correctamente',
            data: {
                userInfo,
                token
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = loginUser;
