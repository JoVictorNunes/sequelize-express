const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const customerRouter = require("./contexts/customer/routes");
const carRouter = require("./contexts/car/routes");

const { duplicatedEntry } = require("../util/errorMessages");

const { sequelize } = require("../models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/customer", customerRouter);
app.use("/car", carRouter);

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err.name === "NotFoundResource") {
    res.status(404).json({ error: err.message });
  }
  else if (err.name === "SequelizeUniqueConstraintError") {
    res.status(409).json({ error: duplicatedEntry });
  }
  else {
    res.status(500).end();
  }
});

(async function () {
  await sequelize.authenticate();

  app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);
  });
})();
