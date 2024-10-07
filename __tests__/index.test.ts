import * as meta from "../src/meta";

describe("index", () => {
  it("should work", () => {
    expect(meta.Os.parse("macos-latest")).toEqual(meta.Os.MacOS);
  });
});
