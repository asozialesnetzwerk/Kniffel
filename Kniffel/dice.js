import Sprite from "./sprite.js";

export default class Dice extends Sprite {
  constructor(x, y) {
    // console.log("Würfel sind da");
    super(x, y);
    this.width = 100;
    this.height = 100;
    this.value = this.getRandomValue();
    this.animationValue = 0;
    this.animationTimer = 0;
    this.animationTime = 35;
    this.isSmily = true;
  }

  getRandomValue() {
    return ceil(random(0, 6));
  }

  roll() {
    if (this.isSmily) {
      this.value = this.getRandomValue();
      this.animationTimer = this.animationTime;
      return this.value;
    }
  }

  draw() {
    push();

    fill(255, 255, 255);
    rect(0, 0, this.width, this.height, 6);
    fill(0, 0, 0);
    translate(this.width / 2, this.height / 2);
    if (this.animationTimer > 0) {
      this.animationTimer--;
      this.animationValue = this.getRandomValue();
      this.drawSmils(this.animationValue);
    } else {
      this.drawSmils(this.value);
    }

    pop();
  }
  drawSmils(value) {
    switch (value) {
      case 1:
        textSize(20);
        text("🦄", -15, 7);
        break;
      case 2:
        textSize(20);
        text("🦘", 15, -18);
        text("🦘", -35, 32);
        break;
      case 3:
        textSize(20);
        text("🦗", -14, +7);
        text("🦗", +12, -18);
        text("🦗", -38, +32);
        break;
      case 4:
        textSize(20);
        text("🐹", +11, -18);
        text("🐹", -39, +32);
        text("🐹", +11, +32);
        text("🐹", -39, -18);
        break;
      case 5:
        textSize(20);
        text("🐕", +11, -18);
        text("🐕", -39, +32);
        text("🐕", +11, +32);
        text("🐕", -39, -18);
        text("🐕", -14, +5);
        break;
      case 6:
        textSize(19);
        text("🐱‍🏍", +12, -18);
        text("🐱‍🏍", -38, +32);
        text("🐱‍🏍", +12, +32);
        text("🐱‍🏍", -38, -18);
        text("🐱‍🏍", -38, +5);
        text("🐱‍🏍", +12, +5);
    }
    if (this.isSmily === false) {
      textSize(20);
      text("🔒", -55, -44);
    }
  }

  clicked() {
    super.clicked();
    this.isSmily = !this.isSmily;
  }
}
