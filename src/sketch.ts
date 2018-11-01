import 'p5'
import { Dragon, Direction } from './dragon'
import { RectObstacle } from './baseClasses/rectObstacle'

require('p5/lib/addons/p5.sound')
//require('p5/lib/addons/p5.dom')


var sketch = function (p: p5) {
  let anyP: any = p;
  
  const USEDKEYCODES = [anyP.LEFT_ARROW, anyP.RIGHT_ARROW, anyP.UP_ARROW, anyP.DOWN_ARROW]
  let keysDown = {}

  let dragon: Dragon
  let obstacles: Array<RectObstacle>
  

  function getKeyDirection(): Direction {

    let hasRight = keysDown[anyP.RIGHT_ARROW] && !keysDown[anyP.LEFT_ARROW]
    let hasLeft  = keysDown[anyP.LEFT_ARROW] && !keysDown[anyP.RIGHT_ARROW]
    let hasUp    = keysDown[anyP.UP_ARROW] && !keysDown[anyP.DOWN_ARROW]
    let hasDown  = keysDown[anyP.DOWN_ARROW] && !keysDown[anyP.UP_ARROW]

    if (hasUp && hasRight) {    return Direction.UpRight    }
    if (hasDown && hasRight) {  return Direction.DownRight  }
    if (hasDown && hasLeft){    return Direction.DownLeft   }
    if (hasUp && hasLeft) {     return Direction.UpLeft     }

    if (hasRight) { return Direction.Right }
    if (hasLeft) { return Direction.Left }
    if (hasUp) { return Direction.Up }
    if (hasDown) { return Direction.Down }
    return Direction.None
  }

  p.preload = () => {
    Dragon.loadSprites(p);
  }

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.frameRate(60);

    dragon = new Dragon(p.windowWidth / 2, p.windowHeight / 2, 100, 72, Direction.Left);
    obstacles = [
      new RectObstacle(0, 0, p.windowWidth, 20, p.color(20)),
      new RectObstacle(0, 0, 20, p.windowHeight, p.color(20)),
      new RectObstacle(p.windowWidth - 20, 0, 20, p.windowHeight, p.color(20)),
      new RectObstacle(0, p.windowHeight - 20, p.windowWidth, 20, p.color(20))
    ]
  }

  p.draw = function () {

    p.background(100);

    obstacles.forEach(obs => {
      obs.draw(p);
    })

    dragon.draw(p);
    
    if(p.keyIsPressed) {
      let direction = getKeyDirection();
      dragon.tryMove(direction, 10);

      let isValidMove = true;
      obstacles.forEach(obs => {
        if (obs.overlapsWith(dragon)) {
          isValidMove = false;
        }
      })
      
      if (isValidMove) { dragon.commitMove(); }
      else             { dragon.abortMove(direction, 10);  }
    }
  }

  p.keyPressed = function() {
    if (USEDKEYCODES.indexOf(p.keyCode) !== -1) {
      keysDown[p.keyCode] = true
    }
  }
  p.keyReleased = function() {
    keysDown[p.keyCode] = undefined
  }
}

new p5(sketch)
