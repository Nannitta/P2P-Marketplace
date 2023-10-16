const getPool = require('../../db/connectDB');
const generateError = require('../../helpers/generateError');
const emailVerification = require('../../helpers/emailVerification');
const rejectOrderEmail = require('../../emails/rejectOrderEmail');

async function rejectOrder (req, res, next) {
    try {
        const pool = await getPool();

        const { idOrder } = req.params;

        const [[order]] = await pool.query(`
            SELECT * FROM orders WHERE id = ?
        `, [idOrder]);

        if (!order) {
            return next(generateError('No se ha encontrado ningún pedido', 400));
        }

        const [[{ email }]] = await pool.query('SELECT email FROM users WHERE id = ?',
            [order.user_buyer_id]);

        const subject = '[Player2Player] Tu pedido ha sido rechazado';
        const link = 'http://localhost:5173';

        const html = rejectOrderEmail(link);

        await emailVerification(email, subject, html);

        await pool.query(`
            UPDATE orders SET status = 'Rechazado' WHERE id = ?
        `, [idOrder]);

        res.status(200).send({
            status: 'Ok',
            message: 'Le enviaremos un email al comprador notificando el rechazo del pedido'
        });
    } catch (error) {
        next(generateError(error, 500));
    }
};

module.exports = rejectOrder;
