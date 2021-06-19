class TextProcessorFluentAPI {
  // private properties
  #content;

  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
      // ?<= -- extract all data that comes after this group
      // [contratante|contratada] -- 1 text sequence or the other
      // :\s{1} -- looks for the char : followed by 1 space
      // all inside a parenthesis to say we are getting from here on
      // (?!\s) -- negative look around, ignores matches that only have spaces in fron of them
      // .*\n gets everything until the first line break
      // .*? -- non greedy, stops at first spcial char
      // $ --informs that the search stops at eol
      // gmi -- global, multiline, insensitive
    const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gim;

    console.log("this.#content", this.#content);
    const onlyPerson = this.#content.match(matchPerson);

    this.#content = onlyPerson;

    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
