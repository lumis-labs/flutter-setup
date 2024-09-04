import 'package:flutter_setup/flutter_setup.dart';

class Release {
  const Release({
    required this.hash,
    required this.channel,
    required this.version,
    required this.dartSdkVersion,
    required this.dartSdkArch,
    required this.releaseDate,
    required this.archiveUrl,
    required this.sha256,
  });

  final String hash;
  final Channel channel;
  final Version version;
  // TODO: This needs to be a Version but produces weird results
  final String? dartSdkVersion;
  final Architecture dartSdkArch;
  final DateTime releaseDate;
  final String archiveUrl;
  final String sha256;

  factory Release.fromJson(Map<String, dynamic> json) => Release(
        hash: json['hash'],
        channel: Channel.fromString(json['channel']),
        version: Version.fromString(json['version']),
        dartSdkVersion: json['dart_sdk_version'],
        dartSdkArch: Architecture.fromString(json['dart_sdk_arch']),
        releaseDate: DateTime.parse(json['release_date']),
        archiveUrl: json['archive'],
        sha256: json['sha256'],
      );
}
