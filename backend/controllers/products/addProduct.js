const crypto = require('crypto');
const getPool = require('../../db/connectDB');
const addProductSchema = require('../../schema/addProductSchema');
const generateError = require('../../helpers/generateError');
const savePhoto = require('../../helpers/savePhoto');
const { photoSchema, arrayPhotoSchema } = require('../../schema/PhotoSchema');

async function addProduct (req, res, next) {
    try {
        const insertedPhotos = [];
        let errorSchema;

        const photos = req.files?.photos;

        if (!photos || photos.length === 0) {
            return next(generateError('No has subido ninguna foto', 400));
        }

        if (photos.length > 8) {
            return next(generateError('Has subido demasiadas fotos. Máximo 8', 400));
        }

        if (Array.isArray(photos)) {
            const { error } = await arrayPhotoSchema.validateAsync(photos);
            errorSchema = error;
        } else {
            await photoSchema.validateAsync(photos);
        }

        if (errorSchema) {
            return next(generateError(errorSchema.details[0].message, 400));
        }

        const { error } = addProductSchema.validate(req.body);

        if (error) {
            return next(generateError(error.message, 400));
        }

        const pool = await getPool();
        const { name, description, price, category, state } = req.body;

        const [productDescription] = await pool.query(
            'SELECT description FROM products WHERE description = ?',
            [description]
        );
        if (productDescription.length > 0) {
            return next(generateError('Ya existe un producto con esa descripción', 400));
        }

        const id = crypto.randomUUID();

        await pool.query(
            'INSERT INTO products(id, name, description, price, category, state, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id, name, description, price, category, state, req.user.id]
        );

        if (Array.isArray(photos)) {
            for (const photo of photos) {
                const photoId = crypto.randomUUID();
                const photoName = await savePhoto(photo, 500);
                await pool.query(
                    'INSERT INTO product_photo (id, name, product_id) VALUES (?, ?, ?)',
                    [photoId, photoName, id]
                );

                insertedPhotos.push(photoName);
            }
        } else {
            const photoId = crypto.randomUUID();
            const photoName = await savePhoto(photos, 500);
            await pool.query(
                'INSERT INTO product_photo (id, name, product_id) VALUES (?, ?, ?)',
                [photoId, photoName, id]
            );
            insertedPhotos.push(photoName);
        }

        res.status(200).send({
            status: 'Ok',
            message: 'Producto creado correctamente',
            data: {
                product_id: id,
                name,
                description,
                price,
                category,
                state,
                user_id: req.user.id,
                photos: insertedPhotos
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = addProduct;
