// 문서 라이브러리 화면
import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SearchBar,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useDocument } from '../context/DocumentContext';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Feather';

export default function LibraryScreen({ navigation }) {
  const { theme } = useTheme();
  const { documents, createDocument, deleteDocument } = useDocument();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState(documents);

  useEffect(() => {
    const filtered = documents.filter(doc =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDocuments(filtered);
  }, [searchQuery, documents]);

  const renderDocument = ({ item }) => {
    const preview = item.content.slice(0, 100) + '...';
    const lastModified = new Date(item.lastModified).toLocaleDateString();

    const renderRightActions = () => (
      <View style={styles.rightActions}>
        <TouchableOpacity
          style={[styles.deleteButton, { backgroundColor: theme.errorColor }]}
          onPress={() => handleDelete(item.id)}
        >
          <Icon name="trash-2" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableOpacity
          style={[styles.documentItem, { borderBottomColor: theme.borderColor }]}
          onPress={() => openDocument(item)}
        >
          <View style={styles.documentInfo}>
            <Text style={[styles.documentTitle, { color: theme.textColor }]}>
              {item.title}
            </Text>
            <Text style={[styles.documentPreview, { color: theme.secondaryTextColor }]}>
              {preview}
            </Text>
            <Text style={[styles.documentDate, { color: theme.secondaryTextColor }]}>
              {lastModified}
            </Text>
          </View>
          <Icon name="chevron-right" size={16} color={theme.secondaryTextColor} />
        </TouchableOpacity>
      </Swipeable>
    );
  };

  const openDocument = (document) => {
    navigation.navigate('Editor', { documentId: document.id });
  };

  const handleDelete = (documentId) => {
    Alert.alert(
      '문서 삭제',
      '이 문서를 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '삭제', style: 'destructive', onPress: () => deleteDocument(documentId) },
      ]
    );
  };

  const handleCreateNew = () => {
    const newDoc = createDocument();
    navigation.navigate('Editor', { documentId: newDoc.id });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.textColor,
    },
    headerButtons: {
      flexDirection: 'row',
    },
    headerButton: {
      marginLeft: 16,
      padding: 8,
    },
    searchContainer: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    searchInput: {
      backgroundColor: theme.inputBackgroundColor,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: theme.textColor,
    },
    documentItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
    },
    documentInfo: {
      flex: 1,
    },
    documentTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
    },
    documentPreview: {
      fontSize: 14,
      marginBottom: 4,
    },
    documentDate: {
      fontSize: 12,
    },
    rightActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    deleteButton: {
      width: 80,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>라이브러리</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton} onPress={handleCreateNew}>
            <Icon name="plus" size={24} color={theme.primaryColor} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton} 
            onPress={() => navigation.navigate('Settings')}
          >
            <Icon name="settings" size={24} color={theme.primaryColor} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="문서 검색..."
          placeholderTextColor={theme.placeholderColor}
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
        />
      </View>

      <FlatList
        data={filteredDocuments}
        renderItem={renderDocument}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}