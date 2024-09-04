import 'package:flutter_setup/flutter_setup.dart';

Future<void> main(List<String> arguments) async {
  final environment = Environment.fromArguments(arguments);
  final metadata = await Metadata.requestFor(environment.platform);

  final releases = List<Release>.from(metadata.releases)
      .where((release) => release.dartSdkArch == environment.architecture)
      .where((release) => release.channel == environment.channel)
      .where((release) => release.version == environment.version)
      .map((release) => metadata.baseUrl.resolve(release.archiveUrl));

  if (releases.isEmpty) {
    throw Exception('No releases found for $environment');
  }

  if (releases.length > 1) {
    throw Exception('Multiple releases found for $environment');
  }

  print(releases.first);
}
