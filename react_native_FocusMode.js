// 포커스 모드 컴포넌트
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FocusMode({ text, cursorPosition, currentSentence, theme }) {
  if (!currentSentence) return null;

  const beforeText = text.slice(0, currentSentence.start);
  const focusText = currentSentence.sentence;
  const afterText = text.slice(currentSentence.end);

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: 20,
      paddingVertical: 20,
      zIndex: 1,
    },
    dimmedText: {
      fontSize: theme.fontSize,
      color: theme.dimmedTextColor,
      fontFamily: theme.fontFamily,
      lineHeight: theme.lineHeight * theme.fontSize,
      opacity: 0.3,
    },
    focusedText: {
      fontSize: theme.fontSize,
      color: theme.textColor,
      fontFamily: theme.fontFamily,
      lineHeight: theme.lineHeight * theme.fontSize,
      backgroundColor: theme.focusBackgroundColor,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.dimmedText}>{beforeText}</Text>
      <Text style={styles.focusedText}>{focusText}</Text>
      <Text style={styles.dimmedText}>{afterText}</Text>
    </View>
  );
}