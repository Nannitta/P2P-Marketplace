const Joi = require('joi');
const generateError = require('../../helpers/generateError');
const getPool = require('../../db/connectDB');

async function activateUser (req, res, next) {
    const registrationCodeSchema = Joi.string().uuid().required();

    let registrationCode;

    try {
        registrationCode = await registrationCodeSchema.validateAsync(req.params.registrationCode);
    } catch (error) {
        return next(generateError('El código de activación no es válido', 400));
    }

    try {
        const pool = await getPool();

        const [[idUser]] = await pool.query('SELECT id FROM users WHERE registration_code = ?', [registrationCode]);

        if (!idUser) {
            return next(generateError('El usuario que intenta activar no existe', 404));
        }

        await pool.query(`
        UPDATE users 
        SET registration_code = null,
        active = true,
        modified_at = ?
        WHERE registration_code = ?`
        , [new Date(), registrationCode]);

    } catch (error) {
        next(error);
    }

    res.redirect('http://localhost:5173/user/login');
};

module.exports = activateUser;
