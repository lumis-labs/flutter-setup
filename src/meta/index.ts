import { Context } from "./context";
import { Os } from "./os";
import { Release } from "./release";

export { Architecture } from "./architecture";
export { Channel } from "./channel";
export { Context, Input } from "./context";
export { Os } from "./os";
export { Release } from "./release";
export { Version } from "./version";

export async function getFlutterMetadata(os: Os): Promise<Release[]> {
  const baseUrl = "https://storage.googleapis.com/flutter_infra_release";
  const response = await fetch(`${baseUrl}/releases/releases_${os}.json`);
  if (!response.ok) throw new Error(response.statusText);
  const json = await response.json();
  return json["releases"].map(Release.parse);
}

export function createCacheKey(context: Context): string {
  const { os } = context.input;
  const { architecture, channel, version, hash } = context.release;
  return `flutter-sdk-${channel}-${version.raw}-${os}-${architecture}-${hash}`;
}
