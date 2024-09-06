import * as core from "@actions/core";
import * as github from "@actions/github";

const environment = {
  os: core.getInput("os"),
  architecture: core.getInput("architecture"),
  channel: core.getInput("channel"),
  version: core.getInput("version"),
};

const baseUrl = "https://storage.googleapis.com";
let payloadUrl: string;

if (environment.os.startsWith("windows")) {
  payloadUrl = "/flutter_infra_release/releases/releases_linux.json";
} else if (environment.os.startsWith("ubuntu")) {
  payloadUrl = "/flutter_infra_release/releases/releases_linux.json";
} else if (environment.os.startsWith("macos")) {
  payloadUrl = "/flutter_infra_release/releases/releases_linux.json";
} else {
  throw Error("Unsupported OS: " + environment.os);
}

interface CurrentRelease {
  beta: string;
  dev: string;
  stable: string;
}

interface Release {
  hash: string;
  channel: string;
  version: string;
  dart_sdk_version: string;
  dart_sdk_arch: string;
  release_date: string;
  archive: string;
  sha256: string;
}

interface Payload {
  base_url: string;
  current_release: CurrentRelease;
  releases: Release[];
}

fetch(baseUrl + payloadUrl)
  .then((response) => response.json() as Promise<Payload>)
  .then((json) => {
    console.log(json);
    json.releases
      .filter((release) => release.channel === environment.os)
      .filter((release) => release.dart_sdk_arch === environment.architecture)
      .filter((release) => release.channel === environment.channel)
      .filter((release) => release.version === environment.version)
      .forEach((release) => {
        console.log(release.archive);
      });
  });
