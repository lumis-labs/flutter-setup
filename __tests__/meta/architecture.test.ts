import { Architecture } from "@/meta/architecture";

describe("Architecture", () => {
  it("should parse x64", () => {
    expect(Architecture.parse("x64")).toEqual(Architecture.X64);
  });
  it("should parse arm64", () => {
    expect(Architecture.parse("arm64")).toEqual(Architecture.Arm64);
  });
  it("should fail for invalid", () => {
    expect(() => Architecture.parse("foo")).toThrow();
  });
});
