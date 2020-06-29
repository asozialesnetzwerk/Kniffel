export class diceCounting {
  static countDice(dice, diceNumber = 0) {
    let count = [0, 0, 0, 0, 0, 0, 0];
    for (let i in dice) {
      count[dice[i].value]++;
    }
    if (diceNumber > 0) return count[diceNumber];
    return count;
  }

  static pasch(dice, n) {
    let count = this.countDice(dice);
    if (this.getSameDice(n, count) > 0) {
      if (n === 5) return 50;
      return this.addAllDice(count);
    }
    return 0;
  }
  static street(dice, n) {
    let count = this.countDice(dice);
    if (this.countStreet(n, count)) {
      if (n === 4) return 30;
      if (n === 5) return 40;
    }
    return 0;
  }
  static fullHouse(dice) {
    let count = this.countDice(dice);
    if (
      (this.getSameDice(3, count, true) > 0 &&
        this.getSameDice(2, count, true) > 0) ||
      this.getSameDice(5, count, true) > 0
    )
      return 25;
    return 0;
  }
  static chance(dice) {
    let count = this.countDice(dice);
    return this.addAllDice(count);
  }
  static getSameDice(nDice, count, countExactly = false) {
    for (let i = 0; i < count.length; i++) {
      if (countExactly) {
        if (count[i] == nDice) return i;
      } else {
        if (count[i] >= nDice) return i;
      }
    }
    return 0;
  }
  static addAllDice(count) {
    let countNumbers = 0;
    for (let i = 0; i < count.length; i++) {
      countNumbers += count[i] * i;
    }
    return countNumbers;
  }
  static countStreet(leng, count) {
    let counter = 0;
    for (let i = 0; i < count.length; i++) {
      if (count[i] > 0) {
        counter++;
      } else {
        counter = 0;
      }
      if (counter >= leng) return true;
    }
    return false;
  }
}
