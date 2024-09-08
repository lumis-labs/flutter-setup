export class NoReleaseFoundError extends Error {
  constructor() {
    super("No release found");
  }
}
