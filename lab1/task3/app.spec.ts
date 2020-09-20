import { Point } from './point';
import * as app from './app';

describe("push_point", () => {
    test("it should successfully push_back instance", () => {
        const input: Point[] = [
            { name: "A", x: 1, y: 0 },
            { name: "B", x: 2, y: 3 }
        ];
        const output: Point[] = [
            { name: "A", x: 1, y: 0 },
            { name: "B", x: 2, y: 3 },
            { name: "C", x: 0, y: 0 }
        ];
        app.push_point(input, "C", 0, 0);
        expect(input).toEqual(output);
    });
});

describe("push_point", () => {
    test("it should fail push_back instance as instance already exists", () => {
        const input: Point[] = [
            { name: "A", x: 1, y: 0 },
            { name: "B", x: 2, y: 3 }
        ];

        expect(app.push_point(input, "A", 1, 0)).toEqual(undefined);
    });
});

describe("get_point", () => {
    test("it should pass get instance", () => {
        const input: Point[] = [
            { name: "A", x: 1, y: 0 },
            { name: "B", x: 2, y: 3 }
        ];
        const output: Point = { name: "A", x: 1, y: 0 };

        expect(app.get_point(input, "A")).toEqual(output);
    });
});

describe("get_point", () => {
    test("it should fail get instance as instance not found", () => {
        const input: Point[] = [
            { name: "A", x: 1, y: 0 },
            { name: "B", x: 2, y: 3 }
        ];

        expect(app.get_point(input, "C")).toEqual(null);
    });
});

describe("get_point", () => {
    test("it should pass get instance with empty array ", () => {
        const input: Point[] = [];

        expect(app.get_point(input, "A")).toEqual(null);
    });
});

describe("update_point", () => {
    test("it should pass update instance", () => {
        const input: Point[] = [
            { name: "A", x: 1, y: 0 },
            { name: "B", x: 2, y: 3 }
        ];
        const output: Point[] = [
            { name: "A", x: 1, y: 0 },
            { name: "B", x: 4, y: 5 }
        ];
        app.update_point(input, "B", 4, 5);
        expect(input).toEqual(output);
    });
});

describe("delete_point", () => {
    test("it should pass delete instance", () => {
        const input: Point[] = [
            { name: "A", x: 1, y: 0 },
            { name: "B", x: 2, y: 3 }
        ];
        const output: Point[] = [
            { name: "A", x: 1, y: 0 }
        ];
        app.delete_point(input, "B");
        expect(input).toEqual(output);
    });
});

describe("delete_point", () => {
    test("it should pass delete instance with empty array", () => {
        const input: Point[] = [];
        expect(app.delete_point(input, "B")).toEqual(undefined);
    });
});

describe("delete_point", () => {
    test("it should pass delete instance when instance not exists", () => {
        const input: Point[] = [
            { name: "A", x: 1, y: 0 }
        ];
        expect(app.delete_point(input, "B")).toEqual(undefined);
    });
});

describe("calc_dist", () => {
    test("it should pass calculation routine", () => {
        const p1: Point = { name: "A", x: 6, y: 9 };
        const p2: Point = { name: "A", x: 3, y: 5 };

        expect(app.calc_dist(p1, p2)).toEqual(5);
    });
});

describe("two_distant", () => {
    test("it should pass calculation routine", () => {
        const input: Point[] = [
            { name: "A", x: 1, y: 10 },
            { name: "B", x: 2, y: 3 },
            { name: "C", x: 8, y: 3 },
            { name: "D", x: 2, y: 3 }
        ];
        const output: Point[] = [
            { name: "A", x: 1, y: 10 },
            { name: "C", x: 8, y: 3 }
        ];

        expect(app.two_distant(input)).toEqual(output);
    });
});

describe("two_distant", () => {
    test("it should pass with empty array", () => {
        const input: Point[] = [];
        const output: Point[] = [];

        expect(app.two_distant(input)).toEqual(output);
    });
});

describe("filter_by_max_dist", () => {
    test("it should pass calculation routine", () => {
        const input: Point[] = [
            { name: "A", x: 1, y: 10 },
            { name: "B", x: 1, y: 3 },
            { name: "C", x: 8, y: 3 },
            { name: "D", x: 2, y: 3 }
        ];
        const output: Point[] = [
            { name: "B", x: 1, y: 3 },
            { name: "D", x: 2, y: 3 }
        ];
        const p: Point = { name: "OX", x: 0, y: 0 };

        expect(app.filter_by_max_dist(input, p, 4)).toEqual(output);
    });
});

describe("filter_by_max_dist", () => {
    test("it should pass with empty array", () => {
        const input: Point[] = [];
        const output: Point[] = [];
        const p: Point = { name: "OX", x: 0, y: 0 };

        expect(app.filter_by_max_dist(input, p, 3)).toEqual(output);
    });
});

describe("above_x", () => {
    test("it should pass filtering routine", () => {
        const input: Point[] = [
            { name: "A", x: 1, y: 10 },
            { name: "B", x: 1, y: -3 },
            { name: "C", x: 8, y: 3 },
            { name: "D", x: 2, y: -3 }
        ];
        const output: Point[] = [
            { name: "A", x: 1, y: 10 },
            { name: "C", x: 8, y: 3 },
        ];

        expect(app.above_x(input)).toEqual(output);
    });
});

describe("above_x", () => {
    test("it should pass result with empty array as no points were found", () => {
        const input: Point[] = [
            { name: "A", x: 1, y: -10 },
            { name: "B", x: 1, y: -3 },
            { name: "C", x: 8, y: -3 },
            { name: "D", x: 2, y: -3 }
        ];
        const output: Point[] = [];

        expect(app.above_x(input)).toEqual(output);
    });
});

