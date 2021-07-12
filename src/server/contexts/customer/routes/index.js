const { Router } = require("express");
const router = Router();

const { sequelize } = require("../../../../models");
const { Customer, Phone, Car } = sequelize.models;

const { CreateCustomerRequestValidator, CustomerValidator } = require("../middlewares");
const { idValidator } = require("../../../shared/middlewares");
const { duplicatedEntryMessage } = require("../../../../util/errorMessages");

// OK:
router.get("/", async function (req, res, next) {
  try {
    const customers = await Customer.findAll();
    res.status(200).json({ customers });
  }
  catch (e) {
    res.status(500).end();
  }
});

// OK:
router.get("/:id", idValidator, async function (req, res, next) {
  try {
    const customer = await Customer.findOne({
      where: { id: req.params.id }
    });

    if (customer) {
      res.status(200).json({ customer });
    }
    else {
      res.status(400).json({ error: "Customer does not exist." });
    }
  }
  catch (e) {
    res.status(500).end();
  }
});

// OK:
router.post("/", CreateCustomerRequestValidator, async function (req, res, next) {
  try {
    const { customer, telefones, carros } = req.body;

    const createdUser = await sequelize.transaction(async (transaction) => {
      const user = await Customer.create(customer, { transaction });

      if (telefones) {
        for (let telefone of telefones) {
          await Phone.create({
            ...telefone,
            fk_id_customer: user.id,
          }, { transaction });
        }
      }

      if (carros) {
        for (let carro of carros) {
          await Car.create({
            ...carro,
            fk_id_customer: user.id,
          }, { transaction });
        }
      }

      return user;
    });

    res.status(201).location(`${req.baseUrl}/${createdUser.id}`).end();
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

// OK:
router.put("/:id", idValidator, CustomerValidator, async function (req, res, next) {  
  try {
    const customer = await Customer.findOne({
      where: { id: req.params.id }
    });

    if (customer) {
      const updatedCustomer = await customer.update(req.body);
      res.status(200).location(`${req.baseUrl}/${updatedCustomer.id}`).end();
    }
    else {
      res.status(404).json({ error: "Customer does not exist." });
    }
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
    await Customer.destroy({
      where: { id: req.params.id }
    });

    res.status(200).end();
  }
  catch (e) {
    res.status(500).end();
  }
});

module.exports = router;
