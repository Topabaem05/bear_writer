import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Feather from 'react-native-vector-icons/Feather'; // Assuming Feather is the desired icon pack

// Primary Button
export const PrimaryButton = ({ onPress, title, style, textStyle, ...props }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.baseButton,
        styles.primaryButton,
        { backgroundColor: theme.primaryColor },
        style,
      ]}
      onPress={onPress}
      {...props}
    >
      <Text
        style={[
          styles.baseButtonText,
          styles.primaryButtonText,
          { color: theme.activeButtonTextColor, fontSize: theme.fontSizeBody, fontFamily: theme.fontFamily }, // Using fontSizeBody as a default
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// Secondary Button
export const SecondaryButton = ({ onPress, title, style, textStyle, ...props }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.baseButton,
        styles.secondaryButton,
        { borderColor: theme.primaryColor },
        style,
      ]}
      onPress={onPress}
      {...props}
    >
      <Text
        style={[
          styles.baseButtonText,
          styles.secondaryButtonText,
          { color: theme.primaryColor, fontSize: theme.fontSizeBody, fontFamily: theme.fontFamily }, // Using fontSizeBody as a default
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// Icon Button
export const IconButton = ({ onPress, iconName, iconSize = 24, iconColor, style, ...props }) => {
  const { theme } = useTheme();
  const resolvedIconColor = iconColor || theme.primaryColor;

  return (
    <TouchableOpacity
      style={[styles.iconButton, style]}
      onPress={onPress}
      {...props}
    >
      <Feather name={iconName} size={iconSize} color={resolvedIconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseButtonText: {
    fontWeight: '600', // Semibold
    // fontFamily is now applied directly in the component using theme.fontFamily
  },
  primaryButton: {
    // Specific styles for PrimaryButton if any, beyond theme-driven ones
  },
  primaryButtonText: {
    // Specific text styles for PrimaryButton if any
  },
  secondaryButton: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    // Specific text styles for SecondaryButton if any
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'transparent', // Default for TouchableOpacity
  },
});
