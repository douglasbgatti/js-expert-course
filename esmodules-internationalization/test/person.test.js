import mocha from "mocha";
import chai from "chai";
import Person from "../src/person.js";
import chalk from "chalk";

const { describe, it } = mocha;
const { expect } = chai;

describe("Person test suite", () => {
  it("should return a person instance from a string", () => {
    const person = Person.generateInstanceFromString(
      "1 Bike,Car 20000 2021-01-01 2021-04-10"
    );

    const expected = {
      id: "1",
      vehicles: ["Bike", "Car"],
      kmTraveled: "20000",
      from: "2021-01-01",
      to: "2021-04-10",
    };

    expect(person).to.deep.equal(expected);
  });

  it("should format a persons values", () => {
    const person = new Person({
      id: "1",
      vehicles: ["Bike", "Car"],
      kmTraveled: "20000",
      from: "2021-01-01",
      to: "2021-04-10",
    });

    const result = person.formatted("pt-br");
    const expected = {
      id: 1,
      vehicles: "Bike e Car",
      kmTraveled: "20.000 km",
      from: "01 de janeiro de 2021",
      to: "10 de abril de 2021",
    };

    expect(result).to.deep.equal(expected);
  });

  it("should return correct table options", () => {
    expect(Person.tableOptions).to.deep.equal({
      leftPad: 2,
      columns: [
        { field: "id", name: chalk.magenta("ID") },
        { field: "vehicles", name: chalk.cyan("Vehicles") },
        { field: "kmTraveled", name: chalk.cyan("KM Travelled") },
        { field: "from", name: chalk.cyan("From") },
        { field: "to", name: chalk.cyan("To") },
      ],
    });
  });
});
