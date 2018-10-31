import 'p5'
import { Dragon, Direction } from './dragon'

require('p5/lib/addons/p5.sound')
//require('p5/lib/addons/p5.dom')


var sketch = function (p: p5) {
  
  const USEDKEYCODES = [p.LEFT_ARROW, p.RIGHT_ARROW, p.UP_ARROW, p.DOWN_ARROW]
  let keysDown = {}

  let dragon: Dragon

  function getKeyDirection(): Direction {

    let hasRight = keysDown[p.RIGHT_ARROW] && !keysDown[p.LEFT_ARROW]
    let hasLeft  = keysDown[p.LEFT_ARROW] && !keysDown[p.RIGHT_ARROW]
    let hasUp    = keysDown[p.UP_ARROW] && !keysDown[p.DOWN_ARROW]
    let hasDown  = keysDown[p.DOWN_ARROW] && !keysDown[p.UP_ARROW]

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

    dragon = new Dragon(p.windowWidth / 2, p.windowHeight / 2, 100, Direction.Up);
  }

  p.draw = function () {

    p.background(100);
    dragon.draw(p);
    
    if(p.keyIsPressed) {
      dragon.move(getKeyDirection(), 10);
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
