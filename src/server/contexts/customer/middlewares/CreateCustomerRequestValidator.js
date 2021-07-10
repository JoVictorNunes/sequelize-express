const joi = require("joi");
const validateCustomer = require("../shared/ValidateCustomer");
const ValidateCar = require("../../car/shared/ValidateCar");

const validateCreateCustomer = validateCustomer.keys({

  telefones: joi.array().items(joi.object({
    tipo: joi.any().required().valid("cel", "tel", "com"),
    numero: joi.string().min(11).max(15).required()
  })),

  carros: joi.array().items(ValidateCar)

});

module.exports = (req, res, next) => {
  const { error } = validateCreateCustomer.validate(req.body.customer, { convert: true });

  if (error) {
    res.status(400).json({ error });
  }
  else {
    next();
  }
};
