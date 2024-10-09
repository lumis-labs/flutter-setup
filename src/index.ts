import * as core from "@actions/core";

import { getCache } from "./cache";
import { Context } from "./meta";
import { getRelease } from "./release";
import { setupFlutter } from "./setup";

(async function main() {
  let context = Context.create();
  context = await getRelease(context);
  context = await getCache(context);

  if (context.cache.isAvailable) {
    core.addPath(context.cache.cacheInfo!.binPath!);
  } else {
    context = await setupFlutter(context);
    core.addPath(context.cache.cacheInfo!.binPath!);
  }
})();
