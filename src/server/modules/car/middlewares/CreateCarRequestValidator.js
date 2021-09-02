const joi = require("joi");
const ValidateCar = require("../shared/ValidateCar");

const ValidateCreateCar = joi.object({
  idCustomer: joi.string().uuid({ version: "uuidv4" }).required(),
  car: ValidateCar,
});

module.exports = (req, res, next) => {
  const { error } = ValidateCreateCar.validate(req.body);

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
