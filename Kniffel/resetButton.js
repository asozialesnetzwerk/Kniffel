import Button from "./button.js";

export default class ResetButton extends Button {
  constructor(x, y) {
    super(x, y, 70, 30, "Reset", 5);
  }
  clicked() {
    this.parent.reset();
  }
}
