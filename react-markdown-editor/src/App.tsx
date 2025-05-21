import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EditorPage from './pages/EditorPage';
// Global CSS is imported in main.tsx and EditorPage.tsx, so not needed here.

function App() {
  return (
    <Routes>
      <Route path="/" element={<EditorPage />} />
      {/* You could add other routes here later, e.g.
      <Route path="/settings" element={<SettingsPage />} />
      */}
    </Routes>
  );
}

export default App;
