export class VersionUnknownError extends Error {
  constructor(version: string) {
    super(`Unknown version: ${version}`);
  }
}
