const getPool = require('../../db/connectDB');
const emailVerification = require('../../helpers/emailVerification');
const Joi = require('joi');
const generateError = require('../../helpers/generateError');
const crypto = require('crypto');
const newOrder = require('../../emails/newOrder');

async function addOrder (req, res, next) {
    const userSellerIdSchema = Joi.string().uuid().required();

    let validateUserSellerId;

    try {
        validateUserSellerId = await userSellerIdSchema.validate(req.body);
    } catch (error) {
        return next(generateError('El id de usuario no es válido', 400));
    }

    try {
        const pool = await getPool();

        const id = crypto.randomUUID();
        const userBuyerId = req.user.id;
        const { idProduct } = req.params;
        const { value: { userSellerId } } = validateUserSellerId;

        const [[{ availability }]] = await pool.query('SELECT availability FROM products WHERE id = ?', [idProduct]);

        if (availability === 0) {
            throw generateError('Este producto ya no está disponible', 400);
        }

        if (userBuyerId === userSellerId) {
            throw generateError('No puedes comprarte un producto a ti mismo', 403);
        }

        const [checkOrder] = await pool.query(`
            SELECT id FROM orders WHERE product_id = ? AND user_buyer_id = ?
        `, [idProduct, userBuyerId]);

        if (checkOrder.length > 0) {
            throw generateError('No puedes comprar más de una vez el mismo producto', 403);
        }

        await pool.query(`INSERT INTO orders (id, user_buyer_id, user_seller_id, product_id)
        VALUES (?, ?, ?, ?)
        `, [id, userBuyerId, userSellerId, idProduct]);

        const [[{ email }]] = await pool.query(`
            SELECT email FROM users WHERE id = ?
        `, [userSellerId]);

        const subject = '[Player2Player] Propuesta de compra';
        const link = `http://localhost:5173/user/orders/${userSellerId}`;
        const html = newOrder(link);

        await emailVerification(email, subject, html);

        const [[reservedProduct]] = await pool.query(`
        SELECT p.name, p.description, p.category, p.state, p.price, o.id
        FROM products p
        INNER JOIN orders o
        ON p.id = o.product_id
        WHERE p.id = ?
        `, [idProduct]);

        res.status(200).send({
            status: 'Ok',
            message: 'Producto reservado, pronto recibirás una respuesta del vendedor',
            data: {
                reservedProduct
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = addOrder;
