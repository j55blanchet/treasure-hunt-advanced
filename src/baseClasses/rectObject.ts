

export class CtrRectObject {

    constructor(public ctrX: number, public ctrY: number, 
                public width: number, public height: number) {
    }

    get minX(): number {
        return this.ctrX - this.width / 2;
    }
    get minY(): number {
        return this.ctrY - this.height / 2;
    }
    get maxX(): number {
        return this.ctrX + this.width / 2;
    }
    get maxY(): number {
        return this.ctrY + this.height / 2;
    }

    overlapsWith(other: CtrRectObject) {
        return !(this.minX > other.maxX || 
                 this.maxX < other.minX ||
                 this.minY > other.maxY || 
                 this.maxY < other.minY)

    }
}

export class TLRectObject extends CtrRectObject {
    constructor(tlX: number, tlY: number, width: number, height: number) {
        super(tlX + width / 2, tlY + height / 2, width, height);
    }
}