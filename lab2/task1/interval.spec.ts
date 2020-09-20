import { Interval } from './interval';
import { Point } from './point';

describe("len", () => {
    test("it should pass len check", () => {
        const start: Point = new Point(0, 0);
        const end: Point = new Point(0, 1);
        const interval: Interval = new Interval(start, end);
        expect(interval.len()).toEqual(1);
    });
});