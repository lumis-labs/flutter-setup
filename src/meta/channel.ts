enum Channel {
  Stable = "stable",
  Beta = "beta",
  Dev = "dev",
}

namespace Channel {
  export function parse(channel: string): Channel {
    if (!Object.values(Channel).includes(channel as Channel))
      throw new Error(`Unsupported Channel: ${channel}`);
    return channel as Channel;
  }
}

export { Channel };
