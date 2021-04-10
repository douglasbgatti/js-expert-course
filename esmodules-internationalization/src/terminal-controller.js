import DraftLog from "draftlog";
import chalkTable from "chalk-table";

import readline from "readline";
import Person from "./person.js";

export default class TerminalController {
  constructor() {
    this.data = [];
    this.print = {};
    this.terminal = {};
  }

  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin);

    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.initializeTable(database, language);
  }

  closeTerminal() {
    this.terminal.close();
  }

  initializeTable(database, language) {
    this.data = database.map((item) => new Person(item).formatted(language));

    const table = chalkTable(Person.tableOptions, this.data);
    this.print = console.draft(table);
  }

  updateTable(item) {
      this.data.push(item)
      this.print(chalkTable(Person.tableOptions, this.data))
  }

  question(msg = "") {
    return new Promise((resolve) => this.terminal.question(msg, resolve));
  }
}
