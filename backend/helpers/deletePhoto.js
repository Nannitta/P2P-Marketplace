const path = require('node:path');
const fs = require('node:fs/promises');

const generateError = require('./generateError');

require('dotenv').config();

async function deletePhoto (photoName) {

    const imagePath = path.resolve(__dirname, '../', process.env.UPLOADS_DIR, photoName);

    try {
        await fs.access(imagePath);
        await fs.unlink(imagePath);

    } catch (error) {
        throw generateError('No se ha podido eliminar la imagen', 500);
    }
}

module.exports = deletePhoto;

