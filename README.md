# Bear Writer

This repository contains the React Native mobile application and a desktop version powered by Electron.

- `src/` – React Native components, contexts and screens.
- `src/web/` – React UI used in the Electron renderer.
- `electron/` – configuration for the desktop project (Vite, TypeScript and Electron).

The desktop UI shares the theme colors from the React Native app for a consistent look and feel.

## Building

### React Native

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
   Use `npm run android` or `npm run ios` to open the app on a simulator or device.

### Desktop (Electron)

1. Install dependencies inside the `electron/` directory:
   ```bash
   cd electron
   npm install
   ```
2. Build the renderer and start Electron:
   ```bash
   npm run electron
   ```
