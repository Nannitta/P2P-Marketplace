const getPool = require('../../db/connectDB');
const generateError = require('../../helpers/generateError');
const Joi = require('joi');

async function getUserReviews (req, res, next) {
    const { idUser } = req.params;
    const pool = await getPool();

    const idUserSchema = Joi.string().uuid().required();

    try {
        await idUserSchema.validateAsync(req.params.idUser);
    } catch (error) {
        return next(generateError('El id de usuario no es válido', 400));
    }

    try {
        const [[id]] = await pool.query('SELECT id FROM users WHERE id = ?', [idUser]);

        if (!id) {
            return next(generateError(`El usuario con el id ${idUser} no existe`));
        }

        const [userReviews] = await pool.query(`
        SELECT R.title, R.text, R.stars, R.created_at, U.first_name, U.last_name, R.product_id,
        MAX(PP.name) AS product_images
        FROM reviews R
        INNER JOIN users U ON R.user_buyer_id = U.id
        INNER JOIN product_photo PP ON R.product_id = PP.product_id
        WHERE R.user_seller_id = ?
        GROUP BY 
        R.title, R.text, R.stars, R.created_at, 
        U.first_name, U.last_name, R.product_id;
        `, [idUser]);

        res.status(200).send({
            status: 'Ok',
            message: 'Reviews del usuario',
            data: {
                userReviews
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getUserReviews;
