const UserFactory = require("./factory/userFactory");

(async () => {
  const userFactory = UserFactory.createInstance();

  const result = await (await userFactory).find({ name: "test" });
  console.log(result);
})();
