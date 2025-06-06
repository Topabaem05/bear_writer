// 테마 관리 Context
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const lightTheme = {
  dark: false,
  backgroundColor: '#FFFFFF',
  textColor: '#1C1C1E',
  primaryColor: '#007AFF', // Accent
  secondaryTextColor: '#8E8E93', // Secondary
  dimmedTextColor: '#8E8E93', // Secondary
  borderColor: '#E5E5EA',
  focusBackgroundColor: '#E5F1FF', // Highlight
  placeholderColor: '#C7C7CC',
  inputBackgroundColor: '#F2F2F7',
  toolbarBackgroundColor: '#FFFFFF',
  toolbarIconColor: '#8E8E93',
  activeButtonColor: '#007AFF',
  activeButtonTextColor: '#FFFFFF',
  errorColor: '#FF3B30',
  successColor: '#34C759',
  warningColor: '#FF9500',
  // Typography related keys will be added to the theme object directly
};

const darkTheme = {
  dark: true,
  backgroundColor: '#1C1C1E',
  textColor: '#FFFFFF',
  primaryColor: '#0A84FF', // Accent
  secondaryTextColor: '#8E8E93', // Secondary
  dimmedTextColor: '#8E8E93', // As per spec, could be #6E6E73 for more differentiation
  borderColor: '#38383A',
  focusBackgroundColor: '#2C3A47', // Highlight
  placeholderColor: '#5A5A5E', // Or current #48484A
  inputBackgroundColor: '#2C2C2E', // Or current #1C1C1E
  toolbarBackgroundColor: '#1C1C1E',
  toolbarIconColor: '#8E8E93',
  activeButtonColor: '#0A84FF',
  activeButtonTextColor: '#FFFFFF',
  errorColor: '#FF453A',
  successColor: '#30D158',
  warningColor: '#FF9F0A',
  // Typography related keys will be added to the theme object directly
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 16, // Default Body text size
    lineHeight: 1.5,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto', // Primary Font
  });

  const theme = {
    ...(isDarkMode ? darkTheme : lightTheme),
    ...settings, // Includes fontFamily, fontSize (as fontSizeBody), lineHeight
    monospaceFontFamily: Platform.OS === 'ios' ? 'SF Mono' : 'Roboto Mono',
    fontSizeHeading1: 24,
    fontSizeHeading2: 22,
    fontSizeHeading3: 20,
    fontSizeBody: settings.fontSize, // explicit mapping for clarity
    fontSizeUIMelement: 14,
    fontSizeMetadata: 12,
  };

  useEffect(() => {
    loadThemeSettings();
  }, []);

  const loadThemeSettings = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      const savedSettings = await AsyncStorage.getItem('editorSettings');

      if (savedTheme) {
        setIsDarkMode(JSON.parse(savedTheme));
      }

      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Failed to load theme settings:', error);
    }
  };

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    try {
      await AsyncStorage.setItem('theme', JSON.stringify(newMode));
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  const updateSettings = async (newSettings) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    try {
      await AsyncStorage.setItem('editorSettings', JSON.stringify(updatedSettings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const value = {
    theme,
    isDarkMode,
    toggleTheme,
    updateSettings,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
