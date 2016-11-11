class Car {
  constructor(year, make, model) {
    Object.assign(this, { year, make, model });
  }

  sayHi() {
    console.log('Hey there!');
  }

  displayInfo() {
    const result = `Nice ${this.year} ${this.make} ${this.model}!`;
    console.log(result);
  }
}

const camry = new Car('2012', 'Toyota', 'Camry');
camry.sayHi();
camry.displayInfo();
