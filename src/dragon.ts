import 'p5'
import { CtrRectObject } from './baseClasses/rectObject';

export enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
    UpLeft,
    UpRight,
    DownLeft,
    DownRight,
    None
}

function oppositeDirection(dir: Direction) {
    switch (dir){
    case Direction.Down:        return Direction.Up
    case Direction.DownLeft:    return Direction.UpRight
    case Direction.DownRight:   return Direction.UpLeft
    case Direction.Left:        return Direction.Right
    case Direction.Right:       return Direction.Left
    case Direction.Up:          return Direction.Down
    case Direction.UpLeft:      return Direction.DownRight
    case Direction.UpRight:     return Direction.DownLeft

    case Direction.None:        return Direction.None
    }
}

export class Dragon extends CtrRectObject {
    static readonly FLAPS_PER_SECOND = 1;
    static sprites: Array<p5.Image>

    private currentSpriteIndex = 0;
    private lastFlap = new Date().getTime();
    private previousBearing = Direction.None;

    constructor(x, y, width, height, public bearing: Direction) {
            
        super(x, y, width, height);
        this.previousBearing = bearing;
    }

    get minX(): number {
        switch (this.bearing){
            case Direction.Down, Direction.Up: return this.ctrX - this.height / 2
            default: return this.ctrX - this.width / 2
        }
    }
    get maxX(): number {
        switch (this.bearing){
            case Direction.Down, Direction.Up: return this.ctrX + this.height / 2
            default: return this.ctrX + this.width / 2
        }
    }
    get minY(): number {
        switch (this.bearing){
            case Direction.Down, Direction.Up: return this.ctrY - this.width / 2
            default: return this.ctrY - this.height / 2
        }
    }
    get maxY(): number {
        switch (this.bearing){
            case Direction.Down, Direction.Up: return this.ctrY + this.width / 2
            default: return this.ctrY + this.height / 2
        }
    }
    get hitboxWidth(): number {
        switch (this.bearing){
            case Direction.Down, Direction.Up: return this.height;
            default: return this.width;
        }
    } 
    get hitboxHeight(): number {
        switch (this.bearing){
            case Direction.Down, Direction.Up: return this.width;
            default: return this.height;
        }
    }       
    
    draw(p: p5) {
        p.push();

        p.fill(255, 0, 0, 100);
        p.noStroke();
        p.rectMode(p.CORNER);
        p.rect(this.minX, this.minY, this.hitboxWidth, this.hitboxHeight);

        p.translate(this.ctrX, this.ctrY);
        p.angleMode(p.DEGREES);
        switch(this.bearing) {
            case Direction.Right:
                break;
            case Direction.DownRight:
                p.rotate(45)
                break
            case Direction.Down:
                p.rotate(-90)
                p.scale(-1, 1);
                break
            case Direction.DownLeft:
                p.scale(-1.0, 1)
                p.rotate(45)
                break
            case Direction.Left:
                p.scale(-1.0, 1)
                break
            case Direction.UpLeft:
                p.scale(-1.0, 1)
                p.rotate(-45)
                break
            case Direction.Up:
                p.rotate(-90);
                break;
            case Direction.UpRight:
                p.rotate(-45)
                break
        }
        p.imageMode(p.CENTER);

        // Move to next image if it's time
        let curTime = new Date().getTime();
        if (curTime - this.lastFlap > (60 / Dragon.FLAPS_PER_SECOND)) {
            this.lastFlap = curTime;
            this.currentSpriteIndex += 1;
            this.currentSpriteIndex %= Dragon.sprites.length;
        }
        
        let image = Dragon.sprites[this.currentSpriteIndex];
        p.image(image, 0, 0, this.width, this.height);

        p.pop();
    }

    private adjustPostion(direction, pixels) {
        let diagComponentPixels = pixels / Math.SQRT2;
        switch (direction) {
            case Direction.Right:
                this.ctrX += pixels
                break
            case Direction.DownRight:
                this.ctrX += diagComponentPixels
                this.ctrY += diagComponentPixels
                break
            case Direction.Down:
                this.ctrY += pixels
                break
            case Direction.DownLeft:
                this.ctrY += diagComponentPixels
                this.ctrX -= diagComponentPixels
                break
            case Direction.Left:
                this.ctrX -= pixels
                break
            case Direction.UpLeft:
                this.ctrX -= diagComponentPixels
                this.ctrY -= diagComponentPixels
                break
            case Direction.Up:
                this.ctrY -= pixels
                break;
            case Direction.UpRight:
                this.ctrX += diagComponentPixels
                this.ctrY -= diagComponentPixels
                break
            default:
                return
        }
    }

    tryMove(direction, pixels) {
        this.previousBearing = this.bearing;
        this.bearing = direction;
        this.adjustPostion(direction, pixels);
    }

    abortMove(direction, pixels) {
        this.adjustPostion(oppositeDirection(direction), pixels);
        this.bearing = this.previousBearing;
    }

    commitMove() {
    }

    public static loadSprites(p: p5) {
        const FRAME_1 = require("./assets/frame-1.png").default
        const FRAME_2 = require('./assets/frame-2.png').default
        const FRAME_3 = require('./assets/frame-3.png').default
        const FRAME_4 = require('./assets/frame-4.png').default

        Dragon.sprites = [
            p.loadImage(FRAME_1),
            p.loadImage(FRAME_2),
            p.loadImage(FRAME_3),
            p.loadImage(FRAME_4)
        ]
    }
}