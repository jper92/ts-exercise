import { processClaims } from "./recursiveExample";
import { claimers, insurers } from "./inputData";

describe("Calculate claim insurers tests for recursive function", () => {
  it("should return the correct result", () => {
    expect(processClaims(claimers, insurers)).toEqual({
      1: [1],
      2: [1, 2],
      3: [2, 3],
    });
  });
});
