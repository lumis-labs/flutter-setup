enum Os {
  Linux = "linux",
  MacOS = "macos",
  Windows = "windows",
}

namespace Os {
  export function parse(os: string): Os {
    os = os.split("-")[0];
    if (os === "ubuntu") os = "linux";
    if (!Object.values(Os).includes(os as Os))
      throw new Error(`Unsupported Os: ${os}`);
    return os as Os;
  }
}

export { Os };
