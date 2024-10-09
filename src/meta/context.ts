import * as core from "@actions/core";
import { SemVer } from "semver";

import { Architecture, Channel, Os, Release, Version } from ".";

interface Input {
  os: Os;
  channel: Channel;
  architecture: Architecture;
  version: SemVer;
  cache: boolean;
}

interface Cache {
  isAvailable: boolean;
  cacheInfo?: {
    path?: string;
    binPath?: string;
    key?: string;
  };
}

interface Context {
  input: Input;
  baseUrl: string;
  release: Release;
  cache: Cache;
}

namespace Context {
  export function create(): Context {
    return <Context>{
      baseUrl: "https://storage.googleapis.com/flutter_infra_release/releases",
      input: <Input>{
        os: Os.parse(core.getInput("os")),
        channel: Channel.parse(core.getInput("channel")),
        architecture: Architecture.parse(core.getInput("architecture")),
        version: Version.parse(core.getInput("version")),
        cache: Boolean(core.getInput("cache") === "true"),
      },
    };
  }
}

export { Context, Input };
