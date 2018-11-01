
import { TLRectObject } from './rectObject';
import 'p5';

export class RectObstacle extends TLRectObject {

    constructor(tlX: number, tlY: number, width: number, height: number, 
                public fillColor?: p5.Color, 
                public strokeColor?: p5.Color) {
        super(tlX, tlY, width, height);
    }

    draw(p: p5) {
        p.push();

        if (this.strokeColor) { p.stroke(this.strokeColor)}
        else                  { p.noStroke(); }

        if (this.fillColor) { p.fill(this.fillColor)}
        else                { p.noFill(); }

        p.rectMode(p.CENTER);
        p.rect(this.ctrX, this.ctrY, this.width, this.height);
        p.pop();
    }

}