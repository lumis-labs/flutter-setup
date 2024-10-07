import * as core from "@actions/core";
import { rcompare, SemVer } from "semver";
import { Architecture, Channel, Os, Release, Version } from "./meta";

const os = Os.parse(core.getInput("os"));
const channel = Channel.parse(core.getInput("channel"));
const architecture = Architecture.parse(core.getInput("architecture"));
const version = Version.parse(core.getInput("version"));

async function findFlutterFromJson(
  os: Os,
  architecture: Architecture,
  channel: Channel,
  version: SemVer
): Promise<Release> {
  const baseUrl = `https://storage.googleapis.com/flutter_infra_release/releases`;
  const response = await fetch(`${baseUrl}/releases_${os}.json`);
  const json = await (await response.json())["releases"];

  const release = await json
    .map((json: any) => Release.parse(json))
    .filter((release: Release) => release.architecture === architecture)
    .filter((release: Release) => release.channel === channel)
    .filter((release: Release) => release.version === version)
    .sort((a: SemVer, b: SemVer) => rcompare(a.version, b.version));

  return release[0];
}

async function downloadFlutter(os: string, channel: string, version: SemVer) {}

async function run() {
  const release = await findFlutterFromJson(os, architecture, channel, version);
  core.info(`${release.version}`);
}

run();
