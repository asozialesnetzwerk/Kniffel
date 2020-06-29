import Player from "./player.js";
import { diceCounting } from "./diceCounting.js";
import Util from "./util.js";

export default class Bot extends Player {
  constructor(name) {
    super(name);
    this.rollAllButton;
    this.tabel;
    this.dice;
    this.isSetuped = false;
  }

  setup(rollAllButton, tabel, dice) {
    this.rollAllButton = rollAllButton;
    this.tabel = tabel;
    this.dice = dice;
    this.isSetuped = true;
    console.log("Bot wurde aufgesetzt.");
  }

  turn() {
    if (this.isSetuped) {
      console.log("EIN NEUER ZUG BEGINNT:");
      this.rollAllButton.reset();
      this.playBestTabel();
    } else {
      console.log("Bitte setze den Bot erst auf");
    }
  }

  playBestTabel() {
    let count;
    let bestDiceNumbers;
    while (this.rollAllButton.pressNumber < 4) {
      count = diceCounting.countDice(this.dice);
      console.log("Der Bot" + this.name + " würfelte:");
      console.log(count);
      bestDiceNumbers = this.getSmartNumbersToLock(count);
      if (bestDiceNumbers != -1) {
        this.lockDicesWithArray(bestDiceNumbers);
      }
      this.rollAllButton.rollAll();
    }
    bestDiceNumbers = this.getSmartNumbersToLock(count);

    if (this.getBestSavePosition()) return;

    //Transformation des bestDiceNumbers in den Besten einzelwürfel
    let bestDiceNumber = this.getHighestTopCombination(count);
    if (bestDiceNumber == -1) {
      bestDiceNumber = this.getBestTopDeletingField();
    }
    if (this.saveBestTopScore(bestDiceNumber)) return;

    if (this.deleteBottomField()) return;
    console.log("ERROR: Es konnte kein Score mehr gespeichert werden");
    this.tabel.nextPlayer();
  }

  getSmartNumbersToLock(count) {
    let indexe = Util.getHighIndexInArray(count);
    console.log("Die höchsten Indexe Bertragen:");
    console.log(indexe);
    console.log("Die aktuelle Count ist: ");
    console.log(count);
    indexe.sort(this.sortNumber);
    if (count[indexe[0]] > 3) {
      if (
        this.isScoreFree("vierpasch") ||
        this.isScoreFree("dreipasch") ||
        this.isScoreFree("kniffel") ||
        this.isScoreFree(this.indexToScoreKey(indexe[0]))
      ) {
        return [[indexe[0], -1]];
      }
    }
    if (count[indexe[0]] >= 3) {
      if (this.isScoreFree("fullHouse")) {
        let indexDoubel = diceCounting.getSameDice(2, count, true);
        if (indexDoubel) {
          return [
            [indexe[0], 3],
            [indexDoubel, 2],
          ];
        }
        return [[indexe[0], 3]];
      }
      if (
        this.isScoreFree("vierpasch") ||
        this.isScoreFree("dreipasch") ||
        this.isScoreFree("kniffel") ||
        this.isScoreFree(this.indexToScoreKey(indexe[0]))
      ) {
        return [[indexe[0], -1]];
      }
    }
    if (this.checkDoubelIndizes(count)) {
      if (this.checkDoubelIndizes(count) != 1) {
        if (this.isScoreFree("fullHouse")) {
          return this.checkDoubelIndizes(count);
        }
      }
    } else {
      if (
        (this.isScoreFree("bigStreet") || this.isScoreFree("smallStreet")) &&
        this.countLength(count) >= 4
      ) {
        console.log("We PLAY FOR A STREET");
        return this.getStreetIndizes(count);
      }
    }

    if (this.isScoreFree(this.indexToScoreKey(indexe[0]))) {
      console.log("HolD THE HIGHEST");
      return [[indexe[0], -1]];
    }
    count[indexe[0]] = 0;
    if (Util.isArrayEmtpy(count) == false) {
      return this.getSmartNumbersToLock(count);
    }
    return -1;
  }

  countLength(count) {
    let n = 0;
    for (let i in count) n = n + 1;
    return n;
  }

  checkDoubelIndizes(count) {
    let doubelIndezes = [];
    for (let i in count) {
      if (count[i] > 1) doubelIndezes.push(i);
    }
    if (doubelIndezes.length === 2) {
      return [
        [doubelIndezes[0], 2],
        [doubelIndezes[1], 2],
      ];
    }
    if (doubelIndezes.length >= 1) {
      return 1;
    }
    return false;
  }

  getStreetIndizes(count) {
    let serie = this.getHighestNumberSerie(count);
    console.log(serie);
    let serieArray = [];
    for (let i in serie) {
      serieArray.push([serie[i], 1]);
    }
    if (serie.length < 4) {
      let testAbove = serie[serie.length - 1] + 2;
      let testUnder = serie[0] - 2;
      if (testAbove < 7 && count[testAbove] === 1) {
        serieArray.push([testAbove, 1]);
      }
      if (testUnder > 0 && count[testUnder] === 1) {
        serieArray.push([testUnder, 1]);
      }
    }
    return serieArray;
  }

  getHighestNumberSerie(count) {
    let list = [];
    let indizes = [];
    for (let i = 0; i < count.length; i++) {
      if (count[i] > 0) {
        indizes.push(i);
        if (i === 6) {
          list.push(indizes);
        }
      } else {
        list.push(indizes);
        indizes = [];
      }
    }
    let high = -1;
    let highIndex = 0;
    for (let i in list) {
      if (list[i].length > high) {
        high = list[i].length;
        highIndex = i;
      }
    }
    return list[highIndex];
  }

