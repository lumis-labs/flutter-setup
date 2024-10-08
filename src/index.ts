import { SemVer } from "semver";
import {
  Architecture,
  Channel,
  getFlutterMetadata,
  Input,
  Os,
  Release,
} from "./meta";
import { ReleaseNotFoundError } from "./util";

async function getSelectedRelease(
  os: Os,
  architecture: Architecture,
  channel: Channel,
  version?: SemVer
): Promise<Release> {
  if (!version || version.compare("0.0.0") === 0) {
    const data = await getFlutterMetadata(os);
    const release = data
      .filter((release: Release) => release.architecture === architecture)
      .filter((release: Release) => release.channel === channel)
      .sort((a: Release, b: Release) => b.version.compare(a.version));

    if (release.length === 1) return release[0];
    if (release.length > 0) return release[0];
    else throw new ReleaseNotFoundError(os, architecture, channel);
  }

  const data = await getFlutterMetadata(os);
  const release = data
    .filter((release: Release) => release.architecture === architecture)
    .filter((release: Release) => release.channel === channel)
    .filter((release: Release) => release.version.compare(version) === 0)
    .sort((a: Release, b: Release) => b.version.compare(a.version));

  if (release.length === 1) return release[0];
  if (release.length > 0) return release[0];
  else throw new ReleaseNotFoundError(os, architecture, channel, version);
}

async function run() {
  const { os, architecture, channel, version } = Input;
  const release = await getSelectedRelease(os, architecture, channel);
  console.log(release);
}

run();
