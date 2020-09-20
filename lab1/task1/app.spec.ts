import { Kid } from './kid';
import * as app from './app';

describe("push_kid", () => {
    test("it should pass push_back instance", () => {
        const input: Kid[] = [
            { surname: "A", age: 1 },
            { surname: "B", age: 2 }
        ];
        const output: Kid[] = [
            { surname: "A", age: 1 },
            { surname: "B", age: 2 },
            { surname: "C", age: 3 }
        ];
        app.push_kid(input, "C", 3);
        expect(input).toEqual(output);
    });
});

describe("push_kid", () => {
    test("it should fail push_back instance as instance already exists", () => {
        const input: Kid[] = [
            { surname: "A", age: 1 },
            { surname: "B", age: 2 }
        ];
        const output: Kid[] = [
            { surname: "A", age: 1 },
            { surname: "B", age: 2 },
        ];
        app.push_kid(input, "A", 3);
        expect(input).toEqual(output);
    });
});

describe("get_kid", () => {
    test("it should pass get instance", () => {
        const input: Kid[] = [
            { surname: "A", age: 1 },
            { surname: "B", age: 2 }
        ];
        const output: Kid = { surname: "A", age: 1 };

        expect(app.get_kid(input, "A")).toEqual(output);
    });
});

describe("get_kid", () => {
    test("it should fail get instance as instance not found", () => {
        const input: Kid[] = [
            { surname: "B", age: 1 },
            { surname: "C", age: 2 }
        ];

        expect(app.get_kid(input, "A")).toEqual(null);
    });
});

describe("get_kid", () => {
    test("it should pass get instance with empty array ", () => {
        const input: Kid[] = [];

        expect(app.get_kid(input, "A")).toEqual(null);
    });
});

describe("update_kid", () => {
    test("it should pass update instance", () => {
        const input: Kid[] = [
            { surname: "A", age: 1 },
            { surname: "B", age: 2 }
        ];
        const output: Kid[] = [
            { surname: "A", age: 2 },
            { surname: "B", age: 2 }
        ];
        app.update_kid(input, "A", 2);
        expect(input).toEqual(output);
    });
});

describe("delete_kid", () => {
    test("it should pass delete instance", () => {
        const input: Kid[] = [
            { surname: "A", age: 1 },
            { surname: "B", age: 2 }
        ];
        const output: Kid[] = [
            { surname: "A", age: 1 }
        ];
        app.delete_kid(input, "B");
        expect(input).toEqual(output);
    });
});

describe("delete_kid", () => {
    test("it should pass delete instance with empty array", () => {
        const input: Kid[] = [];
        expect(app.delete_kid(input, "B")).toEqual(undefined);
    });
});

describe("delete_kid", () => {
    test("it should pass delete instance when instance not exists", () => {
        const input: Kid[] = [
            { surname: "A", age: 1 }
        ];
        expect(app.delete_kid(input, "B")).toEqual(undefined);
    });
});

describe("get_average", () => {
    test("it should pass get_average routine", () => {
        const input: Kid[] = [
            { surname: "A", age: 1 },
            { surname: "B", age: 2 },
            { surname: "C", age: 3 }
        ];

        expect(app.get_average(input)).toEqual(2);
    });
});

describe("get_average", () => {
    test("it should fail get_average routine as arr is empty", () => {
        const input: Kid[] = [];

        expect(app.get_average(input)).toEqual(null);
    });
});

describe("get_oldest", () => {
    test("it should pass get_oldest routine", () => {
        const input: Kid[] = [
            { surname: "A", age: 1 },
            { surname: "B", age: 2 },
            { surname: "C", age: 3 }
        ];
        const output: Kid = { surname: "C", age: 3 };
        expect(app.get_oldest(input)).toEqual(output);
    });
});

describe("get_oldest", () => {
    test("it should fail get_oldest routine as arr is empty", () => {
        const input: Kid[] = [];

        expect(app.get_oldest(input)).toEqual(null);
    });
});