  saveBestTopScore(bestDiceNumber) {
    console.log("SaveTopScore:");
    console.log(bestDiceNumber);
    if (this.score.hasOwnProperty(this.indexToScoreKey(bestDiceNumber))) {
      this.saveScore(
        this.indexToScoreKey(bestDiceNumber),
        diceCounting.countDice(this.dice, bestDiceNumber) *
          parseInt(bestDiceNumber)
      );
      return true;
    } else {
      return false;
    }
  }

  deleteBottomField() {
    if (this.saveScore("chance", diceCounting.chance(this.dice))) return true;
    if (this.saveScore("bigStreet", diceCounting.street(this.dice, 5)))
      return true;
    if (this.saveScore("smallStreet", diceCounting.street(this.dice, 4)))
      return true;
    if (this.saveScore("vierpasch", diceCounting.pasch(this.dice, 4)))
      return true;
    if (this.saveScore("fullHouse", diceCounting.fullHouse(this.dice)))
      return true;
    if (this.saveScore("kniffel", diceCounting.pasch(this.dice, 5)))
      return true;
    if (this.saveScore("dreipasch", diceCounting.pasch(this.dice, 3)))
      return true;
    return false;
  }

  getBestSavePosition() {
    let count = diceCounting.countDice(this.dice);
    if (this.saveKniffel()) return true;
    if (this.saveVierpasch()) return true;
    if (this.saveFullHouse()) return true;
    if (this.saveDreipasch()) return true;
    if (this.saveBigStreet(count)) return true;
    if (this.saveSmallStreet(count)) return true;
    return false;
  }

  saveFullHouse() {
    if (diceCounting.fullHouse(this.dice) > 0) {
      if (this.saveScore("fullHouse", diceCounting.fullHouse(this.dice)))
        return true;
      return this.saveDreipasch();
    }
  }

  saveBigStreet(count) {
    if (diceCounting.countStreet(5, count)) {
      if (this.saveScore("bigStreet", diceCounting.street(this.dice, 5))) {
        return true;
      }
      return this.saveSmallStreet(count);
    }
  }

  saveSmallStreet(count) {
    if (diceCounting.countStreet(4, count)) {
      if (this.saveScore("smallStreet", diceCounting.street(this.dice, 4))) {
        return true;
      }
      return false;
    }
  }

  saveKniffel() {
    if (diceCounting.pasch(this.dice, 5)) {
      if (this.saveScore("kniffel", diceCounting.pasch(this.dice, 5)))
        return true;
      if (this.isScoreFree("fullHouse")) {
        return this.saveFullHouse();
      }
      if (this.dice[0].value < 4) {
        if (this.isScoreFree(this.indexToScoreKey(this.dice[0].value))) {
          return false;
        }
      }
      return this.saveVierpasch();
    }
  }
  saveVierpasch() {
    if (diceCounting.pasch(this.dice, 4) > 6) {
      if (this.saveScore("vierpasch", diceCounting.pasch(this.dice, 4))) {
        return true;
      }
    }
    return this.saveDreipasch();
  }
  saveDreipasch() {
    if (diceCounting.pasch(this.dice, 3) > 5) {
      if (this.saveScore("dreipasch", diceCounting.pasch(this.dice, 3)))
        return true;
    }
    return false;
  }

  lockDices(num) {
    for (let i in this.dice) {
      this.dice[i].isSmily = true;
    }
    for (let i in num) {
      for (let j in this.dice) {
        if (this.dice[j].value == num[i]) {
          this.dice[j].isSmily = false;
        }
      }
    }
  }
  lockDicesWithArray(array) {
    for (let i in this.dice) {
      this.dice[i].isSmily = true;
    }
    for (let i in array) {
      let n = 0;
      for (let j in this.dice) {
        if (array[1] > 0) {
          if (this.dice[j].value == array[i][0] && n < array[1]) {
            this.dice[j].isSmily = false;
          }
        } else {
          if (this.dice[j].value == array[i][0]) {
            this.dice[j].isSmily = false;
          }
        }
        n++;
      }
    }
    console.log("Die Gelockten Würfel:");
    for (let i in this.dice) {
      console.log(this.dice[i].value + " " + this.dice[i].isSmily);
    }
  }

  getBestTopDeletingField() {
    for (let i = 0; i < Object.keys(this.score).length; i++) {
      if (this.isScoreFree(this.indexToScoreKey(i))) {
        return i;
      }
      if (i === 6) return false;
    }
  }

  getHighestTopCombination(count) {
    let indexe = Util.getHighIndexInArray(count);
    indexe.sort(this.sortNumber);
    //Checkt ob die Besten ScoreFelder Frei sind wenn ja trägt er diese ein
    for (let i in indexe) {
      if (this.isScoreFree(this.indexToScoreKey(indexe[i]))) {
        return indexe[i];
      }
    }
    //Wenn keines der Score Felder Frei ist, löscht er die besten aus seinem Array und ruft sich selbst wieder auf, um die zweitbesten zu finden
    for (let i in indexe) {
      count[indexe[i]] = 0;
    }
    if (Util.isArrayEmtpy(count) == false) {
      return this.getHighestTopCombination(count);
    }
    return -1;
  }

  sortNumber(a, b) {
    return b - a;
  }

  indexToScoreKey(i) {
    let n = 1;
    for (let j in this.score) {
      if (n == i) {
        return j;
      }
      n++;
    }
    return false;
  }

  isScoreFree(id) {
    if (this.score[id] === -1) {
      return true;
    }
    return false;
  }

  saveScore(id, score) {
    if (this.isScoreFree(id)) {
      this.setScore(id, score);
      this.tabel.nextPlayer();
      return true;
    } else {
      return false;
    }
  }
}
