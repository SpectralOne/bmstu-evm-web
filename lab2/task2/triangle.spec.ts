import { Triangle } from './triangle';

describe("check", () => {
    test("it should pass triangle check", () => {
        const triangle: Triangle = new Triangle(3, 4, 5);
        expect(triangle.check()).toBeTruthy();
    });
});

describe("check", () => {
    test("it should fail triangle check", () => {
        const triangle: Triangle = new Triangle(5, 4, 10);
        expect(triangle.check()).toBeFalsy();
    });
});

describe("perimeter", () => {
    test("it should pass triangle perimeter calculation", () => {
        const triangle: Triangle = new Triangle(3, 4, 5);
        expect(triangle.perimeter()).toEqual(12);
    });
});

describe("area", () => {
    test("it should pass triangle area calculation", () => {
        const triangle: Triangle = new Triangle(3, 4, 5);
        expect(triangle.area()).toEqual(6);
    });
});

describe("is_right_angled", () => {
    test("tight angled", () => {
        const triangle: Triangle = new Triangle(3, 4, 5);
        expect(triangle.is_right_angled()).toBeTruthy();
    });
});

describe("is_right_angled", () => {
    test("not right angled", () => {
        const triangle: Triangle = new Triangle(3, 3, 3);
        expect(triangle.is_right_angled()).toBeFalsy();
    });
});
