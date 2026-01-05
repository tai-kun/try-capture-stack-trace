import { describe, test } from "vitest";
import ifCaptureStack from "../src/try-capture-stack-trace.js";

describe("Error.captureStackTrace が利用可能な環境の場合", () => {
  test("targetObject に stack プロパティが追加され、スタックトレースが取得できるとき、指定された関数以降のトレースが除外される", ({ expect }) => {
    // Arrange
    const targetObject: { stack?: string } = {};
    const constructorOpt = function InternalConstructor() {};

    // Act
    ifCaptureStack(targetObject, constructorOpt);

    // Assert
    expect(targetObject.stack).toBeTypeOf("string");
    expect(targetObject.stack).not.toContain("InternalConstructor");
  });
});

describe("Error.captureStackTrace が未定義の環境の場合", () => {
  test("Error.captureStackTrace が存在しないとき、targetObject は変更されずエラーも発生しない", ({ expect }) => {
    // Arrange
    const originalCaptureStackTrace = Error.captureStackTrace;
    // @ts-expect-error: テストのために一時的に削除する
    delete Error.captureStackTrace;

    const targetObject: { stack?: string } = {};
    const constructorOpt = () => {};

    try {
      // Act
      ifCaptureStack(targetObject, constructorOpt);

      // Assert
      expect(targetObject).not.toHaveProperty("stack");
    } finally {
      // Cleanup
      Error.captureStackTrace = originalCaptureStackTrace;
    }
  });
});
