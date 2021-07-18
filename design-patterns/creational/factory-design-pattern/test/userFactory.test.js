const { deepStrictEqual } = require("assert");
const UserFactory = require("../src/factory/userFactory");

(async () => {
  const expected = [
    {
      name: "DOUGLAS GATTI",
    },
  ];

  const userFactory = await UserFactory.createInstance();
  const result = await userFactory.find();

  deepStrictEqual(result, expected);
})();
