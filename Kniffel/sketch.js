import Sprite from "./sprite.js";
import Startscreen from "./startscreen.js";

//World Sprite
let world = new Sprite(0, 0);
world.width = windowWidth;
world.height = windowHeight;
let startScreen = new Startscreen(0, 0);
world.addChild(startScreen);
//startGame();
//Funktionen
function draw() {
  background(200, 200, 200);
  world.display();
  world.mouseHover();
}

window.draw = draw;

function mousePressed() {
  world.mousePressed();
}

window.mousePressed = mousePressed;

function mouseClicked() {
  world.mouseClicked();
}
window.mouseClicked = mouseClicked;

function mouseReleased() {
  world.mouseReleased();
}

window.mouseReleased = mouseReleased;
