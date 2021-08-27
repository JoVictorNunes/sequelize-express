const validateCustomer = require("../shared/ValidateCustomer");

module.exports = (req, res, next) => {
  const { error } = validateCustomer.validate(req.body);

  if (error) {
    res.status(400).json({ error });
  } else {
    next();
  }
};
