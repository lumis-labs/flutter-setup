import { Version } from "@/meta/version";

describe("Version", () => {
  it("should parse latest", () => {
    expect(Version.parse("latest")).toEqual(Version.parse("0.0.0")!);
  });
  it("should parse semver", () => {
    expect(Version.parse("1.0.0")).toEqual(Version.parse("1.0.0")!);
  });
  it("should fail for invalid", () => {
    expect(() => Version.parse("foo")).toThrow();
  });
});
