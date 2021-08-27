const joi = require("joi");

module.exports = joi.object({
  tipo: joi.string().valid("cel", "tel", "com").required(),
  numero: joi
    .string()
    .pattern(/^(?:\([0-9]{2}\) [0-9]{5}-[0-9]{4})$|^(?:[0-9]{11})$/)
    .required(),
});
