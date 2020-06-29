import InteractiveObject from "./interactiveObject.js";

export default class Button extends InteractiveObject {
  constructor(x, y, width, height, titel, round = 0) {
    // console.log("ButtonSindDa");
    super(x, y, width, height);
    this.titel = titel;
    this.round = round;
    this.hoverTimer = 0;
    this.hoverMaxTimer = 140;
    this.hoverTimerSpeed = 10;
  }
  draw() {
    if (this.isHovered === false) this.hoverTimer = 0;
    if (this.isEnabeld) {
      fill(255);
    } else {
      fill(150);
    }
    rect(0, 0, this.width, this.height, this.round);
    fill(0);
    textSize(15);
    textAlign(CENTER);
    text(this.titel, 0, 0 + this.height / 2 + 4, this.width);
    noStroke();
    fill(255, 255, 255, this.hoverTimer);
    rect(0, 0, this.width + 1, this.height + 1, this.round);
  }
  hover() {
    if (this.hoverTimer < this.hoverMaxTimer) {
      this.hoverTimer += this.hoverTimerSpeed;
    }
  }
}
