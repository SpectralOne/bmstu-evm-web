module.exports = {
    roots: ["<rootDir>/task1", "<rootDir>/task2", "<rootDir>/task3"],
    testMatch: ["/__tests__//*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
};