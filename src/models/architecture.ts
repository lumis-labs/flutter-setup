export enum Architecture {
  X64,
  Arm64,
  Unknown,
}

export module Architecture {
  export function parse(architecture: string): Architecture {
    switch (architecture) {
      case "x64":
        return Architecture.X64;
      case "arm64":
        return Architecture.Arm64;
      default:
        return Architecture.Unknown;
    }
  }
}
