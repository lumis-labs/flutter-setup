import * as core from "@actions/core";

import { Architecture } from "./architecture";
import { Channel } from "./channel";
import { Os } from "./os";
import { Release } from "./release";
import { Version } from "./version";

export { Architecture } from "./architecture";
export { Channel } from "./channel";
export { Os } from "./os";
export { Release } from "./release";
export { Version } from "./version";

export namespace Input {
  export const os = Os.parse(core.getInput("os"));
  export const channel = Channel.parse(core.getInput("channel"));
  export const architecture = Architecture.parse(core.getInput("architecture"));
  export const version = Version.parse(core.getInput("version"));
}

export async function getFlutterMetadata(os: Os): Promise<Release[]> {
  const baseUrl = "https://storage.googleapis.com/flutter_infra_release";
  const response = await fetch(`${baseUrl}/releases/releases_${os}.json`);
  if (!response.ok) throw new Error(response.statusText);
  const json = await response.json();
  return json["releases"].map(Release.parse);
}
