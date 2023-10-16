const generateError = require('../../helpers/generateError');
const getPool = require('../../db/connectDB');

async function getUserOrder (req, res, next) {
    try {
        const pool = await getPool();
        const userId = req.user.id;
        const orderId = req.params.idOrder;

        let query;
        let queryParams;

        if (orderId) {
            query = `
            SELECT 
            O.*,
            P.name,
            P.description,
            P.price,
            P.category,
            P.state,
            P.created_at,
            PP.product_photo,
            UB.first_name AS buyer_first_name,
            UB.last_name AS buyer_last_name,
            UB.avatar AS buyer_avatar,
            AVG(R.stars) AS userAvgReviews_buyer,
            U.first_name AS seller_first_name,
            U.last_name AS seller_last_name,
            U.avatar AS seller_avatar,
            (SELECT AVG(R2.stars)
            FROM reviews R2
            WHERE R2.user_seller_id = O.user_seller_id) AS userAvgReviews_seller
        FROM orders O
        INNER JOIN products P ON O.product_id = P.id
        LEFT JOIN LATERAL (
            SELECT MAX(name) AS product_photo
            FROM product_photo
            WHERE product_id = O.product_id
        ) AS PP ON true
        LEFT JOIN users UB ON UB.id = O.user_buyer_id
        LEFT JOIN users U ON U.id = O.user_seller_id
        LEFT JOIN reviews R ON O.user_buyer_id = R.user_buyer_id
        WHERE (O.id = ? AND (O.user_buyer_id = ? OR O.user_seller_id = ?))
        GROUP BY
            O.id,
            O.exchange_place,
            O.exchange_time,
            P.name,
            P.description,
            P.price,
            P.category,
            P.state,
            P.created_at,
            PP.product_photo,
            UB.first_name,
            UB.last_name,
            UB.avatar;
            `
            ;
            queryParams = [orderId, userId, userId];
        } else {
            query = `
                SELECT O.*, P.name, P.description, P.price, P.state, PP.product_photo
                FROM orders O
                INNER JOIN products P ON O.product_id = P.id
                LEFT JOIN LATERAL (
                SELECT MAX(name) AS product_photo
                FROM product_photo
                WHERE product_id = O.product_id
                ) AS PP ON true
                WHERE user_buyer_id = ?;
            `;
            queryParams = [userId];
        }

        const [orders] = await pool.query(query, queryParams);

        if (orders.length === 0) {
            return next(generateError('No se ha encontrado ningún pedido', 400));
        }

        res.status(200).send({
            status: 'Ok',
            data: {
                orders
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = getUserOrder;
