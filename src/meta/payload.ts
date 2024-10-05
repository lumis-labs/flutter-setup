import * as semver from "semver";
import {
  architecture,
  Architecture,
  channel,
  Channel,
  Os,
  payload,
  version,
  Version,
} from ".";

interface Release {
  hash: string;
  channel: Channel;
  version: semver.SemVer;
  architecture: Architecture;
  releaseDate: Date;
  archive: string;
}

namespace Release {
  export async function snapshot(): Promise<Release> {
    const data = await payload;
    const releases = await data.releases;
    const release = releases
      .filter((release) => release.channel === channel)
      .filter((release) => release.architecture === architecture)
      .filter(async (release) => release.version === (await version))
      .sort((a, b) => semver.rcompare(a.version, b.version))[0];
    if (!release) throw new Error("Could not find selected release");
    return release;
  }

  export async function parse(release: {
    [key: string]: any;
  }): Promise<Release> {
    return {
      hash: release.hash,
      channel: Channel.parse(release["channel"]),
      version: await Version.parse(release["version"]),
      // dart_sdk_arch is not always present - default to x64
      architecture: Architecture.parse(release["dart_sdk_arch"] ?? "x64"),
      releaseDate: new Date(release["release_date"]),
      archive: release["archive"],
    };
  }
}

interface Payload {
  baseUrl: string;
  releases: Promise<Release[]>;
}

namespace Payload {
  const baseUrl =
    "https://storage.googleapis.com/flutter_infra_release/releases";

  export async function parse(os: Os): Promise<Payload> {
    const response = await fetch(`${baseUrl}/releases_${os}.json`);
    const json = await response.json();
    const releases = await json["releases"].map(Release.parse);
    return {
      baseUrl,
      releases: Promise.all(releases),
    };
  }
}

export { Payload, Release };
