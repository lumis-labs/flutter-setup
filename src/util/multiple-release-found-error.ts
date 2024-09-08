import { Release } from "../models";

export class MultipleReleaseFoundError extends Error {
  constructor(releases: Release[]) {
    super(`Multiple releases found: ${JSON.stringify(releases)}`);
  }
}
