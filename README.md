# Flutter Setup

A Github action to be used alongside any flutter project.

This action provides you with the flutter tools.

## Example

In an example workflow file.

```yml
name: Example

on:
  push:
    branches:
      - main

jobs:
  example:
    strategy:
      matrix:
        os:
          - ubuntu-latest
          - macos-latest
          - windows-latest
        architecture:
          - x64
        include:
          - os: macos-latest
            architecture: arm64

    runs-on: ${{ matrix.os }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Flutter environment
        uses: lumis-labs/flutter-setup@main
        with:
          # mandatory, choose from ubuntu-latest, macos-latest or windows-latest
          os: ${{ matrix.os }}

          # mandatory, choose from x64 or arm64
          architecture: ${{ matrix.architecture }}

          # optional, choose from stable, beta or dev
          # defaults to stable
          channel: stable

          # optional, choose from latest or a version i.e 3.24.1
          # defaults to latest
          version: latest

      - name: Install dependencies
        run: flutter pub get
        shell: bash

      - name: Run tests
        run: flutter test
        shell: bash
```

> Side note: We use the official Google Api to get release information.
>
> They can be found below:
>
> - [Linux](https://storage.googleapis.com/flutter_infra_release/releases/releases_linux.json)
> - [Windows](https://storage.googleapis.com/flutter_infra_release/releases/releases_windows.json)
> - [MacOs](https://storage.googleapis.com/flutter_infra_release/releases/releases_macos.json)
>
> Since Google does not currently provide arm64 archives for Windows and Linux as a development platform, they will not return any links and you will most likely get a failed build.
