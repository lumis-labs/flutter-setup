export enum Channel {
  Stable = "stable",
  Beta = "beta",
  Dev = "dev",
}

export module Channel {
  export function parse(channel: string): Channel {
    switch (channel) {
      case "stable":
        return Channel.Stable;
      case "beta":
        return Channel.Beta;
      case "dev":
        return Channel.Dev;
      default:
        throw Error("Unsupported channel: " + channel);
    }
  }
}
