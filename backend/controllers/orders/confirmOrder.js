const getPool = require('../../db/connectDB');
const generateError = require('../../helpers/generateError');
const emailVerification = require('../../helpers/emailVerification');
const confirmOrderSchema = require('../../schema/confirmOrderSchema');
const adviceAvailability = require('../../emails/adviceAvailability');
const acceptPurchase = require('../../emails/acceptPurchase');

async function confirmOrder (req, res, next) {
    try {
        const pool = await getPool();

        const { error } = confirmOrderSchema.validate(req.body);

        if (error) {
            return next(generateError(error.message, 400));
        }

        const { exchangePlace, exchangeTime } = req.body;
        const { idOrder } = req.params;


        const [[order]] = await pool.query(`
            SELECT * FROM orders WHERE id = ?
        `, [idOrder]);


        if (order.status === 'Aceptado') {
            return next(generateError('Este pedido ya ha sido aceptado', 400));
        }

        await pool.query(`
            UPDATE products
            SET availability = 0
            WHERE id = ?
        `, [order.product_id]);



        await pool.query(`
            UPDATE orders
            SET exchange_place = ?, exchange_time = ?
            WHERE id = ?
        `, [exchangePlace, exchangeTime, order.id]);



        await pool.query(`
            UPDATE orders
            SET status = 'Aceptado'
            WHERE id = ?
        `, [order.id]);



        const [[{ email }]] = await pool.query(
            'SELECT email FROM users WHERE id = ?',
            [order.user_buyer_id]
        );

        const subject = '[Player2Player] Confirmación del pedido';

        const linkAccepted = `http://localhost:5173/order/accepted/${idOrder}`;

        const html = acceptPurchase(linkAccepted, exchangeTime, exchangePlace);

        await emailVerification(email, subject, html);

        await pool.query(`
            UPDATE orders
            SET status = 'Rechazado'
            WHERE product_id = ? AND status NOT LIKE '%Aceptado%'
        `, [order.product_id]);


        try {
            const [emails] = await pool.query(`
                SELECT U.email FROM users U
                INNER JOIN orders O ON O.user_buyer_id = U.id
                WHERE O.product_id = ? AND O.status LIKE 'Rechazado'
            `, [order.product_id]);

            const rejectionSubject = '[Player2Player] Producto no disponible';
            const link = 'http://localhost:5173';

            const rejectionHtml = adviceAvailability(link);

            for (const email of emails) {
                await emailVerification(email.email, rejectionSubject, rejectionHtml);
            }
        } catch (error) {
            console.error('Error sending rejection emails:', error);
            next(error);
        }

        res.status(200).send({
            status: 'Ok',
            message: 'Le enviaremos un email al comprador con los datos',
            data: {
                exchangePlace,
                exchangeTime
            }
        });
    } catch (error) {
        console.error('Error in confirmOrder:', error);
        next(error);
    }
}

module.exports = confirmOrder;
