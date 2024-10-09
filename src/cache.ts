import * as cache from "@actions/cache";
import * as tc from "@actions/tool-cache";

import { Context, createCacheKey } from "./meta";

function findCache(context: Context): Context {
  const { os } = context.input;
  const { architecture, version } = context.release;
  const path = tc.find(`flutter-${os}`, version.raw, architecture);
  console.log("find all:", tc.findAllVersions(`flutter-${os}`, architecture));
  console.log("path:", path);
  if (path) {
    return {
      ...context,
      cache: {
        isAvailable: true,
        cacheInfo: {
          path,
          key: createCacheKey(context),
        },
      },
    };
  }
  return { ...context, cache: { isAvailable: false } };
}

async function getCache(context: Context): Promise<Context> {
  context = findCache(context);

  console.log(context);

  // if the cache is needed by user and the cache is available
  if (context.input.cache && context.cache.isAvailable) {
    const { path, key } = context.cache.cacheInfo!;
    const cachedKey = await cache.restoreCache([path!], key!);
    if (cachedKey) return context;
    throw new Error("Failed to restore cache");
  }

  return context;
}

export { getCache };
