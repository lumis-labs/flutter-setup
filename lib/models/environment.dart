import 'package:flutter_setup/flutter_setup.dart';

class Environment {
  const Environment({
    required this.platform,
    required this.architecture,
    required this.channel,
    required this.version,
  });

  final Platform platform;
  final Architecture architecture;
  final Channel channel;
  final Version version;

  factory Environment.fromArguments(List<String> arguments) => Environment(
        platform: Platform.fromString(arguments[0]),
        architecture: Architecture.fromString(arguments[1]),
        channel: Channel.fromString(arguments[2]),
        version: Version.fromString(arguments[3]),
      );
}
