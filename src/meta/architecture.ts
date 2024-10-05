enum Architecture {
  X64 = "x64",
  Arm64 = "arm64",
}

namespace Architecture {
  export function parse(architecture: string): Architecture {
    if (!Object.values(Architecture).includes(architecture as Architecture))
      throw new Error(`Unsupported Architecture: ${architecture}`);
    return architecture as Architecture;
  }
}

export { Architecture };
