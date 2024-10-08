import { Architecture, Channel, Os } from "@/meta";
import { SemVer } from "semver";

export class ReleaseNotFoundError extends Error {
  constructor(
    public readonly os: Os,
    public readonly architecture: Architecture,
    public readonly channel: Channel,
    public readonly version?: SemVer
  ) {
    let message = `No release found for configuration:\n`;
    message += `- os: ${os}\n`;
    message += `- architecture: ${architecture}\n`;
    message += `- channel: ${channel}\n`;
    if (version) message += `- version: ${version}\n`;
    super(message);
  }
}
