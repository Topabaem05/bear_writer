// 에디터 툴바 컴포넌트
import React from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function EditorToolbar({ textInputRef, theme, onFocusToggle, focusMode }) {
  const insertMarkdown = (before, after = '') => {
    if (textInputRef.current) {
      textInputRef.current.focus();
      // 마크다운 문법 삽입 로직
    }
  };

  const toolbarButtons = [
    { icon: 'bold', action: () => insertMarkdown('**', '**') },
    { icon: 'italic', action: () => insertMarkdown('*', '*') },
    { icon: 'underline', action: () => insertMarkdown('<u>', '</u>') },
    { icon: 'list', action: () => insertMarkdown('- ') },
    { icon: 'link', action: () => insertMarkdown('[', '](url)') },
    { icon: 'zap', action: onFocusToggle, active: focusMode },
  ];

  const styles = StyleSheet.create({
    toolbar: {
      flexDirection: 'row',
      // justifyContent: 'space-around', // ScrollView will handle spacing
      alignItems: 'center',
      height: 44, // Fixed height
      backgroundColor: theme.toolbarBackgroundColor,
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
    },
    scrollViewContent: {
      flexGrow: 1, // Ensures content can fill scrollview if not overflowing
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12, // Horizontal padding for the content within ScrollView
      justifyContent: 'space-around', // Distribute items evenly if not enough to scroll
    },
    button: {
      padding: 8, // Padding for touchable area
      borderRadius: 6,
      marginHorizontal: 4, // Add some margin between buttons
    },
    activeButton: {
      backgroundColor: theme.activeButtonColor,
    },
  });

  return (
    <View style={styles.toolbar}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {toolbarButtons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, button.active && styles.activeButton]}
            onPress={button.action}
          >
            <Icon
              name={button.icon}
              size={20}
              color={button.active ? theme.activeButtonTextColor : theme.toolbarIconColor}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
