const joi = require("joi");

module.exports = joi.object({
  brand: joi
    .string()
    .pattern(/^[A-Za-z0-9-]{2,20}$/)
    .required(),
  model: joi
    .string()
    .pattern(/^[A-Za-z0-9-]{2,20}$/)
    .required(),
  license: joi
    .string()
    .pattern(/^[A-Za-z]{3}[0-9]{4}$/)
    .required(),
  year: joi
    .number()
    .greater(1970)
    .less(new Date().getFullYear() + 1),
});
