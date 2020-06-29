import Button from "./button.js";

export default class RollAllButton extends Button {
  constructor(x, y, width, height, titel, dices) {
    // console.log("Roll all Button ist da");
    super(x, y, width, height, titel, 10);
    this.dices = dices;
    this.pressNumber = 0;
  }
  clicked() {
    super.clicked();
    this.rollAll();
    if (this.pressNumber > 2) this.disabel();
  }
  reset() {
    this.pressNumber = 0;
    this.enabel();
    this.dices.forEach((element) => {
      element.isSmily = true;
    });
    this.rollAll();
  }
  rollAll() {
    this.pressNumber++;
    if (this.pressNumber < 4) {
      for (let i in this.dices) {
        this.dices[i].roll();
      }
    }
  }
}
