const getPool = require('../../db/connectDB');
const deletePhoto = require('../../helpers/deletePhoto');
const generateError = require('../../helpers/generateError');
const savePhoto = require('../../helpers/savePhoto');
const bcrypt = require('bcrypt');
const editUserSchema = require('../../schema/editUserSchema');
const { photoSchema } = require('../../schema/PhotoSchema');

async function editUser (req, res, next) {
    try {
        const { error: errorUser } = editUserSchema.validate(req.body);
        const { error: errorPhoto } = photoSchema.validate(req.files?.avatar);

        if (req.files?.avatar.length > 1) {
            return next(generateError('No puedes subir más de una foto'));
        }

        if (errorUser) {
            return next(generateError(errorUser.message, 400));
        }

        if (errorPhoto) {
            return next(generateError(errorPhoto.details[0].message, 400));
        }

        const userId = req.user.id;
        let { firstName, lastName, bio, password, email, phone, city, postalCode } = req.body;
        let avatar;

        if (!firstName && !lastName && !bio && !password && !email && !phone && !city && !postalCode && !req.files?.avatar) {
            return next(generateError('Debes modificar algún campo', 400));
        }

        if (password) {
            password = await bcrypt.hash(password, 10);
        }

        const pool = await getPool();

        const [user] = await pool.query('SELECT avatar from users WHERE id = ?', [userId]);

        if (req.files?.avatar) {
            if (user[0].avatar) {
                await deletePhoto(user[0].avatar);
            };
            avatar = await savePhoto(req.files.avatar, 150);
        }

        await pool.query(`UPDATE users
            SET first_name = COALESCE(?, first_name),
            last_name = COALESCE(?, last_name),
            bio = COALESCE(?, bio),
            password = COALESCE(?, password),
            email = COALESCE(?, email),
            phone_number = COALESCE(?, phone_number),
            city = COALESCE(?, city),
            postal_code = COALESCE(?, postal_code),
            avatar = COALESCE(?, avatar)
            WHERE id = ?
        `, [
            firstName,
            lastName,
            bio,
            password,
            email,
            phone,
            city,
            postalCode,
            avatar,
            userId
        ]);

        const [[updatedUser]] = await pool.query('SELECT first_name, last_name, bio, password, email, phone_number, city, postal_code, avatar FROM users WHERE id = ?', [userId]);

        res.status(200).send({
            status: 'Ok',
            message: 'El perfil fue editado correctamente!',
            data: {
                updatedUser
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = editUser;
