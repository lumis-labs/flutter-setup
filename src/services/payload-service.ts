import { Environment, Payload, Version } from "../models";
import { MultipleReleaseFoundError, NoReleaseFoundError } from "../util";

export module PayloadService {
  export async function getPayload(environment: Environment): Promise<String> {
    const payload = await Payload.getFor(environment.os);
    if (environment.version.options?.isLatest) {
      const filteredReleases = payload.releases.filter(
        (release) =>
          release.dartSdkArchitecture === environment.architecture &&
          release.channel === environment.channel &&
          release.hash === payload.currentRelease[environment.channel]
      );

      if (filteredReleases.length === 0) {
        throw new NoReleaseFoundError();
      }

      if (filteredReleases.length > 1) {
        throw new MultipleReleaseFoundError(filteredReleases);
      }

      return payload.baseUrl + "/" + filteredReleases[0].archive;
    } else {
      // Get the release matching the version
      const filteredReleases = payload.releases
        .filter(
          (release) => release.dartSdkArchitecture === environment.architecture
        )
        .filter((release) => release.channel === environment.channel)
        .filter((release) =>
          Version.equals(release.version, environment.version)
        );

      if (filteredReleases.length === 0) {
        throw new NoReleaseFoundError();
      }

      if (filteredReleases.length > 1) {
        throw new MultipleReleaseFoundError(filteredReleases);
      }
      return payload.baseUrl + "/" + filteredReleases[0].archive;
    }
  }
}
