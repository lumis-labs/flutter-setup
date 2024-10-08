import { setupFlutter } from "./cache";
import { Input } from "./meta";

async function run() {
  const { os, architecture, channel, version } = Input;
  await setupFlutter(os, architecture, channel, version);
}

run();
