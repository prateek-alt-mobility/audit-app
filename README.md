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
