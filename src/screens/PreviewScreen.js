import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useDocument } from '../context/DocumentContext';
import { markdownToHtml } from '../utils/helpers';
import RenderHtml from 'react-native-render-html';

export default function PreviewScreen() {
  const { currentDocument } = useDocument();

  const html = markdownToHtml(currentDocument?.content || '');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <RenderHtml source={{ html }} contentWidth={400} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
});
