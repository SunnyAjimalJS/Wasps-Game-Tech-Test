/* # Wasp Game 

You may only use JS / CSS / HTML for this task and no frameworks or libraries. You can use sessions. The whole program should be written in one single file and may be either procedural or object oriented. It should be possible to place the file anywhere within a website and for it to be run in a browser. 

Create a simple text only game with a single button that hits a random wasp from a nest of wasps. Each time the button is pressed, a wasp is hit and its points reduced. Once its points have gone to zero the wasp dies and cannot be hit again. The screen shows the state of all the wasps after each hit. 
The game is over when all wasps have died. You should be able to start a new game once the game is over. 
You should be able to solve this in under 150 lines including comments and any more than that is a sign you have over complicated the problem. You can use basic html and css to tidy up the output, but the solution should be simple text and a button rather than any styled UI. 

You start the game with the following wasps. 

## 1 x Queen ­ 
* 80 Hit Points ­ 
* Loses 7 hit points every time it is hit ­ 
* All wasps die if the queen is killed 

## 5 x Worker wasps ­ 
* Each one starts with 68 hit points ­ 
* Each one Loses 10 hit points each time it is hit 

## 8 x Drone wasps ­ 
* Each starts with 60 hit points ­ 
* Each loses 12 hit points each time it is hit.  */

class Wasp {
  hitPoints = 0;
  defense = 7;
  killsWholeHiveWhenDead = false;

  constructor(id) {
    this.id = id;
  }

  attackWasp() {
    if (!this.isDead()) this.hitPoints -= this.defense;
    if (this.hitPoints < 0) this.hitPoints = 0;
  }

  isDead = () => this.hitPoints <= 0;

  getWaspClass() {
    if (this.hitPoints <= 10) return "nearly-dead";
    if (this.hitPoints <= 50) return "taking-damage";
    return "healthy";
  }

  getHTML() {
    return `<div class="wasp ${this.getWaspClass()}">
    <p><strong>${this.constructor.name}</strong></p>
    <p>${this.hitPoints}</p>
  </div>`;
  }
}

class Queen extends Wasp {
  hitPoints = 80;
  defense = 7;
  killsWholeHiveWhenDead = true;
}

class Worker extends Wasp {
  hitPoints = 68;
  defense = 10;
}

class Drone extends Wasp {
  hitPoints = 60;
  defense = 12;
}

class Hive {
  wasps = [];
  constructor(htmlID) {
    this.htmlID = htmlID;
    this.addWasps(Queen, 1);
    this.addWasps(Worker, 5);
    this.addWasps(Drone, 8);
    this.showHiveStatus();
  }

  addWasps = (WaspType, number) => {
    for (let index = 0; index < number; index++) {
      let wasp = new WaspType(WaspType.name + "-" + index);
      this.wasps.push(wasp);
    }
  };

  removeWasp = (wasp) => {
    let index = this.wasps.indexOf(wasp);
    this.wasps.splice(index, 1);
    if (wasp.killsWholeHiveWhenDead) this.wasps = [];
  };

  findRandomWasp = () => {
    let randomWaspIndex = Math.floor(Math.random() * this.wasps.length);
    return this.wasps[randomWaspIndex];
  };

  showHiveStatus = () => {
    let htmlHive = document.getElementById(this.htmlID);
    htmlHive.innerHTML = "";
    this.wasps.forEach((wasp) => (htmlHive.innerHTML += wasp.getHTML()));
  };

  attackWasp = () => {
    let targetWasp = this.findRandomWasp();
    targetWasp.attackWasp();
    if (targetWasp.isDead()) this.removeWasp(targetWasp);
    this.showHiveStatus();
    if (this.wasps.length == 0) {
      alert("Game Over");
      newGame();
    }
  };
}

const newGame = () => (hive = new Hive("hive"));
const hive = new Hive("hive");
