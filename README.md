# Bear Writer

This repository now contains both the React Native code and a web-based markdown editor.

- `src/` – React Native components, contexts and screens.
- `src/web/` – React web editor based on Tiptap.
- `web/` – configuration for the web project (Vite, TypeScript, etc.).

The web editor UI shares the theme colors from the React Native app for a consistent look and feel.

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

### Web Editor

1. Install dependencies inside the `web/` directory:
   ```bash
   cd web
   npm install
   ```
2. Build the static site:
   ```bash
   npm run build
   ```
   The compiled files will be placed in `web/dist`.
3. To run a local development server instead, use:
   ```bash
   npm run dev
   ```
