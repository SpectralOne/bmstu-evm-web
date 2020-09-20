import { Student } from './student';
import * as app from './app';

describe("push_student", () => {
    test("it should successfully push_back instance", () => {
        const input: Student[] = [
            { group: "IU7-56", card: "u952", grades: [3, 5, 3] },
            { group: "IU7-52", card: "u962", grades: [2, 2, 3] }
        ];
        const output: Student[] = [
            { group: "IU7-56", card: "u952", grades: [3, 5, 3] },
            { group: "IU7-52", card: "u962", grades: [2, 2, 3] },
            { group: "IU7-53", card: "u922", grades: [4, 2, 2] }
        ];
        app.push_student(input, "IU7-53", "u922", [4, 2, 2]);
        expect(input).toEqual(output);
    });
});

describe("push_student", () => {
    test("it should fail push_back instance as instance already exists", () => {
        const input: Student[] = [
            { group: "IU7-56", card: "u952", grades: [3, 5, 3] },
            { group: "IU7-52", card: "u962", grades: [2, 2, 3] }
        ];

        expect(app.push_student(input, "IU7-35", "u952", [5, 5])).toEqual(undefined);
    });
});

describe("get_student", () => {
    test("it should pass get instance", () => {
        const input: Student[] = [
            { group: "IU7-56", card: "u952", grades: [3, 5, 3] },
            { group: "IU7-52", card: "u962", grades: [2, 2, 3] }
        ];
        const output: Student = { group: "IU7-52", card: "u962", grades: [2, 2, 3] };

        expect(app.get_student(input, "u962")).toEqual(output);
    });
});

describe("get_student", () => {
    test("it should fail get instance as instance not found", () => {
        const input: Student[] = [
            { group: "IU7-56", card: "u952", grades: [3, 5, 3] },
            { group: "IU7-52", card: "u962", grades: [2, 2, 3] }
        ];

        expect(app.get_student(input, "u999")).toEqual(null);
    });
});

describe("get_student", () => {
    test("it should pass get instance with empty array ", () => {
        const input: Student[] = [];

        expect(app.get_student(input, "A")).toEqual(null);
    });
});

describe("update_student", () => {
    test("it should pass update instance", () => {
        const input: Student[] = [
            { group: "IU7-56", card: "u952", grades: [3, 5, 3] },
            { group: "IU7-52", card: "u962", grades: [2, 2, 3] }
        ];
        const output: Student[] = [
            { group: "IU7-56", card: "u952", grades: [4, 5, 5] },
            { group: "IU7-52", card: "u962", grades: [2, 2, 3] }
        ];
        app.update_student(input, "IU7-56", "u952", [4, 5, 5]);
        expect(input).toEqual(output);
    });
});

describe("delete_student", () => {
    test("it should pass delete instance", () => {
        const input: Student[] = [
            { group: "IU7-56", card: "u952", grades: [3, 5, 3] },
            { group: "IU7-52", card: "u962", grades: [2, 2, 3] }
        ];
        const output: Student[] = [
            { group: "IU7-52", card: "u962", grades: [2, 2, 3] }
        ];
        app.delete_student(input, "u952");
        expect(input).toEqual(output);
    });
});

describe("delete_student", () => {
    test("it should pass delete instance with empty array", () => {
        const input: Student[] = [];
        expect(app.delete_student(input, "B")).toEqual(undefined);
    });
});

describe("delete_student", () => {
    test("it should pass delete instance when instance not exists", () => {
        const input: Student[] = [
            { group: "IU7-52", card: "u962", grades: [2, 2, 3] }
        ];
        expect(app.delete_student(input, "u952")).toEqual(undefined);
    });
});

describe("get_average", () => {
    test("it should pass get average routine", () => {
        const input: Student[] = [
            { group: "IU7-52", card: "u962", grades: [1, 2, 3] }
        ];
        expect(app.get_average(input, "u962")).toEqual(2);
    });
});

