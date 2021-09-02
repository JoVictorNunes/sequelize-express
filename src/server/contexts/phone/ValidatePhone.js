const joi = require("joi");

module.exports = joi.object({
  kind: joi.string().valid("cel", "tel", "com").required(),
  number: joi
    .string()
    .pattern(/^(?:\([0-9]{2}\) [0-9]{5}-[0-9]{4})$|^(?:[0-9]{11})$/)
    .required(),
});
