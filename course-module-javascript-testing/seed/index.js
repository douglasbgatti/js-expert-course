const faker = require("faker");

const Car = require("../src/entities/car");
const CarCategory = require("../src/entities/car-category");
const Customer = require("../src/entities/customer");

const { join } = require("path");
const { writeFile } = require("fs/promises");
const seederBaseFolder = join(__dirname, "../", "database");

const ITEMS_AMOUNT = 2;

const carCategory = new CarCategory({
  id: faker.datatype.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
});

const cars = [];
const customers = [];
for (let index = 0; index <= ITEMS_AMOUNT; index++) {
  const car = new Car({
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
  });

  cars.push(car);
  carCategory.carIds.push(car.id);

  const customer = new Customer({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    age: faker.datatype.number({ min: 18, max: 50 }),
  });

  customers.push(customer);
}

const write = (fileName, data) =>
  writeFile(join(seederBaseFolder, fileName), JSON.stringify(data, null, 2));

(async () => {
  await write("cars.json", cars);
  await write("car-categories.json", carCategory);
  await write("customers.json", customers);
})();
