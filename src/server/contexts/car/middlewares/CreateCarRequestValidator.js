const joi = require("joi");
const ValidateCar = require("../shared/ValidateCar");

const ValidateCreateCar = joi.object({
  idCustomer: joi.string().required().uuid({ version: "uuidv4" }),
  carro: ValidateCar
});

module.exports = (req, res, next) => {
  const { error } = ValidateCreateCar.validate(req.body);

  if (error) {
    res.status(400).json({ error });
  }
  else {
    next();
  }
};
