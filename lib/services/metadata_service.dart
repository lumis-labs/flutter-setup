import 'dart:convert';

import 'package:flutter_setup/flutter_setup.dart';
import 'package:http/http.dart' as http;

class CouldNotGetMetadataException implements Exception {
  const CouldNotGetMetadataException(this.response);

  final http.Response response;

  @override
  String toString() => 'Could not get metadata $response';
}

class MetadataService {
  const MetadataService({
    required this.platform,
    required this.baseUri,
  });

  final Platform platform;
  final Uri baseUri;

  factory MetadataService.fromPlatform(Platform platform) {
    return MetadataService(
      platform: platform,
      baseUri: Uri.https('storage.googleapis.com'),
    );
  }

  Uri get fullLinuxPath => baseUri.replace(
        path: '/flutter_infra_release/releases/releases_linux.json',
      );

  Uri get fullMacOsPath => baseUri.replace(
        path: '/flutter_infra_release/releases/releases_macos.json',
      );

  Uri get fullWindowsPath => baseUri.replace(
        path: '/flutter_infra_release/releases/releases_windows.json',
      );

  Future<Metadata> get metadata => switch (platform) {
        Platform.macOs => _requestForMacOs(),
        Platform.windows => _requestForWindows(),
        Platform.linux => _requestForLinux(),
        _ => Future.error('Platform not supported'),
      };

  Future<Metadata> _requestForLinux() async {
    final response = await http.get(fullLinuxPath);
    if (response.statusCode == 200) {
      return Metadata.fromJson(jsonDecode(response.body));
    }
    throw CouldNotGetMetadataException(response);
  }

  Future<Metadata> _requestForWindows() async {
    final response = await http.get(fullWindowsPath);
    if (response.statusCode == 200) {
      return Metadata.fromJson(jsonDecode(response.body));
    }
    throw CouldNotGetMetadataException(response);
  }

  Future<Metadata> _requestForMacOs() async {
    final response = await http.get(fullMacOsPath);
    if (response.statusCode == 200) {
      return Metadata.fromJson(jsonDecode(response.body));
    }
    throw CouldNotGetMetadataException(response);
  }
}
