// 테마 관리 Context
import React, { createContext, useContext, useState, useEffect } from 'react';
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
  secondaryTextColor: '#8E8E93',
  placeholderColor: '#C7C7CC',
  borderColor: '#E5E5EA',
  primaryColor: '#007AFF',
  errorColor: '#FF3B30',
  successColor: '#34C759',
  warningColor: '#FF9500',
  inputBackgroundColor: '#F2F2F7',
  toolbarBackgroundColor: '#F9F9F9',
  toolbarIconColor: '#8E8E93',
  activeButtonColor: '#007AFF',
  activeButtonTextColor: '#FFFFFF',
  focusBackgroundColor: 'rgba(0, 122, 255, 0.1)',
  dimmedTextColor: '#8E8E93',
  fontSize: 16,
  fontFamily: 'SF Mono',
  lineHeight: 1.5,
};

const darkTheme = {
  dark: true,
  backgroundColor: '#000000',
  textColor: '#FFFFFF',
  secondaryTextColor: '#8E8E93',
  placeholderColor: '#48484A',
  borderColor: '#38383A',
  primaryColor: '#0A84FF',
  errorColor: '#FF453A',
  successColor: '#30D158',
  warningColor: '#FF9F0A',
  inputBackgroundColor: '#1C1C1E',
  toolbarBackgroundColor: '#1C1C1E',
  toolbarIconColor: '#8E8E93',
  activeButtonColor: '#0A84FF',
  activeButtonTextColor: '#FFFFFF',
  focusBackgroundColor: 'rgba(10, 132, 255, 0.1)',
  dimmedTextColor: '#48484A',
  fontSize: 16,
  fontFamily: 'SF Mono',
  lineHeight: 1.5,
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 16,
    lineHeight: 1.5,
    fontFamily: 'SF Mono',
  });

  const theme = {
    ...(isDarkMode ? darkTheme : lightTheme),
    ...settings,
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