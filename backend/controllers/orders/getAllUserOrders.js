const getPool = require('../../db/connectDB');
const generateError = require('../../helpers/generateError');

async function getAllUserOrder (req, res, next) {
    try {
        const pool = await getPool();
        const { idUser } = req.params;

        const [ordersExist] = await pool.query(`
                SELECT *
                FROM orders
                WHERE user_seller_id = ?;
            `, [idUser]);

        if (!ordersExist.length) {
            return next(generateError('No has recibido ninguna oferta por tus productos', 403));
        }

        const [ordersInfo] = await pool.query(`
        SELECT
        O.id,
        O.product_id,
        O.created_at,
        O.user_buyer_id,
        O.status,
        P.name AS product_name,
        P.description,
        P.price,
        U.first_name AS seller_first_name,
        U.last_name AS seller_last_name,
        U.avatar,
        AVG(stars) AS avgReviews,
        U.city,
        MAX(PP.name) AS product_photo
        FROM orders O
        LEFT JOIN products P ON O.product_id = P.id
        LEFT JOIN (SELECT product_id, MAX(name) AS name
        FROM product_photo
        GROUP BY product_id
        ) AS PP ON O.product_id = PP.product_id
        LEFT JOIN users U ON O.user_buyer_id = U.id
        LEFT JOIN reviews R ON R.user_seller_id = O.user_buyer_id
        WHERE
        O.user_seller_id = ?
        GROUP BY O.id, O.product_id, O.created_at, O.user_buyer_id, O.status, P.name, 
        P.description, P.price, U.first_name, U.last_name, U.avatar, U.city;
        `, [idUser]);

        const [[rating]] = await pool.query(`
        SELECT AVG(stars) AS userAvgReviews FROM reviews
        WHERE user_buyer_id = ?
        GROUP BY user_buyer_id;        
        `, [ordersInfo[0].user_buyer_id]);

        res.status(200).send({
            status: 'Ok',
            data: {
                ordersInfo,
                rating
            }
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = getAllUserOrder;
