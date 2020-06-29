import Sprite from "./sprite.js";
import Dice from "./dice.js";
import RollAllButton from "./rollAllButton.js";
import Tabel from "./tabel.js";

export default class Game extends Sprite {
  constructor(x, y, players) {
    //console.log("Spiel ist da");
    super(x, y);
    this.width = width;
    this.height = height;
    this.dice = [];
    this.players = players;
    //Würfel erzeugen
    for (let i = 0; i < 5; i++) {
      let d = new Dice(width / 2 - 270 + i * 110, 100);
      this.dice.push(d);
      this.addChild(d);
    }
    this.rollAllButton = new RollAllButton(
      this.width / 2 - 425,
      125,
      130,
      50,
      "Neu Würfeln",
      this.dice
    );
    this.addChild(this.rollAllButton);
    //Tabelle erzeugen
    this.tabel = new Tabel(100, 210, players, this.dice, this.rollAllButton);
    this.addChild(this.tabel);
  }
}
