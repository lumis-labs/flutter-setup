import { Architecture, Channel, Os, Version } from ".";

export interface Environment {
  os: Os;
  architecture: Architecture;
  channel: Channel;
  version: Version;
}
