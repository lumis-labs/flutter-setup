enum Platform {
  macOs,
  windows,
  linux,
  unknown;

  factory Platform.fromString(String value) => switch (value) {
        'macOs' || 'macos' => Platform.macOs,
        'windows' => Platform.windows,
        'linux' => Platform.linux,
        _ => Platform.unknown,
      };
}
