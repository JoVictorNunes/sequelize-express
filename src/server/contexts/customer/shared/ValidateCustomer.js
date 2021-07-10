const joi = require("joi");

module.exports = joi.object({
  nome: joi.string().required().max(20),
  cpf: joi.string().min(11).max(14)
});
