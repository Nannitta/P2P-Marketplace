const Joi = require('joi');

const addUserReviewSchema = Joi.object({
    title: Joi.string().min(2).max(150).required().messages({
        'string.empty': 'El título no puede estar vacío',
        'string.min': 'El título debe tener mínimo 2 letras',
        'string.max': 'El título no puede tener más de 150 letras'
    }),
    text: Joi.string().allow(null, '').max(1000).message({
        'string.max': 'La valoración no puede tener más de 1000 letras'
    }),
    stars: Joi.any().valid('1', '2', '3', '4', '5').required().messages({
        'any.empty': 'La valoración debe tener al menos 1 estrella'
    })
});

module.exports = addUserReviewSchema;
