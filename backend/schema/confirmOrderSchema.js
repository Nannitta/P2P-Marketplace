const Joi = require('joi');

const confirmOrderSchema = Joi.object({
    exchangePlace: Joi.string().max(100).pattern(/^[A-Za-zñÑ\sáéíóúÁÉÍÓÚüÜ]+$/u).required().messages({
        'string.empty': 'El lugar de entrega no puede estar vacío',
        'string.max': 'El lugar de entrega no puede tener más de 100 letras',
        'string.pattern.base': 'El lugar de entrega solo puede contener letras y espacios'
    }),
    exchangeTime: Joi.date().greater('now').required().messages({
        'date.greater': 'La fecha de entrega no puede ser anterior a la fecha actual'
    })
});

module.exports = confirmOrderSchema;
