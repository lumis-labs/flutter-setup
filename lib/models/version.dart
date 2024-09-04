class Version implements Comparable<Version> {
  const Version({
    required this.major,
    required this.minor,
    required this.patch,
    required this.build,
  });

  final int major;
  final int minor;
  final int patch;
  final String build;

  String get stringify =>
      build.isEmpty ? '$major.$minor.$patch' : '$major.$minor.$patch-$build';

  factory Version.fromString(String? value) {
    if (value == null || value.isEmpty) {
      return Version(major: 0, minor: 0, patch: 0, build: '');
    }

    if (value.startsWith('v')) {
      value = value.substring(1);
    }

    if (value.contains('+')) {
      final [version, build] = value.replaceFirst('+', '!').split('!');
      final [major, minor, patch] = version.split('.');
      return Version(
        major: int.parse(major),
        minor: int.parse(minor),
        patch: int.parse(patch),
        build: build,
      );
    }

    if (value.contains('-')) {
      final [version, build] = value.replaceFirst('-', '!').split('!');
      final [major, minor, patch] = version.split('.');
      return Version(
        major: int.parse(major),
        minor: int.parse(minor),
        patch: int.parse(patch),
        build: build,
      );
    }

    final [major, minor, patch] = value.split('.');

    return Version(
      major: int.parse(major),
      minor: int.parse(minor),
      patch: int.parse(patch),
      build: '',
    );
  }

  @override
  int compareTo(Version other) {
    var result = major.compareTo(other.major);
    if (result != 0) return result;

    result = minor.compareTo(other.minor);
    if (result != 0) return result;

    result = patch.compareTo(other.patch);
    if (result != 0) return result;

    return build.compareTo(other.build);
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    if (other.runtimeType != runtimeType) return false;
    return other is Version &&
        other.major == major &&
        other.minor == minor &&
        other.patch == patch &&
        other.build == build;
  }

  @override
  int get hashCode => Object.hash(major, minor, patch, build);
}
