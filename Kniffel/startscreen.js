import Sprite from "./sprite.js";
import Game from "./game.js";
import StartButton from "./startButton.js";
import Player from "./player.js";
import Bot from "./bot.js";

export default class Startscreen extends Sprite {
  constructor(x, y) {
    // console.log("Start screen ist da");
    super(x, y);
    this.width = windowWidth;
    this.height = windowHeight;
    this.addChild(new StartButton(this.width / 2, this.height / 2));
  }
  draw() {
    textSize(25);
    text("Wilkommen zu Kniffel", this.width / 2 - 125, this.height / 2 - 50);
  }
  startGame() {
    let game = new Game(0, 0, [
      new Player("Spieler 1"),
      new Player("Spieler 2"),
      new Bot("Bot 1"),
      new Bot("Bot 2"),
    ]);
    this.parent.addChild(game);
    this.parent.removeChild(this);
  }
}
