const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this._field = field;
    this._horPos = 0;
    this._verPos = 0;
  }

  // method to print the field for player when called 
  print() {
    for (let i = 0; i < this._field.length ; i++ ){
      console.log(this._field[i].join(" "))
    }
  }

  // method checking each player move is out of boundaries or hit a hole.
  winLoseTest() {
    let ver = this._verPos;
    let hor = this._horPos;
    if (hor >=0 && hor < this._field[0].length && ver >=0 && ver < this._field.length) {
      if (this._field[ver][hor] === hole) {
        console.log("You lost your hat bro'!");
        return true;
      } else if(this._field[ver][hor] === hat) {
        console.log("Congrats! You found your hat!");
        return true;
      } else {
        this._field[ver][hor] = pathCharacter;
        return false;
      }
    } else {
      console.log("You lost your hat bro', get your damn hat back!");
      return true;
    }
  }

  // method to check user direction input.
  userInput() {
    this.print();
    let userInput = prompt('Where to next?').toLowerCase();
    switch (userInput) {
        case "u":
          this._verPos -= 1;
          break;
      case "d":
          this._verPos += 1;
          break;
      case "l":
          this._horPos -= 1;
          break;
      case "r":
          this._horPos += 1;
          break;
      default:
        console.log("**Wrong key input!!** \n Please use 'r' -> move right \n Please use 'u' -> move up \n Please use 'l' -> move left \n Please use 'd' -> move down");
        break;
      }
      return this.winLoseTest();
  }

  // method to call the game to start
  play() {
    this.setPlayerAndHatRandom();
    while(this.userInput() === false) { 
    }
  }

  // static method for generating user choice of field length and height
  static generateField(height, length) {
    const newField = [];
    for ( let i = 0 ; i < height ; i++) {
      if(Math.random()*10 <= 7.5 ) {
        newField.push([fieldCharacter]);
      } else {
        newField.push([hole]);
      }
      for (let int = 0; int < length-1; int++ ) {
        if ( Math.random()*10 <= 7.5 ){
          newField[i].push(fieldCharacter);
        } else {
          newField[i].push(hole);
        }
      }
    }
  return newField;
  }

  // method for randomly dropping the hat location and the player location in the map.
  setPlayerAndHatRandom() {
    let ver = Math.floor(Math.random()*this._field.length);
    let hor = Math.floor(Math.random()*this._field[0].length);
    this._horPos = hor;
    this._verPos = ver;
    this._field[ver][hor] = pathCharacter;
    this._field[Math.floor(Math.random()*this._field.length)][Math.floor(Math.random()*this._field[0].length)] = hat;
  }
}

const myField = new Field(Field.generateField(25,30));

myField.play();

