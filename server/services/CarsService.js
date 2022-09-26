import { dbContext } from "../db/DbContext.js";

class CarsService {
  async getCars() {
    const cars = await dbContext.Cars.find();
    return cars;
  }

  async getCar(carId) {
    const car = await dbContext.Cars.findById(carId);
    return car;
  }

  async addCar(data) {
    const car = await dbContext.Cars.create(data);
    return car;
  }
}

export const carsService = new CarsService();
