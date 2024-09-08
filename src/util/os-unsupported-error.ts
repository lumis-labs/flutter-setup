import { Os } from "../models";

export class OsUnsupportedError extends Error {
  constructor(os: string) {
    const supported = Object.keys(Os);
    super(`Unsupported OS: ${os}, must be one of ${supported}`);
  }
}
