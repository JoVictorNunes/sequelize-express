const joi = require("joi");

module.exports = joi.object({
  nome: joi.string().max(20).min(2).required(),
  cpf: joi.string().pattern(/^(?:[0-9]{3}[.]{1}[0-9]{3}[.]{1}[0-9]{3}-[0-9]{2})$|^(?:[0-9]{11})$/),
});
