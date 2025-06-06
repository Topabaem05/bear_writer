import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../../context/ThemeContext'; // Adjusted path

export default function EditorHeader({ navigation, title, onFocusToggle, focusMode }) {
  const { theme } = useTheme();

  // Define styles that don't depend on theme here or make them dynamic if needed
  const staticStyles = StyleSheet.create({
    containerBase: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20, // Maintained from original
      paddingVertical: 12,   // Maintained from original, contributes to height
      borderBottomWidth: 1,
    },
    titleBase: {
      flex: 1,
      fontWeight: 'bold',
      marginLeft: 12, // Ensure title has some space from back button if it's very short
      marginRight: 12, // Ensure title has some space from focus button
      textAlign: 'center', // Center title between buttons
    },
    buttonContainer: { // Renamed from styles.button for clarity, applied to TouchableOpacity
      padding: 4, // Add padding to make touch target slightly larger
    },
  });

  return (
    <View style={[
      staticStyles.containerBase,
      {
        backgroundColor: theme.backgroundColor, // Using theme.backgroundColor as per decision
        borderBottomColor: theme.borderColor,
      }
    ]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={staticStyles.buttonContainer}>
        <Icon name="chevron-left" size={24} color={theme.primaryColor} />
      </TouchableOpacity>
      <Text
        style={[
          staticStyles.titleBase,
          {
            color: theme.textColor,
            fontFamily: theme.fontFamily,
            fontSize: theme.fontSizeHeading2,
          }
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>
      <TouchableOpacity onPress={onFocusToggle} style={staticStyles.buttonContainer}>
        <Icon name="zap" size={20} color={focusMode ? theme.primaryColor : theme.secondaryTextColor} />
      </TouchableOpacity>
    </View>
  );
}
