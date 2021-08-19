import { database } from "../shared/data.mjs";

class Application {
  constructor(factory) {
    this.table = factory.createTable();
  }

  initialize(database) {
    this.table.render(database);
  }
}

(async function main() {
  const path = globalThis.window ? "browser" : "console";

  // dinamically import view factory based on path
  const { default: ViewFactory } = await import(
    `./../platforms/${path}/index.mjs`
  );

  const app = new Application(new ViewFactory());
  app.initialize(database);
})();
