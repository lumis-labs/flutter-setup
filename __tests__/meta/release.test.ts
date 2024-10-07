import { Architecture, Channel, Release } from "@/meta";

describe("Release", () => {
  it("parses happily", () => {
    const hash = "2663184aa79047d0a33a14a3b607954f8fdd8730";
    const channel = "stable";
    const version = "3.24.3";
    const dartSdkVersion = "3.5.3";
    const dartSdkArch = "x64";
    const releaseDate = "2024-09-12";
    const archive = "stable/macos/flutter_macos_3.24.3-stable.zip";
    const sha256 =
      "c7947ac3162acc580d9ba55d16ce4a3e51966f5b8799bf0344f455e8ec3df242";

    const payload = {
      hash,
      channel,
      version,
      dartSdkVersion,
      dartSdkArch,
      releaseDate,
      archive,
      sha256,
    };

    const expected = Release.parse(payload);
    expect(expected.architecture).toEqual(Architecture.X64);
    expect(expected.channel).toEqual(Channel.Stable);
    expect(expected.version.toString()).toEqual(version);
    expect(expected.hash).toEqual(hash);
    expect(expected.archive).toEqual(archive);
  });

  it("should parse if architecture is missing", () => {
    const hash = "262b70ece1aebf84f132c51ec4cf90be605ce61b";
    const channel = "beta";
    const version = "2.8.0-3.3.pre";
    const release_date = "2021-12-01T23:16:13.982758Z";
    const archive = "beta/macos/flutter_macos_2.8.0-3.3.pre-beta.zip";
    const sha256 =
      "05230e952864bccd81c403bc6e487ac671914168615c3e9260fa5e60a72d9c32";

    const payload = {
      hash,
      channel,
      version,
      release_date,
      archive,
      sha256,
    };

    const expected = Release.parse(payload);
    expect(expected.architecture).toEqual(Architecture.X64);
    expect(expected.channel).toEqual(Channel.Beta);
    expect(expected.version.toString()).toEqual(version);
    expect(expected.hash).toEqual(hash);
    expect(expected.archive).toEqual(archive);
  });

  it("should fail for invalid", () => {
    expect(() => Release.parse({})).toThrow();
  });
});
