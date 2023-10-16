const getPool = require('../../db/connectDB');
const path = require('node:path');
require('dotenv').config();
const { UPLOADS_DIR } = require('../../config');
const generateError = require('../../helpers/generateError');

async function getProduct (req, res, next) {
    try {
        const pool = await getPool();
        const { idProduct } = req.params;

        const [productInfo] = await pool.query(
            `SELECT
                p.id AS product_id,
                p.name AS product_name,
                p.description AS product_description,
                p.price AS product_price,
                p.category AS product_category,
                p.user_id AS seller_id,
                p.state AS product_state,
                p.availability AS availability,
                p.created_at AS time,
                u.first_name AS seller_first_name,
                u.last_name AS seller_last_name,
                u.avatar AS user_avatar,
                u.city AS city,
                ph.name AS product_photo,
                AVG(r.stars) AS avg_review_stars
            FROM
                products AS p
            JOIN
                users AS u ON p.user_id = u.id
            LEFT JOIN
                reviews AS r ON r.user_seller_id = p.user_id
            LEFT JOIN
                product_photo AS ph ON p.id = ph.product_id
            WHERE
                p.id = ?
            GROUP BY
                p.id, p.user_id, ph.name
    `, [idProduct]);

        const [productPhotos] = await pool.query(
            'SELECT name FROM product_photo WHERE product_id = ?', [idProduct]
        );

        if (productInfo.length === 0) {
            return next(generateError('El producto que buscas no existe', 400));
        };

        const user = {
            id: productInfo[0].seller_id,
            first_name: productInfo[0].seller_first_name,
            last_name: productInfo[0].seller_last_name,
            avatar: productInfo[0].user_avatar,
            city: productInfo[0].city
        };

        const productImages = productPhotos.map((photo) => ({
            url: `${photo.name}`
        }));

        const product = {
            id: productInfo[0].product_id,
            name: productInfo[0].product_name,
            description: productInfo[0].product_description,
            price: productInfo[0].product_price,
            category: productInfo[0].product_category,
            avg_review_stars: productInfo[0].avg_review_stars,
            state: productInfo[0].product_state,
            time: productInfo[0].time
        };

        res.status(200).send({
            status: 'Ok',
            message: 'Producto encontrado',
            data: {
                product,
                user,
                productImages
            }
        });

    } catch (error) {
        next(error);
    }
}

module.exports = getProduct;
