const Joi = require('joi');

const loginUserSchema = Joi.object({
    email: Joi.string().email().max(100).required().messages({
        'string.empty': 'El email no puede estar vacío',
        'string.email': 'El email no es válido',
        'string.max': 'El email no puede tener más de 100 caracteres',
        'any.required': 'El email es obligatorio'
    }),
    password: Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/).messages({
        'string.empty': 'La contraseña no puede estar vacía',
        'string.pattern.base': 'La contraseña debe tener entre 8 y 20 caracteres, contener una minúscula, una mayúscula, un número y un caracter especial.',
        'any.required': 'La contraseña es obligatoria'
    })
});

module.exports = loginUserSchema;
