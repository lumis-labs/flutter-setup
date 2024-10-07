import { Channel } from "@/meta/channel";

describe("Channel", () => {
  it("should parse stable", () => {
    expect(Channel.parse("stable")).toEqual(Channel.Stable);
  });
  it("should parse beta", () => {
    expect(Channel.parse("beta")).toEqual(Channel.Beta);
  });
  it("should parse dev", () => {
    expect(Channel.parse("dev")).toEqual(Channel.Dev);
  });
  it("should fail for invalid", () => {
    expect(() => Channel.parse("foo")).toThrow();
  });
});
