export class Point {
    constructor(
        private x: number,
        private y: number
    ) { }

    print(): void {
        console.log(`x: ${this.x}, y: ${this.y}`);
    }

    getx(): number {
        return this.x;
    }

    gety(): number {
        return this.y;
    }
}
