const joi = require("joi");
const validateCustomer = require("../shared/ValidateCustomer");
const ValidateCar = require("../../car/shared/ValidateCar");
const ValidatePhone = require("../../phone/ValidatePhone");

const validateCreateCustomer = joi.object({
  customer: validateCustomer,
  phones: joi.array().items(ValidatePhone),
  cars: joi.array().items(ValidateCar),
});

module.exports = (request, response, next) => {
  const { error } = validateCreateCustomer.validate(request.body, {
    convert: true,
  });

  if (error) {
    Promise.resolve()
      .then(() => {
        throw new Error(error.annotate());
      })
      .catch(next);
  } else {
    next();
  }
};
