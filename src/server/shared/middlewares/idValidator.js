const joi = require("joi");

const validateUUIDV4 = joi.string().required().uuid({ version: "uuidv4" });

module.exports = (req, res, next) => {
  const { error } = validateUUIDV4.validate(req.params.id);

  if (error) res.status(400).json({ status: "Invalid ID!" });
  else next();
};
