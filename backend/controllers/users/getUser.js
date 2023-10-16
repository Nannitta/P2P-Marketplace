const getPool = require('../../db/connectDB');
const generateError = require('../../helpers/generateError');
const Joi = require('joi');

async function getUser (req, res, next) {
    try {
        const { userId } = req.params;
        const pool = await getPool();

        const userIdSchema = Joi.string().uuid();
        const { error } = userIdSchema.validate(userId);

        if (error) {
            return next(generateError('El id de usuario no es válido.', 400));
        }

        const [[user]] = await pool.query(`SELECT first_name, last_name, bio, email, phone_number, city, postal_code, avatar
        FROM users
        WHERE id = ?`, [userId]);

        if (!user) {
            return next(generateError(`El usuario con el id ${userId} no existe`, 404));
        }

        const [[avgReview]] = await pool.query(`
        SELECT user_seller_id, AVG(stars) AS userAvgReviews FROM reviews
        WHERE user_seller_id = ?
        GROUP BY user_seller_id;
        `, [userId]);


        const [products] = await pool.query(`
        SELECT P.id, 
        P.name, 
        P.description, 
        P.category, 
        P.state, 
        P.price, 
        U.city, 
        P.availability, 
        P.created_at AS time, 
        MAX(PP.name) AS photo
        FROM products P
        INNER JOIN users U ON P.user_id = U.id
        INNER JOIN product_photo PP ON PP.product_id = P.id
        WHERE U.id = ?
        GROUP BY P.id, P.name, P.description, P.category, P.state, P.price, U.city, P.availability, P.created_at;
        `, [userId]);

        res.status(200).send({
            status: 'ok',
            data: {
                user,
                avgReview,
                products
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = getUser;
