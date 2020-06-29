import Button from "./button.js";
import { diceCounting } from "./diceCounting.js";

export default class ZeilenButton extends Button {
  constructor(x, y, id, dice, player) {
    // console.log("Zeilen sind da");

    super(x, y, 42, 30, "save");
    this.id = id;
    this.dice = dice;
    this.player = player;
    this.visible = false;
  }
  clicked() {
    switch (this.id) {
      case "einser":
        this.player.setScore(this.id, diceCounting.countDice(this.dice, 1) * 1);
        break;
      case "zweier":
        this.player.setScore(this.id, diceCounting.countDice(this.dice, 2) * 2);
        break;
      case "dreier":
        this.player.setScore(this.id, diceCounting.countDice(this.dice, 3) * 3);
        break;
      case "vierer":
        this.player.setScore(this.id, diceCounting.countDice(this.dice, 4) * 4);
        break;
      case "fünfer":
        this.player.setScore(this.id, diceCounting.countDice(this.dice, 5) * 5);
        break;
      case "sechser":
        this.player.setScore(this.id, diceCounting.countDice(this.dice, 6) * 6);
        break;
      case "dreipasch":
        this.player.setScore(this.id, diceCounting.pasch(this.dice, 3));
        break;
      case "vierpasch":
        this.player.setScore(this.id, diceCounting.pasch(this.dice, 4));
        break;
      case "fullHouse":
        this.player.setScore(this.id, diceCounting.fullHouse(this.dice));
        break;
      case "smallStreet":
        this.player.setScore(this.id, diceCounting.street(this.dice, 4));
        break;
      case "bigStreet":
        this.player.setScore(this.id, diceCounting.street(this.dice, 5));
        break;
      case "kniffel":
        this.player.setScore(this.id, diceCounting.pasch(this.dice, 5));
        break;
      case "chance":
        this.player.setScore(this.id, diceCounting.chance(this.dice));
        break;
    }
    this.parent.nextPlayer();
  }
  display() {
    super.display();
    this.visible = false;
  }
  hover() {
    //super.hover();
    this.visible = true;
  }
  // countDice(diceNumber = 0) {
  //   let count = [0, 0, 0, 0, 0, 0, 0];
  //   for (let i in this.dice) {
  //     count[this.dice[i].value]++;
  //   }
  //   if (diceNumber > 0) return count[diceNumber];
  //   return count;
  // }
  // specialScore(id) {
  //   let count = this.countDice();
  //   switch (id) {
  //     case "dreipasch":
  //       if (this.getSameDice(3, count) > 0) return this.addAllDice(count);
  //       return 0;
  //     case "vierpasch":
  //       if (this.getSameDice(4, count) > 0) return this.addAllDice(count);
  //       return 0;
  //     case "smallStreet":
  //       if (this.countStreet(4, count)) return 30;
  //       return 0;
  //     case "fullHouse":
  //       if (
  //         (this.getSameDice(3, count, true) > 0 &&
  //           this.getSameDice(2, count, true) > 0) ||
  //         this.getSameDice(5, count, true) > 0
  //       )
  //         return 25;
  //       return 0;
  //     case "bigStreet":
  //       if (this.countStreet(5, count)) return 40;
  //       return 0;
  //     case "kniffel":
  //       if (this.getSameDice(5, count) > 0) return 50;
  //       return 0;
  //     case "chance":
  //       return this.addAllDice(count);
  //   }
  // }
  // getSameDice(nDice, count, countExactly = false) {
  //   for (let i = 0; i < count.length; i++) {
  //     if (countExactly) {
  //       if (count[i] == nDice) return i;
  //     } else {
  //       if (count[i] >= nDice) return i;
  //     }
  //   }
  //   return 0;
  // }
  // addAllDice(count) {
  //   let countNumbers = 0;
  //   for (let i = 0; i < count.length; i++) {
  //     countNumbers += count[i] * i;
  //   }
  //   return countNumbers;
  // }
  // countStreet(leng, count) {
  //   let counter = 0;
  //   for (let i = 0; i < count.length; i++) {
  //     if (count[i] > 0) {
  //       counter++;
  //     } else {
  //       counter = 0;
  //     }
  //     if (counter >= leng) return true;
  //   }
  //   return false;
  // }
}
