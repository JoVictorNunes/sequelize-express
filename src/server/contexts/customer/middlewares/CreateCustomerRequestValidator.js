const joi = require("joi");
const validateCustomer = require("../shared/ValidateCustomer");
const ValidateCar = require("../../car/shared/ValidateCar");
const ValidatePhone = require("../../phone/ValidatePhone");

const validateCreateCustomer = joi.object({
  customer: validateCustomer,
  telefones: joi.array().items(ValidatePhone),
  carros: joi.array().items(ValidateCar),
});

module.exports = (req, res, next) => {
  const { error } = validateCreateCustomer.validate(req.body, {
    convert: true,
  });

  if (error) {
    res.status(400).json({ error });
    next(error);
  } else {
    next();
  }
};
