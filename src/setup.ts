import * as cache from "@actions/cache";
import * as tc from "@actions/tool-cache";

import { Context, createCacheKey, Os } from "./meta";

export async function setupFlutter(context: Context): Promise<Context> {
  context.cache.cacheInfo = {
    ...context.cache.cacheInfo,
    key: createCacheKey(context),
  };

  //download flutter
  const downloadPath = await tc.downloadTool(
    `${context.baseUrl}/${context.release.archive}`
  );
  if (!downloadPath) throw new Error("Failed to download flutter archive");

  //extract flutter
  const extractPath =
    context.input.os === Os.Linux
      ? await tc.extractTar(downloadPath, undefined, ["-xv"])
      : await tc.extractZip(downloadPath);

  //cache flutter
  const cachePath = await tc.cacheDir(
    extractPath,
    `flutter-${context.input.os}`,
    context.release.version.raw,
    context.release.architecture
  );
  if (!cachePath) throw new Error("Failed to cache flutter archive");

  // save the cache
  const cacheId = await cache.saveCache(
    [cachePath],
    context.cache.cacheInfo!.key!
  );
  if (!cacheId) throw new Error("Failed to save cache");

  context.cache.cacheInfo = {
    ...context.cache.cacheInfo,
    path: `${cachePath}`,
    binPath: `${cachePath}/flutter/bin`,
  };

  return context;
}
