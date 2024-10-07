import { Os } from "@/meta/os";

describe("Os", () => {
  it("should parse ubuntu", () => {
    expect(Os.parse("ubuntu-latest")).toEqual(Os.Linux);
  });
  it("should parse macos", () => {
    expect(Os.parse("macos-latest")).toEqual(Os.MacOS);
  });
  it("should parse windows", () => {
    expect(Os.parse("windows-latest")).toEqual(Os.Windows);
  });
});
