// Напиши клас StringBuilder. На вхід він отримує один параметр
// – рядок, який записує у властивість _value.
// Додай класу наступний функціонал:
// Геттер value– повертає поточне значення поля_value
// Метод append(str)- отримує парметр str (рядок) і додає її до кінця _value
// Метод prepend(str)- отримує парметр str (рядок) і додає її на початок.
// Метод pad(str)- отримує парметр str (рядок) і додає її на початок і на кінець_value
// const builder = new StringBuilder('.');
// builder.append('^');
// console.log(builder.value); // '.^'
// builder.prepend('^');
// console.log(builder.value); // '^.^'
// builder.pad('=');
// console.log(builder.value); // '=^.^='

class StringBuilder {
  constructor(value) {
    this._value = value;
  }
  get value() {
    return this._value;
  }

  append(str) {
    return (this._value += str);
  }

  prepend(str) {
    return (this._value = str + this._value);
  }

  pad(str) {
    return (this._value = str + this._value + str);
  }
}

const builder = new StringBuilder(".");

builder.append("^");
console.log(builder.value); // '.^'

builder.prepend("^");
console.log(builder.value); // '^.^'

builder.pad("=");
console.log(builder.value); // '=^.^='
