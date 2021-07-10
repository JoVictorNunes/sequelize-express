const { Router } = require("express");
const router = Router();

const { sequelize } = require("../../../../models");
const { Car } = sequelize.models;

const { idValidator } = require("../../../shared/middlewares");
const { CreateCarRequestValidator } = require("../middlewares");
const { duplicatedEntryMessage } = require("../../../../util/errorMessages");

router.get("/", async function (req, res, next) {
  try {
    const cars = await Car.findAll({
      attributes: ["id", ["fk_id_customer", "idCustomer"], "fabricante", "modelo", "placa", "ano_lancamento"]
    });
    
    res.json({ cars });
  }
  catch (e) {
    res.status(500).end();
  }
});

router.get("/:id", idValidator, async function (req, res, next) {
  try {
    const car = await Car.findOne({
      where: { id: req.params.id },
      attributes: ["id", ["fk_id_customer", "idCustomer"], "fabricante", "modelo", "placa", "ano_lancamento"]
    });

    if (car) {
      res.status(200).json({ car });
    }
    else {
      res.status(400).json({ error: "Car does not exist." });
    }
  }
  catch (e) {
    res.status(500).end();
  }
});

router.post("/", CreateCarRequestValidator, async function (req, res, next) {
  try {
    const createdCar = await Car.create({
      ...req.body.car,
      fk_id_customer: req.body.idCustomer
    });
  
    res.status(201).location(`${req.baseUrl}/${createdCar.id}`).end();
  }
  catch (e) {
    if (e.name === "SequelizeUniqueConstraintError") {
      res.status(409).json({ error: duplicatedEntryMessage });
    }
    else {
      res.status(500).end();
    }
  }
});

router.delete("/:id", idValidator, async function (req, res, next) {
 try {
  await Car.destroy({
    where: { id: req.params.id }
  });

  res.status(200).end();
 }
 catch (e) {
   res.status(500).end();
 }
});

module.exports = router;
