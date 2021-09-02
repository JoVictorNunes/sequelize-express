const { sequelize } = require("../../../../models");
const { Car } = sequelize.models;

class CarRepository {
  async exists(id) {
    const car = await Car.findOne({
      where: { id },
    });

    return !!car;
  }

  async create({ brand, model, license, year }) {
    let car;

    if (year) {
      car = await Car.create({ brand, model, license, year });
    } else {
      car = await Car.create({ brand, model, license });
    }

    return customer;
  }

  async getAll() {
    const cars = await Car.findAll();
    return cars;
  }

  async getCar(id) {
    const car = await Car.findOne({
      where: { id },
    });

    return car;
  }

  async delete(id) {
    await Car.destroy({
      where: { id },
    });
  }

  async update(id, carData) {
    const car = await Car.findOne({
      where: { id },
    });

    const updatedCar = await car.update(carData);
    return updatedCar;
  }
}

module.exports = { CarRepository };
