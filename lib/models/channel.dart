enum Channel {
  stable,
  beta,
  dev,
  unknown;

  factory Channel.fromString(String value) => switch (value) {
        'stable' => Channel.stable,
        'beta' => Channel.beta,
        'dev' => Channel.dev,
        _ => Channel.unknown,
      };
}
