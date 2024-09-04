class CurrentRelease {
  const CurrentRelease({
    required this.stable,
    required this.beta,
    required this.dev,
  });

  final String stable;
  final String beta;
  final String dev;

  factory CurrentRelease.fromJson(Map<String, dynamic> json) => CurrentRelease(
        stable: json['stable'],
        beta: json['beta'],
        dev: json['dev'],
      );
}
