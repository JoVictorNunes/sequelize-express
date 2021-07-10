const joi = require("joi");

module.exports = joi.object({
  car: joi.object({
    fabricante: joi.string().max(20).required(),
    modelo: joi.string().max(20).required(),
    placa: joi.string().alphanum().length(7).required(),
    ano_lancamento: joi.number().greater(1970).less((new Date).getFullYear() + 1)
  })
});
