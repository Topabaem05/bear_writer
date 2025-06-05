// 에디터 툴바 컴포넌트
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
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
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: theme.toolbarBackgroundColor,
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
    },
    button: {
      padding: 8,
      borderRadius: 6,
    },
    activeButton: {
      backgroundColor: theme.activeButtonColor,
    },
  });

  return (
    <View style={styles.toolbar}>
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
    </View>
  );
}
