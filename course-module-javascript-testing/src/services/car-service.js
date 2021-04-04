const Tax = require("../entities/tax");
const BaseRepository = require("../repositories/base/base-repository");

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });

    this.currencyFormat = new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  getRandomPositionFromArray(carsList) {
    const carsListLength = carsList.length;
    return Math.floor(Math.random() * carsListLength);
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
    const carId = carCategory.carIds[randomCarIndex];

    return carId;
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);
    const car = await this.carRepository.find(carId);

    return car;
  }

  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer;
    const { price } = carCategory;

    console.log(Tax.taxesBasedOnAge);
    const tax = Tax.getTax(age);

    const finalPrice = tax.value * price * numberOfDays;

    const formattedPrice = this.currencyFormat.format(finalPrice);

    return formattedPrice;
  }
}

module.exports = CarService;
