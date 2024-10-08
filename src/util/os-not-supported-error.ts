export class OsNotSupportedError extends Error {
  public constructor(os: string) {
    super(`Unsupported Os: '${os}'`);
  }
}
