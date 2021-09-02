const joi = require("joi");

const validateID = joi.string().required().uuid({ version: "uuidv4" });

module.exports = (req, res, next) => {
  const { error } = validateID.validate(req.params.id);

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
