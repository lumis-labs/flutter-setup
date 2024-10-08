import { Architecture, Channel, Release } from "@/meta";

jest.mock("@actions/core", () => ({
  getInput: jest.fn((name) => {
    switch (name) {
      case "os":
        return "macos-latest";
      case "channel":
        return "stable";
      case "architecture":
        return "x64";
      case "version":
        return "3.24.3";
      default:
        throw new Error(`Unexpected input: ${name}`);
    }
  }),
}));

describe("Release", () => {
  it("parses happily", () => {
    const expected = Release.parse({
      hash: "2663184aa79047d0a33a14a3b607954f8fdd8730",
      channel: "stable",
      version: "3.24.3",
      dartSdkVersion: "3.5.3",
      dartSdkArch: "x64",
      releaseDate: "2024-09-12",
      archive: "stable/macos/flutter_macos_3.24.3-stable.zip",
      sha256:
        "c7947ac3162acc580d9ba55d16ce4a3e51966f5b8799bf0344f455e8ec3df242",
    });

    expect(expected.architecture).toEqual(Architecture.X64);
    expect(expected.channel).toEqual(Channel.Stable);
    expect(expected.version.toString()).toEqual("3.24.3");
    expect(expected.hash).toEqual("2663184aa79047d0a33a14a3b607954f8fdd8730");
    expect(expected.archive).toEqual(
      "stable/macos/flutter_macos_3.24.3-stable.zip"
    );
  });
});
