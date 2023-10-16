const getPool = require('../../db/connectDB');
const addUserReviewSchema = require('../../schema/addUserReviewSchema');
const generateError = require('../../helpers/generateError');
const crypto = require('crypto');


async function addUserReview (req, res, next) {

    try {
        const orderId = req.params.orderId;
        const userBuyerId = req.user.id;
        const pool = await getPool();

        const { title, text, stars } = req.body;


        const { error } = addUserReviewSchema.validate({ title, text, stars });

        if (error) {
            throw generateError(error.message, 400);
        };

        const [[orderData]] = await pool.query(
            'SELECT product_id, user_seller_id, exchange_time FROM orders WHERE id = ?',
            [orderId]
        );

        const { product_id: productId, user_seller_id: userSellerId, exchange_time: exchangeTime } = orderData;


        if (!productId) {
            throw generateError('No has comprado el producto', 400);
        }

        if (!userSellerId) {
            throw generateError('No has comprado el producto al vendedor', 400);
        }

        if (new Date(exchangeTime) > new Date()) {
            throw generateError('No puedes valorar hasta pasada la hora de la compra', 400);
        }

        const [existingReview] = await pool.query('SELECT * FROM reviews WHERE product_id = ?', [productId]);

        if (existingReview && existingReview.length > 0) {
            throw generateError('Ya has realizado una review para este producto', 400);
        }

        const id = crypto.randomUUID();

        await pool.query(
            'INSERT INTO reviews (id, title, text, stars, product_id, user_seller_id, user_buyer_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id, title, text, stars, productId, userSellerId, userBuyerId]
        );

        res.status(200).send({
            status: 'Ok',
            message: 'Review guardada correctamente',
            data: {
                id,
                title,
                text,
                stars,
                productId,
                userSellerId,
                userBuyerId
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = addUserReview;
