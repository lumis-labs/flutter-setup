import * as semver from "semver";
import { Architecture, Channel, Version } from ".";

interface Release {
  hash: string;
  channel: Channel;
  version: semver.SemVer;
  architecture: Architecture;
  archive: string;
}

namespace Release {
  export function parse(json: any): Release {
    return {
      hash: json["hash"],
      channel: Channel.parse(json["channel"]),
      version: Version.parse(json["version"]),
      architecture: Architecture.parse(json["dart_sdk_arch"] ?? "x64"),
      archive: json["archive"],
    };
  }
}

export { Release };
