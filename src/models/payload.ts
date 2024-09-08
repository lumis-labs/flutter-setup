import { Architecture, Channel, Environment, Os, Version } from ".";

export interface CurrentRelease {
  beta: string;
  dev: string;
  stable: string;
}

export module CurrentRelease {
  export function parse(json: any): CurrentRelease {
    return {
      beta: json["beta"],
      dev: json["dev"],
      stable: json["stable"],
    };
  }
}

export interface Release {
  hash: string;
  channel: Channel;
  version: Version;
  dartSdkVersion: string; // dart_sdk_version
  dartSdkArchitecture: Architecture; //dart_sdk_arch
  releaseDate: Date; //release_date
  archive: string;
  sha256: string;
}

module Release {
  export function parse(json: any): Release {
    return {
      hash: json["hash"],
      channel: Channel.parse(json["channel"]),
      version: Version.parse(json["version"]),
      dartSdkVersion: json["dart_sdk_version"],
      dartSdkArchitecture: Architecture.parse(json["dart_sdk_arch"]),
      releaseDate: new Date(json["release_date"]),
      archive: json["archive"],
      sha256: json["sha256"],
    };
  }
}

export interface Payload {
  baseUrl: string; //base_url
  currentRelease: CurrentRelease; //current_release
  releases: Release[];
}

export module Payload {
  const baseUrl = "https://storage.googleapis.com";

  export async function parse(json: Promise<any>): Promise<Payload> {
    return {
      baseUrl: (await json)["base_url"],
      currentRelease: CurrentRelease.parse((await json)["current_release"]),
      releases: (await json)["releases"].map(Release.parse),
    };
  }

  export async function getFor(os: Os): Promise<Payload> {
    switch (os) {
      case Os.Windows:
        return getForWindows();
      case Os.Ubuntu:
        return getForLinux();
      case Os.Macos:
        return getForMacOs();
    }
  }

  async function getForLinux(): Promise<Payload> {
    const payloadUrl = "/flutter_infra_release/releases/releases_linux.json";
    return Payload.parse((await fetch(baseUrl + payloadUrl)).json());
  }

  async function getForWindows(): Promise<Payload> {
    const payloadUrl = "/flutter_infra_release/releases/releases_windows.json";
    return Payload.parse((await fetch(baseUrl + payloadUrl)).json());
  }

  async function getForMacOs(): Promise<Payload> {
    const payloadUrl = "/flutter_infra_release/releases/releases_macos.json";
    return Payload.parse((await fetch(baseUrl + payloadUrl)).json());
  }
}
