<p align="center"><a href="https://vasyl.site" target="_blank"><img src="https://github.com/penteleichuk/i-dont-smoke/blob/feature/assets/images/readme/logo.png" width="300" alt="Moke Smoke Logo"></a></p>
<p align="center"><a href="https://play.google.com/store/apps/details?id=com.vasyl.dont.smoke" target="_blank"><img src="https://github.com/penteleichuk/i-dont-smoke/blob/feature/assets/images/readme/android.webp" width="150" alt="android"></a>  <a href="https://apps.apple.com/us/app/moke-smoke-quit-smoking-now/id6443646425" target="_blank"><img src="https://github.com/penteleichuk/i-dont-smoke/blob/feature/assets/images/readme/apple.webp" width="150" alt="apple"></a></p>

## About Moke Smoke

Moke Smoke not only helps you track your progress in quitting smoking, but also offers a range of unique features and opportunities to interact with other community members.

## Home

<p align="center"><img src="https://github.com/penteleichuk/i-dont-smoke/blob/feature/assets/images/readme/main.gif" width="200" alt="Home screen"> <img src="https://github.com/penteleichuk/i-dont-smoke/blob/feature/assets/images/readme/main_2.gif" width="200" alt="Home screen"> <img src="https://github.com/penteleichuk/i-dont-smoke/blob/feature/assets/images/readme/main_3.gif" width="200" alt="Home screen"></p>

## Withdrawal / Cards / Purpose

<p align="center"><img src="https://github.com/penteleichuk/i-dont-smoke/blob/feature/assets/images/readme/withdrawal.gif" width="200" alt="Withdrawal screen"> <img src="https://github.com/penteleichuk/i-dont-smoke/blob/feature/assets/images/readme/cards.gif" width="200" alt="Cards screen"> <img src="https://github.com/penteleichuk/i-dont-smoke/blob/feature/assets/images/readme/purpose.gif" width="200" alt="Purpose screen"></p>

## Doings / Hypnosis / Pedometer

<p align="center"><img src="https://github.com/penteleichuk/i-dont-smoke/blob/feature/assets/images/readme/doings.gif" width="200" alt="Doings screen"> <img src="https://github.com/penteleichuk/i-dont-smoke/blob/feature/assets/images/readme/hypnosis.gif" width="200" alt="Hypnosis screen"> <img src="https://github.com/penteleichuk/i-dont-smoke/blob/feature/assets/images/readme/pedometer.gif" width="200" alt="Pedometer screen"></p>

## Auth / I want / I don't want

<p align="center"><img src="https://github.com/penteleichuk/i-dont-smoke/blob/feature/assets/images/readme/auth.gif" width="200" alt="Auth screen"> <img src="https://github.com/penteleichuk/i-dont-smoke/blob/feature/assets/images/readme/want.gif" width="200" alt="want screen"> <img src="https://github.com/penteleichuk/i-dont-smoke/blob/feature/assets/images/readme/dont.jpeg" width="200" alt="want screen"></p>

## Chat / Top / Mood

<p align="center"><img src="https://github.com/penteleichuk/i-dont-smoke/blob/feature/assets/images/readme/message.PNG" width="200" alt="Chat screen"> <img src="https://github.com/penteleichuk/i-dont-smoke/blob/feature/assets/images/readme/top.gif" width="200" alt="Top screen"> <img src="https://github.com/penteleichuk/i-dont-smoke/blob/feature/assets/images/readme/mood.gif" width="200" alt="Mood screen"></p>

## Settings / Profile / Friends

<p align="center"><img src="https://github.com/penteleichuk/i-dont-smoke/blob/feature/assets/images/readme/settings.gif" width="200" alt="Settings screen"> <img src="https://github.com/penteleichuk/i-dont-smoke/blob/feature/assets/images/readme/profile.gif" width="200" alt="Profile screen"> <img src="https://github.com/penteleichuk/i-dont-smoke/blob/feature/assets/images/readme/friend.gif" width="200" alt="Friends screen"></p>

## Getting Started

### Installation

Open a Terminal in the project root and run...

Install all dependencies:

```shell
yarn install
```

Install all pods:

```shell
cd ios && pod install
```

### Running on iOS

```shell
yarn ios
```

### Running on Android

```shell
yarn android
```

### Running on release

```shell
cd android && ./gradlew bundleRelease
```

### Generate APK

```shell
cd android && ./gradlew assembleRelease
```

### Generate SHH

```shell
cd android && ./gradlew signingReport
```

### Generate bootsplash

```shell
yarn react-native generate-bootsplash assets/images/bootsplash_logo_original.png \
 --platforms=android,ios \
 --background=334155 \
 --logo-width=100 \
 --assets-output=src/shared/assets/images/assets \
 --flavor=main
```

## License

Linky is licensed under the terms of the MIT license.
