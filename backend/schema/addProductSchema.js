const Joi = require('joi');

const addProductSchema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
        'string.empty': 'Tienes que escribir el nombre del producto.',
        'string.min': 'El nombre del producto debe tener mínimo 2 caracteres.',
        'string.max': 'El nombre del producto no puede tener más de 50 caracteres.',
        'any.required': 'El nombre del producto es obligatorio.'
    }),
    description: Joi.string().min(2).max(500).required().messages({
        'string.empty': 'La descripción es obligatoria',
        'string.min': 'La descripción del producto tiene que tener mínimo 2 caracteres.',
        'string.max': 'La descripción no puede tener más de 500 caracteres.',
        'any.required': 'La descripción del producto es obligatoria.'
    }),
    price: Joi.number().positive().max(100000).required().messages({
        'number.base': 'El precio debe contener sólo números',
        'number.empty': 'El precio del producto no puede estar vacío.',
        'number.positive': 'El precio del producto tiene que ser una cantidad positiva.',
        'any.required': 'El precio del producto es obligatorio.'

    }),
    category: Joi.any().valid('Consolas', 'Videojuegos', 'Accesorios', 'Retro', 'Ordenadores').required().messages({
        'any.only': 'La categoría debe ser una de [Consolas, Videojuegos, Accesorios, Retro, Ordenadores]',
        'any.required': 'La categoria del producto es obligatoria.'
    }),
    state: Joi.any().valid('Nuevo', 'En buen estado', 'Aceptable', 'No da para más').required().messages({
        'any.only': 'El estado debe ser uno de [Nuevo, En buen estado, Aceptable, No da para más]',
        'any.required': 'El estado del producto es obligatorio.'
    })
});

module.exports = addProductSchema;