describe("above_x", () => {
    test("it should pass with empty array", () => {
        const input: Point[] = [];
        const output: Point[] = [];

        expect(app.above_x(input)).toEqual(output);
    });
});

describe("below_x", () => {
    test("it should pass filtering routine", () => {
        const input: Point[] = [
            { name: "A", x: 1, y: -10 },
            { name: "B", x: 1, y: 3 },
            { name: "C", x: 8, y: -3 },
            { name: "D", x: 2, y: 3 }
        ];
        const output: Point[] = [
            { name: "A", x: 1, y: -10 },
            { name: "C", x: 8, y: -3 },
        ];

        expect(app.below_x(input)).toEqual(output);
    });
});

describe("below_x", () => {
    test("it should pass result with empty array as no points were found", () => {
        const input: Point[] = [
            { name: "A", x: 1, y: 10 },
            { name: "B", x: 1, y: 3 },
            { name: "C", x: 8, y: 3 },
            { name: "D", x: 2, y: 3 }
        ];
        const output: Point[] = [];

        expect(app.below_x(input)).toEqual(output);
    });
});

describe("below_x", () => {
    test("it should pass with empty array", () => {
        const input: Point[] = [];
        const output: Point[] = [];

        expect(app.below_x(input)).toEqual(output);
    });
});

describe("left_y", () => {
    test("it should pass filtering routine", () => {
        const input: Point[] = [
            { name: "A", x: -1, y: 10 },
            { name: "B", x: 1, y: -3 },
            { name: "C", x: -8, y: 3 },
            { name: "D", x: 2, y: -3 }
        ];
        const output: Point[] = [
            { name: "A", x: -1, y: 10 },
            { name: "C", x: -8, y: 3 },
        ];

        expect(app.left_y(input)).toEqual(output);
    });
});

describe("left_y", () => {
    test("it should pass result with empty array as no points were found", () => {
        const input: Point[] = [
            { name: "A", x: 1, y: -10 },
            { name: "B", x: 1, y: -3 },
            { name: "C", x: 8, y: -3 },
            { name: "D", x: 2, y: -3 }
        ];
        const output: Point[] = [];

        expect(app.left_y(input)).toEqual(output);
    });
});

describe("left_y", () => {
    test("it should pass with empty array", () => {
        const input: Point[] = [];
        const output: Point[] = [];

        expect(app.left_y(input)).toEqual(output);
    });
});

describe("right_y", () => {
    test("it should pass filtering routine", () => {
        const input: Point[] = [
            { name: "A", x: 1, y: 10 },
            { name: "B", x: -1, y: -3 },
            { name: "C", x: 8, y: 3 },
            { name: "D", x: -2, y: -3 }
        ];
        const output: Point[] = [
            { name: "A", x: 1, y: 10 },
            { name: "C", x: 8, y: 3 },
        ];

        expect(app.right_y(input)).toEqual(output);
    });
});

describe("right_y", () => {
    test("it should pass result with empty array as no points were found", () => {
        const input: Point[] = [
            { name: "A", x: -1, y: 10 },
            { name: "B", x: -1, y: 3 },
            { name: "C", x: -8, y: 3 },
            { name: "D", x: -2, y: 3 }
        ];
        const output: Point[] = [];

        expect(app.right_y(input)).toEqual(output);
    });
});

describe("right_y", () => {
    test("it should pass with empty array", () => {
        const input: Point[] = [];
        const output: Point[] = [];

        expect(app.right_y(input)).toEqual(output);
    });
});

describe("inside_rect", () => {
    test("point is inside rect", () => {
        const rect: Point[] = [
            { name: "A", x: 0, y: 0 },
            { name: "B", x: 4, y: 4 },
        ];
        const p: Point = { name: "P", x: 1, y: 1 };

        expect(app.inside_rect(p, rect)).toEqual(true);
    });
});

describe("inside_rect", () => {
    test("point is outside rect", () => {
        const rect: Point[] = [
            { name: "A", x: 0, y: 0 },
            { name: "B", x: 4, y: 4 },
        ];
        const p: Point = { name: "P", x: 5, y: 2 };

        expect(app.inside_rect(p, rect)).toEqual(false);
    });
});

describe("inside_rect_area", () => {
    test("it should pass filtering routine", () => {
        const input: Point[] = [
            { name: "A", x: 1, y: 10 },
            { name: "B", x: 2, y: 3 },
            { name: "C", x: 0, y: 1 },
            { name: "D", x: 2, y: 0 }
        ];
        const rect: Point[] = [
            { name: "A", x: 1, y: 1 },
            { name: "B", x: 4, y: 4 },
        ];
        const output: Point[] = [
            { name: "B", x: 2, y: 3 },
        ];

        expect(app.inside_rect_area(input, rect)).toEqual(output);
    });
});

describe("inside_rect_area", () => {
    test("it should fail as rect is empty", () => {
        const input: Point[] = [
            { name: "A", x: 1, y: 10 },
            { name: "B", x: 2, y: 3 },
            { name: "C", x: 0, y: 1 },
            { name: "D", x: 2, y: 0 }
        ];
        const rect: Point[] = [];

        expect(app.inside_rect_area(input, rect)).toEqual(null);
    });
});

describe("inside_rect_area", () => {
    test("it should pass with empty array", () => {
        const input: Point[] = [];
        const rect: Point[] = [
            { name: "A", x: 1, y: 1 },
            { name: "B", x: 4, y: 4 },
        ];
        const output: Point[] = [];

        expect(app.inside_rect_area(input, rect)).toEqual(output);
    });
});