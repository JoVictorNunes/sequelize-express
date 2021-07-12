const joi = require("joi");

module.exports = joi.object({
  fabricante: joi.string().pattern(/^[A-Za-z0-9-]{2,20}$/).required(),
  modelo: joi.string().pattern(/^[A-Za-z0-9-]{2,20}$/).required(),
  placa: joi.string().pattern(/^[A-Za-z]{3}[0-9]{4}$/).required(),
  ano_lancamento: joi.number().greater(1970).less((new Date).getFullYear() + 1)
});
