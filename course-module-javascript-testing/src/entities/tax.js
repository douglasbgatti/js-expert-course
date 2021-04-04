class Tax {
  static get taxesBasedOnAge() {
    return [
      { from: 18, to: 25, value: 1.1 },
      { from: 26, to: 30, value: 1.5 },
      { from: 31, to: 100, value: 1.3 },
    ];
  }

  static getTax(age) {
    return this.taxesBasedOnAge.find((tax) => age >= tax.from && age <= tax.to);
  }
}

module.exports = Tax;
