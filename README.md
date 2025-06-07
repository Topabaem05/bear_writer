# Bear Writer

This repository contains a React Native application that runs on mobile and desktop. The desktop build uses Electron and the same React Native codebase compiled for the web.

- `src/` – shared React Native components, contexts and screens.
- `electron/` – minimal Electron wrapper that loads the exported web build.

## Building

### React Native (mobile)

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

1. Build the web version and launch Electron:
   ```bash
   npm run electron
   ```
   During development you can run the web server with `npm start` and launch Electron with:
   ```bash
   ELECTRON_DEV=true electron electron
   ```
