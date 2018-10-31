import 'p5'

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

export class Dragon {
    static readonly FLAPS_PER_SECOND = 2.5;
    static sprites: Array<p5.Image>

    private currentSpriteIndex = 0;
    private lastFlap = new Date().getTime();

    constructor(
        public x, 
        public y,
        public diameter,
        public prevDirection: Direction) {
    }

    draw(p: p5) {
        p.push();
        p.translate(this.x, this.y);
        p.angleMode(p.DEGREES);
        switch(this.prevDirection) {
            case Direction.Right:
                break;
            case Direction.DownRight:
                p.rotate(45)
                break
            case Direction.Down:
                p.rotate(90)
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
        
        let scaleFactor = p.min(this.diameter / image.width, 
                                this.diameter / image.height);

        p.image(image, 0, 0, image.width * scaleFactor, image.height * scaleFactor);

        p.pop();
    }

    move(direction, pixels) {
        let diagComponentPixels = pixels / Math.SQRT2;
        switch (direction) {
            case Direction.Right:
                this.x += pixels
                break
            case Direction.DownRight:
                this.x += diagComponentPixels
                this.y += diagComponentPixels
                break
            case Direction.Down:
                this.y += pixels
                break
            case Direction.DownLeft:
                this.y += diagComponentPixels
                this.x -= diagComponentPixels
                break
            case Direction.Left:
                this.x -= pixels
                break
            case Direction.UpLeft:
                this.x -= diagComponentPixels
                this.y -= diagComponentPixels
                break
            case Direction.Up:
                this.y -= pixels
                break;
            case Direction.UpRight:
                this.x += diagComponentPixels
                this.y -= diagComponentPixels
                break
            default:
                return
        }
        this.prevDirection = direction;
    }

    public static loadSprites(p: p5) {
        const FRAME_1 = require("./frame-1.png").default
        const FRAME_2 = require('./frame-2.png').default
        const FRAME_3 = require('./frame-3.png').default
        const FRAME_4 = require('./frame-4.png').default

        Dragon.sprites = [
            p.loadImage(FRAME_1),
            p.loadImage(FRAME_2),
            p.loadImage(FRAME_3),
            p.loadImage(FRAME_4)
        ]
    }
}