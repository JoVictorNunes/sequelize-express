const express = require("express");
const app = express();

const customerRouter = require("./modules/customer/routes");
const carRouter = require("./modules/car/routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/customer", customerRouter);
app.use("/car", carRouter);

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    res.status(409).json({ status: "Duplicated data not allowed!" });
  } else if (err instanceof Error) {
    res.status(400).json({ status: err.message });
  } else {
    res.status(500).end();
  }
});

module.exports = app;
