import { Os } from "@/meta/os";

describe("Os", () => {
  it("should parse ubuntu", () => {
    expect(Os.parse("ubuntu")).toEqual(Os.Linux);
  });
  it("should parse macos", () => {
    expect(Os.parse("macos")).toEqual(Os.MacOS);
  });
  it("should parse windows", () => {
    expect(Os.parse("windows")).toEqual(Os.Windows);
  });
});