describe("get_average", () => {
    test("it should fail as instance not found", () => {
        const input: Student[] = [
            { group: "IU7-52", card: "u962", grades: [1, 2, 3] }
        ];
        expect(app.get_average(input, "u952")).toEqual(null);
    });
});

describe("get_average", () => {
    test("it should pass get average routine with empty array", () => {
        const input: Student[] = [];
        expect(app.get_average(input, "u962")).toEqual(null);
    });
});

describe("get_average", () => {
    test("it should fail get average routine as student has no grades", () => {
        const input: Student[] = [
            { group: "IU7-52", card: "u962", grades: [] }
        ];
        expect(app.get_average(input, "u962")).toEqual(null);
    });
});

describe("search_by_group", () => {
    test("it should pass group routine", () => {
        const input: Student[] = [
            { group: "IU7-52", card: "u962", grades: [5, 2, 5] },
            { group: "IU7-53", card: "u942", grades: [2, 4, 3] },
            { group: "IU7-52", card: "u976", grades: [5, 3, 3] }
        ];
        const output: Student[] = [
            { group: "IU7-52", card: "u962", grades: [5, 2, 5] },
            { group: "IU7-52", card: "u976", grades: [5, 3, 3] }
        ];
        expect(app.search_by_group(input, "IU7-52")).toEqual(output);
    });
});

describe("search_by_group", () => {
    test("it should pass with result of empty array as no students found", () => {
        const input: Student[] = [
            { group: "IU7-52", card: "u962", grades: [5, 2, 5] },
            { group: "IU7-53", card: "u942", grades: [2, 4, 3] },
            { group: "IU7-52", card: "u976", grades: [5, 3, 3] }
        ];
        const output: Student[] = [];

        expect(app.search_by_group(input, "IU7-54")).toEqual(output);
    });
});

describe("search_by_group", () => {
    test("it should pass with empty array", () => {
        const input: Student[] = [];
        const output: Student[] = [];

        expect(app.search_by_group(input, "IU7-54")).toEqual(output);
    });
});

describe("most_grades", () => {
    test("it should pass calculation routine", () => {
        const input: Student[] = [
            { group: "IU7-52", card: "u962", grades: [5, 2, 5] },
            { group: "IU7-53", card: "u942", grades: [2, 4, 3, 2] },
            { group: "IU7-52", card: "u976", grades: [5, 3] }
        ];
        const output: Student = { group: "IU7-53", card: "u942", grades: [2, 4, 3, 2] };

        expect(app.most_grades(input)).toEqual(output);
    });
});

describe("most_grades", () => {
    test("it should fail with empty array", () => {
        const input: Student[] = [];
        expect(app.most_grades(input)).toEqual(null);
    });
});

describe("no_grades", () => {
    test("it should pass with empty array", () => {
        const input: Student[] = [];
        const output: Student[] = [];
        expect(app.no_grades(input)).toEqual(output);
    });
});

describe("no_grades", () => {
    test("it should pass with result of an empty array as all students has grades", () => {
        const input: Student[] = [
            { group: "IU7-52", card: "u962", grades: [5, 2, 5] },
            { group: "IU7-53", card: "u942", grades: [2, 4, 3, 2] },
            { group: "IU7-52", card: "u976", grades: [5, 3] }
        ];
        const output: Student[] = [];
        expect(app.no_grades(input)).toEqual(output);
    });
});

describe("no_grades", () => {
    test("it should pass calculating routine", () => {
        const input: Student[] = [
            { group: "IU7-52", card: "u962", grades: [] },
            { group: "IU7-53", card: "u942", grades: [2, 4, 3, 2] },
            { group: "IU7-52", card: "u976", grades: [5, 3] }
        ];
        const output: Student[] = [
            { group: "IU7-52", card: "u962", grades: [] }
        ];
        expect(app.no_grades(input)).toEqual(output);
    });
});
