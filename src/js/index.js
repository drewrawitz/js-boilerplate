import '../css/styles.css';

class Car {
  constructor(year, make, model) {
    Object.assign(this, { year, make, model });
  }

  displayInfo() {
    const result = `Nice ${this.year} ${this.make} ${this.model}!`;
    console.log(result); // eslint-disable-line no-console
  }
}

const camry = new Car('2012', 'Toyota', 'Camry');
camry.displayInfo();
