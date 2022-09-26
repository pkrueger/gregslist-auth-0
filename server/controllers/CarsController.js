import { Auth0Provider } from "@bcwdev/auth0provider";
import { carsService } from "../services/CarsService.js";
import BaseController from "../utils/BaseController.js";

export class CarsController extends BaseController {
  constructor() {
    super("api/cars");
    this.router
      .get("", this.getCars)
      .get("/:carId", this.getCar)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.addCar);
  }
  async getCars(req, res, next) {
    try {
      const cars = await carsService.getCars();

      res.send(cars);
    } catch (error) {
      next(error);
    }
  }

  async getCar(req, res, next) {
    try {
      const car = await carsService.getCar(req.params.carId);
      res.send(car);
    } catch (error) {
      next(error);
    }
  }

  async addCar(req, res, next) {
    try {
      const data = req.body;
      data.sellerId = req.userInfo.id;

      const car = await carsService.addCar(data);

      res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
