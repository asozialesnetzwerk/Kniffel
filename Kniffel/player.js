export default class Player {
  constructor(name) {
    // console.log("Spieler sind da");
    this.name = name;
    this.score = {
      einser: -1,
      zweier: -1,
      dreier: -1,
      vierer: -1,
      fünfer: -1,
      sechser: -1,
      topScore: 0,
      bonus: 0,
      dreipasch: -1,
      vierpasch: -1,
      fullHouse: -1,
      smallStreet: -1,
      bigStreet: -1,
      kniffel: -1,
      chance: -1,
      bottomScore: 0,
      total: 0,
    };
    this.scoreNames = [
      "Einser",
      "Zweier",
      "Dreier",
      "Vierer",
      "Fünfer",
      "Sechser",
      "Summe Oben",
      "Bonus",
      "Dreierpasch",
      "Viererpasch",
      "Full House",
      "Kleine Straße",
      "Große Straße",
      "Kniffel",
      "Chance",
      "Summe Unten",
      "Total",
    ];
  }
  setScore(id, score) {
    if (this.score.hasOwnProperty(id)) {
      this.score[id] = score;
    } else {
      console.log(
        "Dieses Scorefeld gibt es nicht: " +
          id +
          " und deshalb kann kein Score eingetragen werden"
      );
    }
    this.addAllScoresTogether();
  }
  getScore(id) {
    if (this.score.hasOwnProperty(id)) {
      return this.score[id];
    }
    console.log(
      "Dieses Scorefeld gibt es nicht: " +
        id +
        " und konnte deshalb nicht eingelesen werden"
    );
  }
  getScores() {
    let result = [];
    for (let i in this.score) {
      if (this.score[i] != -1) {
        result.push(this.score[i]);
      } else {
        result.push("-");
      }
    }
    return result;
  }
  addAllScoresTogether() {
    this.score.total = 0;
    let top = this.addTopScoresTogether();
    let bottom = this.addBottomScoresTogether();
    this.score.total = top + bottom + this.score.bonus;
    return this.score.total;
  }
  addTopScoresTogether() {
    this.score.topScore = 0;
    for (let i in this.score) {
      if (this.score[i] > 0) {
        this.score.topScore += this.score[i];
      }
      if (i === "sechser") {
        break;
      }
    }
    if (this.score.topScore >= 63) this.score.bonus = 35;
    return this.score.topScore;
  }
  addBottomScoresTogether() {
    this.score.bottomScore = 0;
    let start = false;
    for (let i in this.score) {
      if (start === false) {
        if (i === "bonus") start = true;
        continue;
      }
      if (this.score[i] > 0) {
        this.score.bottomScore += this.score[i];
      }
      if (i === "chance") break;
    }
    return this.score.bottomScore;
  }
  resetScore() {
    this.score = {
      einser: -1,
      zweier: -1,
      dreier: -1,
      vierer: -1,
      fünfer: -1,
      sechser: -1,
      topScore: 0,
      bonus: 0,
      dreipasch: -1,
      vierpasch: -1,
      fullHouse: -1,
      smallStreet: -1,
      bigStreet: -1,
      kniffel: -1,
      chance: -1,
      bottomScore: 0,
      total: 0,
    };
  }
}
