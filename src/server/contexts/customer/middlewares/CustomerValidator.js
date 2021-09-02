const validateCustomer = require("../shared/ValidateCustomer");

module.exports = (req, res, next) => {
  const { error } = validateCustomer.validate(req.body);

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
