import { VersionUnknownError } from "../util";

export interface Version {
  major: number;
  minor: number;
  patch: number;
  preRelease?: string;
  options?: {
    isLatest: boolean;
  };
}

export module Version {
  export function parse(version: string): Version {
    if (version == null || version.length == 0) {
      throw new VersionUnknownError(version);
    }

    if (version === "latest") {
      return {
        major: 0,
        minor: 0,
        patch: 0,
        options: {
          isLatest: true,
        },
      };
    }

    if (version.startsWith("v")) {
      version = version.substring(1);
    }

    if (version.includes("+")) {
      const [v, build] = version.replace("+", "!").split("!");
      const [major, minor, patch] = v.split(".");
      return {
        major: parseInt(major),
        minor: parseInt(minor),
        patch: parseInt(patch),
        preRelease: build,
      };
    }

    if (version.includes("-")) {
      const [v, build] = version.replace("-", "!").split("!");
      const [major, minor, patch] = v.split(".");
      return {
        major: parseInt(major),
        minor: parseInt(minor),
        patch: parseInt(patch),
        preRelease: build,
      };
    }

    const [major, minor, patch] = version.split(".");
    return {
      major: parseInt(major),
      minor: parseInt(minor),
      patch: parseInt(patch),
    };
  }

  export function equals(a: Version, b: Version): boolean {
    return (
      a.major === b.major &&
      a.minor === b.minor &&
      a.patch === b.patch &&
      a.preRelease === b.preRelease
    );
  }
}
