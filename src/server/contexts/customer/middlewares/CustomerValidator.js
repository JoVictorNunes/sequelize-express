const validateCustomer = require("../shared/ValidateCustomer");

module.exports = (request, response, next) => {
  const { error } = validateCustomer.validate(request.body);

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
