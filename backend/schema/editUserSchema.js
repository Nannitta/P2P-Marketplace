const Joi = require('joi');

const editUserSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).pattern(/^[A-Za-zñÑ\sáéíóúÁÉÍÓÚüÜ]+$/u).messages({
        'string.min': 'El nombre tiene que tener mínimo 2 letras',
        'string.max': 'El nombre no puede tener más de 50 letras',
        'string.pattern.base': 'El nombre solo puede contener letras y espacios'
    }),
    lastName: Joi.string().min(2).max(50).pattern(/^[A-Za-zñÑ\sáéíóúÁÉÍÓÚüÜ]+$/u).messages({
        'string.min': 'El apellido tiene que tener mínimo 2 letras',
        'string.max': 'El apellido no puede tener más de 50 letras',
        'string.pattern.base': 'El apellido solo puede contener letras y espacios'
    }),
    bio: Joi.string().max(500).messages({
        'string.max': 'Tu biografía no puede exceder los 500 caracters',
        'string.empty': 'La biografia no puede estar vacía'
    }),
    email: Joi.string().email().max(100).messages({
        'string.email': 'El email no es válido',
        'string.max': 'El email no puede tener más de 100 caracteres'
    }),
    password: Joi.string().min(8).max(20).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/).messages({
        'string.pattern.base': 'La contraseña debe tener entre 8 y 20 caracteres y tiene que contener una minúscula, una mayúscula, un número y un caracter especial.'
    }),
    phone: Joi.string().min(9).max(15).messages({
        'string.max': 'El número de teléfono no puede tener más de 15 caracteres',
        'string.min': 'El número de teléfono debe tener mínimo 9 caracteres',
        'string.pattern.base': 'El número de teléfono no es válido'
    }),
    city: Joi.string().max(50).pattern(/^[A-Za-zñÑ\sáéíóúÁÉÍÓÚüÜ]+$/u).messages({
        'string.max': 'La ciudad debe tener máximo 50 caracteres',
        'string.pattern.base': 'El nombre de la ciudad solo puede tener letras y espacios.'
    }),
    postalCode: Joi.string().min(4).max(10).messages({
        'string.min': 'El código postal debe tener mínimo 4 caracteres',
        'string.max': 'El código postal tiene que tener máximo 10 caracteres'
    }),
    avatar: Joi.object({
        name: Joi.string().required(),
        data: Joi.any().required(),
        size: Joi.number().required(),
        encoding: Joi.string(),
        tempFilePath: Joi.any(),
        truncated: Joi.boolean(),
        mimetype: Joi.string().valid('image/jpg', 'image/jpeg', 'image/png', 'image/webp').required(),
        md5: Joi.string(),
        mv: Joi.func()
    }).messages({
        'object.base': 'El avatar no puede estar vacío'
    })
});

module.exports = editUserSchema;
