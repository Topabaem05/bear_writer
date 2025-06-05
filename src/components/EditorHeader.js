import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function EditorHeader({ navigation, title, onFocusToggle, focusMode }) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    title: {
      flex: 1,
      fontSize: 18,
      fontWeight: 'bold',
    },
    button: {
      marginLeft: 12,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
        <Icon name="chevron-left" size={24} />
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <TouchableOpacity onPress={onFocusToggle} style={styles.button}>
        <Icon name="zap" size={20} color={focusMode ? '#007AFF' : '#888'} />
      </TouchableOpacity>
    </View>
  );
}
