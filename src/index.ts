import * as core from "@actions/core";

import { Release } from "./meta";

async function run() {
  const snapshot = await Release.snapshot();
  core.info(`Snapshot: ${snapshot.version}`);
}

run();
