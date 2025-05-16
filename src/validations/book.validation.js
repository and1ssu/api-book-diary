const Joi = require('joi');

const bookSchema = Joi.object({
  title: Joi.string().required().trim().messages({
    'string.empty': 'O título do livro é obrigatório',
    'any.required': 'O título do livro é obrigatório'
  }),
  author: Joi.string().required().trim().messages({
    'string.empty': 'O nome do autor é obrigatório',
    'any.required': 'O nome do autor é obrigatório'
  }),
  genre: Joi.string().required().valid(
    'Ficção',
    'NãoFicção',
    'Romance',
    'Mistério',
    'Fantasia',
    'Ciência',
    'História',
    'Biografia',
    'Autoajuda',
    'Outro'
  ).messages({
    'string.empty': 'O gênero do livro é obrigatório',
    'any.required': 'O gênero do livro é obrigatório',
    'any.only': 'Gênero inválido'
  }),
  status: Joi.string().required().valid(
    'NãoLido',
    'Lendo',
    'Lido',
    'Abandonado'
  ).messages({
    'string.empty': 'O status do livro é obrigatório',
    'any.required': 'O status do livro é obrigatório',
    'any.only': 'Status inválido'
  }),
  rating: Joi.number().required().min(1).max(5).messages({
    'number.base': 'A avaliação deve ser um número',
    'number.min': 'A avaliação deve ser no mínimo 1',
    'number.max': 'A avaliação deve ser no máximo 5',
    'any.required': 'A avaliação é obrigatória'
  }),
  notes: Joi.string().allow('').trim()
});

module.exports = {
  bookSchema
};