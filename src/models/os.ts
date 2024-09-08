export enum Os {
  Windows,
  Ubuntu,
  Macos,
}

export module Os {
  export function parse(os: string): Os {
    if (os.startsWith("windows")) {
      return Os.Windows;
    } else if (os.startsWith("ubuntu")) {
      return Os.Ubuntu;
    } else if (os.startsWith("macos")) {
      return Os.Macos;
    }
    throw Error(
      `Unsupported OS: ${os} - must be one of 'windows', 'ubuntu', 'macos'`
    );
  }
}
