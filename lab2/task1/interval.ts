import { Point } from './point';

export class Interval {
  constructor(
    private start: Point,
    private end: Point
  ) { }

  print(): void {
    console.log(
      `start: (${this.start.getx()}, ${this.start.gety()})`,
      `end: (${this.end.getx()}, ${this.end.gety()})`);
  }

  len(): number {
    return Math.sqrt((
      Math.pow((this.end.getx() - this.start.getx()), 2) +
      Math.pow((this.end.gety() - this.start.gety()), 2)
    ))
  }
}
