import DisplayObject from "./displayObject.js";

export default class InteractiveObject extends DisplayObject {
  constructor(x, y, width, height) {
    // console.log("Interactive Objekte sind da");
    super(x, y);
    this.width = width;
    this.height = height;
    this.parent = undefined;
    this.isEnabeld = true;
    this.isHovered = false;
  }

  hitTest(x, y) {
    let realX = this.getRealXY().x;
    let realY = this.getRealXY().y;
    return (
      x > realX &&
      x < realX + this.width * this.scale &&
      y > realY &&
      y < realY + this.height * this.scale
    );
  }

  pressed() {}

  clicked() {}

  released() {}

  hover() {}

  mouseHover() {
    if (this.hitTest(mouseX, mouseY) && this.isEnabeld) {
      this.hover();
      this.isHovered = true;
    } else {
      this.isHovered = false;
    }
  }
  mousePressed() {
    if (this.hitTest(mouseX, mouseY) && this.isEnabeld) {
      this.pressed();
    }
  }

  mouseClicked() {
    if (this.hitTest(mouseX, mouseY) && this.isEnabeld) {
      this.clicked();
    }
  }

  mouseReleased() {
    if (this.hitTest(mouseX, mouseY) && this.isEnabeld) {
      this.released();
    }
  }
  getRealXY() {
    let rueckgabe = { x: this.x, y: this.y };
    let p = this.parent;
    while (p != undefined) {
      rueckgabe.x += p.x;
      rueckgabe.y += p.y;
      p = p.parent;
    }
    return rueckgabe;
  }
  enabel() {
    this.visible = true;
    this.isEnabeld = true;
  }
  disabel(hide = false) {
    if (hide) this.visible = false;
    this.isEnabeld = false;
  }
}
