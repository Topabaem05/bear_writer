import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WordCounter({ text, theme }) {
  const counts = useMemo(() => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const characters = text.length;
    const readingTime = Math.ceil(words / 200) || 1;
    return { words, characters, readingTime };
  }, [text]);

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 4,
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
      backgroundColor: theme.backgroundColor,
    },
    text: {
      fontSize: 12,
      color: theme.secondaryTextColor,
      textAlign: 'right',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        단어 {counts.words} | 글자 {counts.characters} | 약 {counts.readingTime}분 읽기
      </Text>
    </View>
  );
}