describe("get_range", () => {
    test("it should pass get_range routine", () => {
        const input: Kid[] = [
            { surname: "A", age: 1 },
            { surname: "B", age: 2 },
            { surname: "C", age: 3 },
            { surname: "D", age: 4 }
        ];

        const output: Kid[] = [
            { surname: "B", age: 2 },
            { surname: "C", age: 3 },
            { surname: "D", age: 4 }
        ];

        expect(app.get_range(input, 2, 4)).toEqual(output);
    });
});

describe("get_range", () => {
    test("it should pass get_range routine with empty array", () => {
        const input: Kid[] = [];
        const output: Kid[] = [];

        expect(app.get_range(input, 2, 4)).toEqual(output);
    });
});

describe("get_range", () => {
    test("it should pass get_range routine with wrong range", () => {
        const input: Kid[] = [
            { surname: "A", age: 1 },
            { surname: "B", age: 2 },
            { surname: "C", age: 3 },
            { surname: "D", age: 4 }
        ];
        const output: Kid[] = [];

        expect(app.get_range(input, 5, 12)).toEqual(output);
    });
});

describe("surname_starts_with", () => {
    test("it should pass search routine", () => {
        const input: Kid[] = [
            { surname: "surname", age: 1 },
            { surname: "name", age: 12 }
        ];
        const output: Kid[] = [
            { surname: "surname", age: 1 }
        ];

        expect(app.surname_starts_with(input, "s")).toEqual(output);
    });
});

describe("surname_starts_with", () => {
    test("it should pass search routine with empty array", () => {
        const input: Kid[] = [];
        const output: Kid[] = [];

        expect(app.surname_starts_with(input, "s")).toEqual(output);
    });
});

describe("surname_starts_with", () => {
    test("it should fail search routine as string is given instead of char", () => {
        const input: Kid[] = [
            { surname: "surname", age: 1 }
        ];

        expect(app.surname_starts_with(input, "sur")).toEqual(null);
    });
});

describe("surname_starts_with", () => {
    test("it should pass search routine with empty result array as no instances were found", () => {
        const input: Kid[] = [
            { surname: "surname", age: 1 }
        ];
        const output: Kid[] = [];
        expect(app.surname_starts_with(input, "c")).toEqual(output);
    });
});

describe("surname_longest_than", () => {
    test("it should pass search routine", () => {
        const input: Kid[] = [
            { surname: "surname", age: 1 },
            { surname: "nam", age: 12 },
            { surname: "n", age: 3 }
        ];
        const output: Kid[] = [
            { surname: "surname", age: 1 }
        ];
        expect(app.surname_longest_than(input, 3)).toEqual(output);
    });
});

describe("surname_longest_than", () => {
    test("it should fail search routine as no instances were found", () => {
        const input: Kid[] = [
            { surname: "surname", age: 1 },
            { surname: "nam", age: 12 },
            { surname: "n", age: 3 }
        ];
        const output: Kid[] = [];
        expect(app.surname_longest_than(input, 12)).toEqual(output);
    });
});

describe("surname_longest_than", () => {
    test("it should pass search routine with empty array", () => {
        const input: Kid[] = [];
        const output: Kid[] = [];
        expect(app.surname_longest_than(input, 2)).toEqual(output);
    });
});

describe("surname_starts_vowel", () => {
    test("it should pass search routine with empty array", () => {
        const input: Kid[] = [];
        const output: Kid[] = [];
        expect(app.surname_starts_vowel(input)).toEqual(output);
    });
});

describe("surname_starts_vowel", () => {
    test("it should pass search routine", () => {
        const input: Kid[] = [
            { surname: "surname", age: 1 },
            { surname: "Ann", age: 12 },
            { surname: "n", age: 3 }
        ];
        const output: Kid[] = [
            { surname: "Ann", age: 12 }
        ];
        expect(app.surname_starts_vowel(input)).toEqual(output);
    });
});

describe("surname_starts_vowel", () => {
    test("it should pass search routine with empty array as no instances found", () => {
        const input: Kid[] = [
            { surname: "surname", age: 1 },
            { surname: "nan", age: 12 },
            { surname: "n", age: 3 }
        ];
        const output: Kid[] = [];
        expect(app.surname_starts_vowel(input)).toEqual(output);
    });
});
