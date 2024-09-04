import 'package:flutter_setup/flutter_setup.dart';

class Metadata {
  const Metadata({
    required this.baseUrl,
    required this.currentRelease,
    required this.releases,
  });

  final Uri baseUrl;
  final CurrentRelease currentRelease;
  final List<Release> releases;

  factory Metadata.fromJson(Map<String, dynamic> json) => Metadata(
        baseUrl: Uri.parse(json['base_url'] + '/'),
        currentRelease: CurrentRelease.fromJson(json['current_release']),
        releases: List.from(json['releases'])
            .map((e) => Release.fromJson(e))
            .toList(),
      );

  static Future<Metadata> requestFor(Platform platform) async =>
      MetadataService.fromPlatform(platform).metadata;
}
