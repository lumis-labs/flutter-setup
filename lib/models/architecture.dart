enum Architecture {
  arm64,
  x64,
  unknown;

  factory Architecture.fromString(String? value) => switch (value) {
        'arm64' => Architecture.arm64,
        'x64' => Architecture.x64,
        _ => Architecture.unknown,
      };
}
