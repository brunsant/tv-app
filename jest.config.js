module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", __dirname],
};
