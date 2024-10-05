import * as core from "@actions/core";

import { Architecture, Channel, Os, Version } from ".";
import { Payload, Release } from "./payload";

export { Architecture } from "./architecture";
export { Channel } from "./channel";
export { Os } from "./os";
export { Payload, Release } from "./payload";
export { Version } from "./version";

export const os = Os.parse(core.getInput("os"));
export const channel = Channel.parse(core.getInput("channel"));
export const payload = Payload.parse(os);
export const architecture = Architecture.parse(core.getInput("architecture"));
export const version = Version.parse(core.getInput("version"));
export const snapshot = Release.snapshot();
export const isCacheRequested = core.getInput("cache") === "true";
