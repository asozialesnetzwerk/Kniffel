import Button from "./button.js";

export default class StartButton extends Button {
  constructor(x, y) {
    // console.log("Startbutton sind da");
    super(x - 50, y, 100, 30, "start");
  }
  clicked() {
    this.parent.startGame();
  }
}
