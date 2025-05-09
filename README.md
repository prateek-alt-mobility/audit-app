# My Fleet - Fleet Management Mobile App

Beta v0.0.1

## Description
My Fleet is a fleet management application for vehicles, featuring audit capabilities and battery diagnostics.

## Features
- Vehicle auditing
- Battery diagnostics and testing
- User authentication
- Mobile-friendly UI

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- Yarn or npm
- Expo CLI (`npm install -g expo-cli`)
- EAS CLI (`npm install -g eas-cli`)
- Android Studio (for Android development)

### Installation
1. Clone the repository
2. Install dependencies:
   ```
   yarn install
   ```

### Running the Development Server
```
yarn start
```

To run on Android emulator:
```
yarn android
```

## Building with EAS

This project uses Expo Application Services (EAS) for building the application. EAS provides a cloud-based build service that simplifies the process of creating builds for iOS and Android.

### Quick Setup

To quickly set up EAS for this project, run:

```
yarn setup:eas
```

This script will:
- Install the EAS CLI globally if not already installed
- Log you in to your Expo account
- Create the EAS configuration if it doesn't exist
- Install the required dependencies

### Prerequisites

- Install the EAS CLI globally:
  ```
  npm install -g eas-cli
  ```
- Make sure you're logged in to your Expo account:
  ```
  eas login
  ```

### Available Build Commands

The following build commands are available:

- **Development Build**: Creates a development build with the Expo Dev Client
  ```
  yarn build:development
  ```

- **Preview Build**: Creates an internal distribution build for testing
  ```
  yarn build:preview
  ```

- **Production Build**: Creates a production-ready build
  ```
  yarn build:production
  ```

- **Platform-Specific Builds**:
  ```
  yarn build:android  # Build for Android only
  yarn build:ios      # Build for iOS only
  ```

### Submitting to App Stores

To submit your builds to the app stores:

```
yarn submit:android  # Submit to Google Play Store
yarn submit:ios      # Submit to Apple App Store
```

### EAS Update

This project also uses EAS Update to push updates to your app without requiring a new build. To push updates:

```
yarn update:preview     # Push an update to the preview channel
yarn update:production  # Push an update to the production channel
```

For more information about EAS Build and Update, refer to the [Expo documentation](https://docs.expo.dev/build/introduction/).

## Building for Android

### Development Build (APK)
```
yarn build:android-dev
```

### Preview Build (APK)
```
yarn build:android
```

### Production Build (AAB for Google Play)
```
yarn build:android-prod
```

## Configuration
The app is configured in:
- `app.json` - Expo configuration
- `eas.json` - EAS Build configuration

## Branding
- App Name: My Fleet
- Version: Beta v0.0.1
- Logo: Located at `assets/images/splash-icon.png`
