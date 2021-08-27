const express = require("express");
const app = express();

const customerRouter = require("./contexts/customer/routes");
const carRouter = require("./contexts/car/routes");

const { duplicatedEntry } = require("../util/errorMessages");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/customer", customerRouter);
app.use("/car", carRouter);

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    res.status(409).json({ status: duplicatedEntry });
  }
  else if (err instanceof Error) {
    res.status(400).json({ status: err.message })
  }
  else {
    res.status(500).end();
  }
});

module.exports = app