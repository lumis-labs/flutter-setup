import * as semver from "semver";

namespace Version {
  export function parse(version: string): semver.SemVer {
    if (version === "latest") return semver.parse("0.0.0")!;
    const result = semver.parse(version);
    if (!result) throw new Error(`Invalid version: ${version}`);
    return result;
  }
}

export { Version };
