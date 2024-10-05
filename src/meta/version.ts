import * as semver from "semver";
import { architecture, channel, payload } from ".";

namespace Version {
  export async function parse(version: string): Promise<semver.SemVer> {
    if (version === "latest") return await determine();
    else return fixed(version);
  }

  async function fixed(version: string): Promise<semver.SemVer> {
    const result = semver.parse(version);
    if (!result) throw new Error(`Invalid version: ${version}`);
    return result;
  }

  async function determine(): Promise<semver.SemVer> {
    const data = await payload;
    const releases = await data.releases;
    const latestVersion = releases
      .filter((release) => release.channel === channel)
      .filter((release) => release.architecture === architecture)
      .sort((a, b) => semver.rcompare(a.version, b.version))[0].version;
    if (!latestVersion) throw new Error("Could not determine latest version");
    return latestVersion;
  }
}

export { Version };
