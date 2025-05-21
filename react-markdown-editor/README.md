# React Markdown Editor

A web-based Markdown editor built with React, Vite, and TypeScript, focusing on a clean writing experience with live preview.

## Prerequisites

- Node.js (LTS version recommended, e.g., 18.x or 20.x)
- npm (comes with Node.js) or yarn (optional)

## Setup and Installation

1.  Clone the repository (or download the source code).
2.  Navigate to the project directory:
    ```bash
    cd react-markdown-editor
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
    (or `yarn install` if you prefer yarn and a `yarn.lock` file is present)

## Running the Development Server

To start the application in development mode with hot reloading:

```bash
npm run dev
```
(or `yarn dev`)

This will typically open the application in your default web browser at `http://localhost:5173` (the default Vite port, but it might vary if the port is in use).

## Building for Production

To create an optimized static build of the application:

```bash
npm run build
```
(or `yarn build`)

The production-ready files will be placed in the `dist/` directory.

## Key Dependencies

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A modern frontend build tool that provides a fast development experience.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **React Router DOM (`react-router-dom`)**: For declarative routing in React applications.
- **React Markdown (`react-markdown`)**: A React component to render Markdown as HTML.
- **Remark GFM (`remark-gfm`)**: A plugin for `react-markdown` to support GitHub Flavored Markdown (tables, footnotes, strikethrough, etc.).

## Project Structure Highlights

- `src/App.tsx`: Main application component, sets up routing.
- `src/main.tsx`: Entry point of the application, renders App.tsx.
- `src/pages/EditorPage.tsx`: The core editor UI component.
- `src/assets/global.css`: Global styles for the application.
- `src/components/`: For reusable UI components (currently empty).
- `vite.config.ts`: Vite configuration file (root level).
- `tsconfig.json`: TypeScript configuration file (root level).

## Key Configuration Files

-   **`package.json`**: This file is central to any Node.js project. It lists project dependencies (like React, Vite), scripts for running tasks (`npm run dev`, `npm run build`), and other metadata.
-   **`vite.config.ts`**: The configuration file for Vite. Here you can customize Vite's behavior, such as adding plugins, configuring the dev server, or modifying build options.
-   **`tsconfig.json`**: The configuration file for the TypeScript compiler. It specifies how TypeScript should compile your `.ts` and `.tsx` files, including compiler options, type checking rules, and file inclusion/exclusion.

---

## Vite + TypeScript Template Details

This project was initialized using the Vite React + TypeScript template. The original template information is preserved below for reference.

### Original Template: React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
