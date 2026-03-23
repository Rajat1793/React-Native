# Profile App

React Native + Expo Router project for practicing modern mobile UI patterns.

## Current Screen Features

- Profile header with avatar and notification icon
- Hero card with circular progress indicator
- Horizontal In Progress task list
- Vertical Task Group list
- Dynamic counters driven by array length
- Safe area support using `react-native-safe-area-context`

## Project Structure

```text
profileApp/
   app/
      _layout.tsx
      index.tsx
   assets/
      images/
   package.json
```

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run start
```

3. Run on a platform

```bash
npm run ios
npm run android
npm run web
```

## Available Scripts

- `npm run start` - Start Expo dev server
- `npm run ios` - Open iOS simulator build
- `npm run android` - Open Android emulator/device build
- `npm run web` - Run app in browser
- `npm run lint` - Run lint checks
- `npm run reset-project` - Reset starter scaffold files

## Tech Stack

- Expo SDK 54
- React 19
- React Native 0.81
- Expo Router
- TypeScript
- `react-native-svg` for circular progress
- `react-native-safe-area-context` for safe area handling

## Notes

- Main screen implementation: `app/index.tsx`

## Learning Goals

- Build reusable UI cards and progress components
- Practice FlatList usage for horizontal and vertical lists
- Understand safe area and layout composition
- Keep data-driven UI with typed models
