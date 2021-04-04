const { describe, it, before, beforeEach, afterEach } = require("mocha");
const CarService = require("../../src/services/car-service");

const { join } = require("path");
const { expect } = require("chai");
const sinon = require("sinon");
const Transaction = require("../../src/entities/transaction");

const carsDatabase = join(__dirname, "../../database", "cars.json");

const mocks = {
  validCarCategory: require("../mocks/valid-car-category.json"),
  validCar: require("../mocks/valid-car.json"),
  validCustomer: require("../mocks/valid-customer.json"),
};

describe("CarService Suite Tests", () => {
  let carService = {};
  let sandbox = {};

  before(() => {
    carService = new CarService({ cars: carsDatabase });
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should retrieve a random position from an array", async () => {
    const data = [0, 1, 2, 3, 4];
    const result = carService.getRandomPositionFromArray(data);

    expect(result).to.be.lte(data.length).and.be.gte(0);
  });

  it("should choose the first id from carIds in car category", async () => {
    const carCategory = mocks.validCarCategory;
    const carIdIndex = 0;

    sandbox
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(carIdIndex);

    const result = carService.chooseRandomCar(carCategory);
    const expected = carCategory.carIds[carIdIndex];

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;

    expect(result).to.be.equal(expected);
  });

  it("given a carCategory it should return an available car", async () => {
    const car = mocks.validCar;
    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.carIds = [car.id];

    sandbox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car);

    sandbox.spy(carService, carService.chooseRandomCar.name);

    const result = await carService.getAvailableCar(carCategory);

    expect(carService.chooseRandomCar.calledOnce).to.be.ok;
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok;

    expect(result).to.be.deep.equal(car);
  });

  it("given a car category, customer and number of days it should calculate final amount in  brazillian real", async () => {
    const customer = Object.create(mocks.validCustomer);
    customer.age = 50;

    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.price = 37.6;

    const numberOfDays = 5;

    const result = carService.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    );

    const valueExpected = carService.currencyFormat.format(244.4);

    expect(result).to.equal(valueExpected);
  });

  it("given a customer and and a car category it should return the transaction receipt", async () => {
    const car = mocks.validCar;
    const carCategory = {
      ...mocks.validCarCategory,
      price: 37.6,
      carIds: [car.id],
    };

    const customer = {
      ...mocks.customer,
      age: 20,
    };
    // mock date
    const now = new Date(2020, 10, 5);
    sandbox.useFakeTimers(now.getTime());

    sandbox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car);

    const numberOfDays = 5;

    const dueDateExpected = "10 de novembro de 2020";

    // age 20, tax: 1.1, categoryPrice: 37.6
    // 37.6 * 1.1 * 5days = 206.8
    const amountExpected = carService.currencyFormat.format(206.8);

    const result = await carService.rent(customer, carCategory, numberOfDays);

    const transactionExpected = new Transaction({
      customer,
      car,
      dueDate: dueDateExpected,
      amount: amountExpected,
    });

    expect(result).to.deep.equal(transactionExpected);
  });
});
