const Joi = require('joi');

const createUserSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).pattern(/^[A-Za-zñÑ\sáéíóúÁÉÍÓÚüÜ]+$/u).required().messages({
        'string.empty': 'El nombre no puede estar vacío',
        'string.min': 'El nombre tiene que tener mínimo 2 letras',
        'string.max': 'El nombre no puede tener más de 50 letras',
        'string.pattern.base': 'El nombre solo puede contener letras y espacios',
        'any.required': 'El nombre es obligatorio'
    }),
    lastName: Joi.string().min(2).max(50).pattern(/^[A-Za-zñÑ\sáéíóúÁÉÍÓÚüÜ]+$/u).required().messages({
        'string.empty': 'El apellido no puede estar vacío',
        'string.min': 'El apellido tiene que tener mínimo 2 letras',
        'string.max': 'El apellido no puede tener más de 50 letras',
        'string.pattern.base': 'El apellio solo puede contener letras y espacios',
        'any.required': 'El apellido es obligatorio'
    }),
    email: Joi.string().email().max(100).required().messages({
        'string.empty': 'El email no puede estar vacío',
        'string.email': 'El email no es válido',
        'string.max': 'El email no puede tener más de 100 caracteres',
        'any.required': 'El email es obligatorio'
    }),
    password: Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zñÑ\d@$!%*?&]{8,20}$/).messages({
        'string.empty': 'La contraseña no puede estar vacía',
        'string.pattern.base': 'La contraseña debe tener entre 8 y 20 caracteres, contener una minúscula, una mayúscula, un número y un caracter especial.',
        'any.required': 'La contraseña es obligatoria'
    }),
    phone: Joi.string().min(9).max(15).pattern(/^\+?\d+$/).required().messages({
        'string.empty': 'El número de télefono no puede estar vacío',
        'string.max': 'El número de teléfono no puede tener más de 15 caracteres',
        'string.min': 'El número de teléfono debe tener mínimo 9 digitos',
        'string.pattern.base': 'El número de teléfono no es válido',
        'any.required': 'El número de teléfono es obligatorio'
    })
});

module.exports = createUserSchema;
