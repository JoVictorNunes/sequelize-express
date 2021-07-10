const joi = require("joi");
const ValidateCar = require("../shared/ValidateCar");

const ValidateCreateCar = ValidateCar.keys({
  idCustomer: joi.string().required().uuid({ version: "uuidv4" })
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
