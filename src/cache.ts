import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as tc from "@actions/tool-cache";

import { SemVer } from "semver";
import { Architecture, Channel, getFlutterMetadata, Os, Release } from "./meta";
import { ReleaseNotFoundError } from "./util";

const cacheRequested = core.getInput("cache") === "true";

function findCache(
  os: Os,
  architecture: Architecture,
  version: SemVer
): string | undefined {
  const cache = tc.find(`flutter_${os}`, version.raw, architecture);
  if (cache) return cache;
  return undefined;
}

function isCacheAvailable(
  os: Os,
  architecture: Architecture,
  version: SemVer
): boolean {
  const cache = findCache(os, architecture, version);
  return cache !== undefined;
}

function shouldUseCache(
  os: Os,
  architecture: Architecture,
  version: SemVer
): boolean {
  if (!cacheRequested) return false;
  if (cacheRequested && !isCacheAvailable(os, architecture, version))
    return false;
  return true;
}
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

async function downloadAndCacheTool(
  os: Os,
  architecture: Architecture,
  channel: Channel,
  version: SemVer
): Promise<string> {
  const baseUrl = `https://storage.googleapis.com/flutter_infra_release/releases`;
  const release = await getSelectedRelease(os, architecture, channel, version);

  // download
  core.info(`Downloading Flutter ${version} for ${os} ${architecture}`);
  const downloadPath = await tc.downloadTool(`${baseUrl}/${release.archive}`);

  // extract
  core.info(`Extracting Flutter ${version} for ${os} ${architecture}`);
  const extractPath = await (os === Os.Linux
    ? tc.extractTar(downloadPath, undefined, ["-xv"])
    : tc.extractZip(downloadPath));

  // cache
  core.info(`Caching Flutter ${version} for ${os} ${architecture}`);
  const cache = await tc.cacheDir(
    extractPath,
    `flutter_${os}`,
    version.raw,
    architecture
  );

  return cache;
}

async function getToolPath(
  os: Os,
  architecture: Architecture,
  channel: Channel,
  version: SemVer
): Promise<string> {
  if (shouldUseCache(os, architecture, version)) {
    const cache = findCache(os, architecture, version);
    core.info(`Using cached Flutter ${version} for ${os} ${architecture}`);
    return cache!;
  }

  core.info(`Cache not found for Flutter ${version} for ${os} ${architecture}`);
  core.info(`Attempt to download Flutter ${version} for ${os} ${architecture}`);
  const cache = await downloadAndCacheTool(os, architecture, channel, version);
  core.info(
    `Flutter ${version} for ${os} ${architecture} installed to ${cache}`
  );
  return cache;
}

export async function setupFlutter(
  os: Os,
  architecture: Architecture,
  channel: Channel,
  version: SemVer
) {
  if (version.compare("0.0.0") === 0) {
    const data = await getFlutterMetadata(os);
    const release = data
      .filter((release: Release) => release.architecture === architecture)
      .filter((release: Release) => release.channel === channel)
      .sort((a: Release, b: Release) => b.version.compare(a.version));

    if (release.length === 1) version = release[0].version;
    if (release.length > 0) version = release[0].version;
    else throw new ReleaseNotFoundError(os, architecture, channel);
  }

  const toolPath = await getToolPath(os, architecture, channel, version);
  core.addPath(toolPath + "/flutter/bin");
  exec.exec(`ls -la ${toolPath}`);
}
