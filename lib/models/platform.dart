enum Platform {
  macOs,
  windows,
  linux,
  unknown;

  factory Platform.fromString(String value) {
    if (value.startsWith('windows')) return Platform.windows;
    if (value.startsWith('linux')) return Platform.linux;
    if (value.startsWith('ubuntu')) return Platform.linux;
    if (value.startsWith('mac')) return Platform.macOs;
    print('Don\'t recognize platform: $value');
    return Platform.unknown;
  }
}
