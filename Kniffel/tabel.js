import Sprite from "./sprite.js";
import ZeilenButton from "./zeilenButton.js";
import Util from "./util.js";
import Bot from "./bot.js";
import ResetButton from "./resetButton.js";

export default class Tabel extends Sprite {
  constructor(x, y, players, dice, rollAllButton) {
    // console.log("Tabellen sind da");
    super(x, y);
    this.rowHeight = 30;
    this.collumnSpace = 100;
    this.playerCollumsStart = 110;
    this.playerRowStart = 30;
    this.scoreNameRowStart = 65;
    this.scoreNameCollumStart = 10;
    this.width = 100 + players.length * this.collumnSpace;
    this.x = width / 2 - this.width / 2;
    this.height =
      this.scoreNameRowStart + players[0].scoreNames.length * this.rowHeight;
    this.dice = dice;
    this.rollAllButton = rollAllButton;
    this.players = players;
    this.playerNow = floor(random(players.length));
    this.resetButton = new ResetButton(6, 5);
    this.nextPlayer();
  }
  draw() {
    push();
    rect(0, 0, this.width, this.height);
    let n = 0;
    textSize(14);
    line(
      0,
      this.playerRowStart + this.rowHeight / 3,
      this.width,
      this.playerRowStart + this.rowHeight / 3
    );
    for (let i in this.players[0].scoreNames) {
      text(
        this.players[0].scoreNames[i] + ":",
        this.scoreNameCollumStart,
        this.scoreNameRowStart + n * this.rowHeight
      );
      if (
        this.players[0].scoreNames[i] === "Bonus" ||
        this.players[0].scoreNames[i] === "Chance"
      )
        line(
          0,
          this.scoreNameRowStart + n * this.rowHeight + this.rowHeight / 3,
          this.width,
          this.scoreNameRowStart + n * this.rowHeight + this.rowHeight / 3
        );
      n++;
    }
    for (let i = 0; i < this.players.length; i++) {
      fill(0);
      if (i === this.playerNow) {
        fill("blue");
      }
      text(
        this.players[i].name,
        this.playerCollumsStart + i * this.collumnSpace,
        this.playerRowStart
      );

      let score = this.players[i].getScores();
      let n = 0;
      push();
      textAlign(CENTER);
      for (let j in score) {
        text(
          score[j],
          this.playerCollumsStart + i * this.collumnSpace,
          this.scoreNameRowStart + n * this.rowHeight,
          textWidth(this.players[i].name)
        );
        n++;
      }
      pop();
    }
    pop();
  }
  nextPlayer() {
    this.playerNow = Util.cycelIndexInArray(this.players, this.playerNow);
    let n = 0;
    this.deleteAllChild();
    this.addChild(this.resetButton);
    if (this.getPlayerNow() instanceof Bot) {
      if (this.getPlayerNow().isSetuped === false) {
        this.getPlayerNow().setup(this.rollAllButton, this, this.dice);
      }
      this.getPlayerNow().turn();
    } else {
      for (let i in this.getPlayerNow().score) {
        if (this.getPlayerNow().score[i] === -1) {
          let zeilenButton = new ZeilenButton(
            this.playerCollumsStart + this.playerNow * this.collumnSpace,
            this.scoreNameRowStart + n * this.rowHeight - 19,
            i,
            this.dice,
            this.getPlayerNow()
          );
          this.addChild(zeilenButton);
        }
        n++;
      }
      this.rollAllButton.reset();
    }
  }
  getPlayerNow() {
    return this.players[this.playerNow];
  }
  reset() {
    for (let player of this.players) {
      player.resetScore();
    }
    this.playerNow = floor(random(this.players.length));
    this.nextPlayer();
  }
}
