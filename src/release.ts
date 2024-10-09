import { Context, getFlutterMetadata, Release } from "@/meta";
import { ReleaseNotFoundError } from "./util";

async function getRelease(context: Context): Promise<Context> {
  const { os, channel, architecture, version } = context.input;
  const isLatest = version.compare("0.0.0") === 0;
  const metadata = await getFlutterMetadata(os);

  if (isLatest) {
    const release = metadata
      .filter((release: Release) => release.architecture === architecture)
      .filter((release: Release) => release.channel === channel)
      .sort((a: Release, b: Release) => b.version.compare(a.version));

    if (release.length > 0) return { ...context, release: release[0] };
    else throw new ReleaseNotFoundError(os, architecture, channel);
  }

  const release = metadata
    .filter((release: Release) => release.architecture === architecture)
    .filter((release: Release) => release.channel === channel)
    .sort((a: Release, b: Release) => b.version.compare(a.version))
    .filter((release: Release) => release.version.compare(version) === 0);

  if (release.length > 0) return { ...context, release: release[0] };
  else throw new ReleaseNotFoundError(os, architecture, channel, version);
}

export { getRelease };
