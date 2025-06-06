import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Feather from 'react-native-vector-icons/Feather';

const StyledTextInput = ({
  leftIconName,
  rightIconName,
  onRightIconPress,
  containerStyle,
  inputStyle,
  leftIconStyle,
  rightIconStyle,
  ...props // Passes all other TextInput props like value, onChangeText, placeholder, etc.
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.inputBackgroundColor,
          borderColor: theme.borderColor,
        },
        containerStyle, // Allow overriding container style
      ]}
    >
      {leftIconName && (
        <Feather
          name={leftIconName}
          size={20} // Default icon size
          color={theme.placeholderColor} // Default icon color, often same as placeholder
          style={[styles.icon, styles.leftIcon, leftIconStyle]}
        />
      )}
      <TextInput
        style={[
          styles.input,
          {
            color: theme.textColor,
            fontFamily: theme.fontFamily,
            fontSize: theme.fontSizeBody,
          },
          // Adjust padding if icons are present
          leftIconName ? styles.inputWithLeftIcon : {},
          rightIconName ? styles.inputWithRightIcon : {},
          inputStyle, // Allow overriding input style
        ]}
        placeholderTextColor={theme.placeholderColor}
        {...props}
      />
      {rightIconName && onRightIconPress && (
        <TouchableOpacity onPress={onRightIconPress} style={[styles.icon, styles.rightIconTouchable, rightIconStyle]}>
          <Feather
            name={rightIconName}
            size={20} // Default icon size
            color={theme.placeholderColor} // Default icon color
          />
        </TouchableOpacity>
      )}
      {rightIconName && !onRightIconPress && (
         <Feather
            name={rightIconName}
            size={20} // Default icon size
            color={theme.placeholderColor} // Default icon color
            style={[styles.icon, styles.rightIcon, rightIconStyle]}
          />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12, // Horizontal padding for the container
  },
  input: {
    flex: 1,
    paddingVertical: 12, // Vertical padding for the TextInput
    paddingHorizontal: 4, // Minimal horizontal padding, container handles most
    // backgroundColor: 'transparent', // Input itself is transparent
  },
  inputWithLeftIcon: {
    paddingLeft: 8, // Add some space between left icon and text
  },
  inputWithRightIcon: {
    paddingRight: 8, // Add some space between text and right icon
  },
  icon: {
    // Common styling for both icons if any (e.g. margin)
  },
  leftIcon: {
    marginRight: 8, // Space between left icon and TextInput
  },
  rightIcon: {
    marginLeft: 8, // Space between TextInput and right icon
  },
  rightIconTouchable: {
    marginLeft: 8, // Space between TextInput and right icon
    padding: 4, // Make touchable area slightly larger if needed
  }
});

export default StyledTextInput;
