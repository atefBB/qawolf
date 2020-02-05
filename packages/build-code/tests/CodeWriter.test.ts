import { CodeWriter, CodeWriterOptions } from "../src/CodeWriter";
import { outputFile, pathExists, readFile } from "fs-extra";
import { buildInitialCode } from "../src/buildInitialCode";
import { CREATE_CODE_SYMBOL, CodeUpdater } from "../src/CodeUpdater";

jest.mock("fs-extra");

jest.mock("../src/CodeUpdater");

const mockedPathExists = pathExists as jest.Mock<Promise<boolean>>;
const mockedReadFile = readFile as jest.Mock<Promise<string | number | Buffer>>;
const mockedOutputFile = outputFile as jest.Mock<Promise<void>>;

const options: CodeWriterOptions = {
  codePath: "/path/to/mytest.test.js",
  isTest: true,
  name: "mytest",
  url: "http://localhost:3000"
};

describe("CodeWriter._createInitialCode", () => {
  describe("no existing code", () => {
    it("writes initial code", async () => {
      mockedOutputFile.mockClear();
      mockedPathExists.mockResolvedValue(false);

      const writer = await CodeWriter.start(options);
      expect(mockedOutputFile.mock.calls[0]).toEqual([
        options.codePath,
        buildInitialCode({
          ...options,
          createCodeSymbol: CREATE_CODE_SYMBOL
        }),
        "utf8"
      ]);
    });
  });

  describe("existing code", () => {
    it("does not write initial code", async () => {
      mockedOutputFile.mockClear();
      mockedPathExists.mockResolvedValue(true);

      const writer = await CodeWriter.start(options);
      expect(mockedOutputFile.mock.calls.length).toEqual(0);
    });

    it("inserts the create symbol for scripts", () => {
      // TODO
    });

    it("inserts the create symbol for tests", () => {
      // TODO
    });
  });
});

describe("CodeWriter._loadUpdatableCode", () => {
  it("logs when the create symbol is not found", async () => {
    mockedReadFile.mockResolvedValue("no code");

    const writer = await CodeWriter.start(options);

    const consoleSpy = jest.spyOn(global.console, "log").mockImplementation();
    await writer._loadUpdatableCode();

    expect(consoleSpy.mock.calls[0]).toEqual([
      "[1m[31mCannot update code without this line:[22m[39m",
      CREATE_CODE_SYMBOL
    ]);

    consoleSpy.mockRestore();
  });
});

describe("CodeWriter._updateCode", () => {
  it("writes updates code", async () => {
    const writer = await CodeWriter.start(options);

    // make it updatable
    // - there is code
    mockedReadFile.mockResolvedValue(CREATE_CODE_SYMBOL);
    // - the code has an update symbol
    (CodeUpdater.hasCreateSymbol as jest.Mock).mockReturnValue(true);
    // - there are pending steps
    (writer._updater.getNumPendingSteps as jest.Mock<number>).mockReturnValue(
      1
    );

    // mock what the updated code should be
    let expected = "SOME UPDATED CODE";
    (writer._updater.updateCode as jest.Mock).mockReturnValue(expected);
    mockedOutputFile.mockClear();

    // run the update
    await writer._updateCode();

    expect(mockedOutputFile.mock.calls[0]).toEqual([
      options.codePath,
      expected,
      "utf8"
    ]);
  });

  it("updates selectors", () => {
    // TODO
  });
});

describe("CodeWriter.discard", () => {
  it("restores the existing code", () => {
    // TODO
  });

  it("deletes the file if there was not existing code", () => {
    // TODO
  });
});

describe("CodeWriter.save", () => {
  it("includes non-final steps", () => {
    // TODO
  });

  it("removes the CREATE_CODE_SYMBOL", () => {
    // TODO
  });
});
