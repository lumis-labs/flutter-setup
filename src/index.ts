import { Version, Os, Architecture, Channel, Environment } from "./models";
import { PayloadService } from "./services";

// Example usage:
// node ./dist/index.js --os="macos" --architecture="arm64" --channel="stable" --version="latest"

const environment: Environment = {
  os: Os.parse(
    process.argv
      .find((arg) => arg.startsWith("--os"))
      ?.substring("--os=".length)!
  ),
  architecture: Architecture.parse(
    process.argv
      .find((arg) => arg.startsWith("--architecture"))
      ?.substring("--architecture=".length)!
  ),
  channel: Channel.parse(
    process.argv
      .find((arg) => arg.startsWith("--channel"))
      ?.substring("--channel=".length)!
  ),
  version: Version.parse(
    process.argv
      .find((arg) => arg.startsWith("--version"))
      ?.substring("--version=".length)!
  ),
};

PayloadService.getPayload(environment).then((url) => {
  console.log(url);
});
