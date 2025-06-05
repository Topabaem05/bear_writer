# React Native 앱을 위한 컴포넌트 구조와 주요 코드를 작성해보겠습니다.

# 먼저 주요 컴포넌트들의 코드 구조를 생성합니다.

components_structure = {
    "App.js": '''// 메인 앱 컴포넌트
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './src/context/ThemeContext';
import { DocumentProvider } from './src/context/DocumentContext';

import SplashScreen from './src/screens/SplashScreen';
import LibraryScreen from './src/screens/LibraryScreen';
import EditorScreen from './src/screens/EditorScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import PreviewScreen from './src/screens/PreviewScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <DocumentProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Library" component={LibraryScreen} />
            <Stack.Screen name="Editor" component={EditorScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Preview" component={PreviewScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </DocumentProvider>
    </ThemeProvider>
  );
}''',

    "EditorScreen.js": '''// 글쓰기 에디터 화면
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useDocument } from '../context/DocumentContext';
import EditorHeader from '../components/EditorHeader';
import EditorToolbar from '../components/EditorToolbar';
import FocusMode from '../components/FocusMode';
import WordCounter from '../components/WordCounter';

const { width, height } = Dimensions.get('window');

export default function EditorScreen({ navigation, route }) {
  const { theme } = useTheme();
  const { currentDocument, updateDocument } = useDocument();
  const [text, setText] = useState(currentDocument?.content || '');
  const [focusMode, setFocusMode] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  
  const textInputRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // 포커스 모드 효과
  useEffect(() => {
    if (focusMode) {
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [focusMode]);

  // 자동 저장
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (currentDocument && text !== currentDocument.content) {
        updateDocument(currentDocument.id, { content: text });
      }
    }, 2000);

    return () => clearTimeout(autoSaveTimer);
  }, [text]);

  const handleTextChange = (newText) => {
    setText(newText);
  };

  const handleSelectionChange = (event) => {
    setCursorPosition(event.nativeEvent.selection.start);
  };

  const getCurrentSentence = () => {
    const sentences = text.split(/[.!?]+/);
    let position = 0;
    
    for (let i = 0; i < sentences.length; i++) {
      if (position + sentences[i].length >= cursorPosition) {
        return {
          sentence: sentences[i],
          start: position,
          end: position + sentences[i].length
        };
      }
      position += sentences[i].length + 1;
    }
    return null;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    editorContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    textInput: {
      flex: 1,
      fontSize: theme.fontSize,
      color: theme.textColor,
      fontFamily: theme.fontFamily,
      lineHeight: theme.lineHeight * theme.fontSize,
      textAlignVertical: 'top',
    },
    focusOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.backgroundColor,
    },
  });

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar 
        barStyle={theme.dark ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.backgroundColor}
      />
      
      <EditorHeader
        navigation={navigation}
        title={currentDocument?.title || '새 문서'}
        onFocusToggle={() => setFocusMode(!focusMode)}
        focusMode={focusMode}
      />

      <View style={styles.editorContainer}>
        {focusMode && (
          <FocusMode
            text={text}
            cursorPosition={cursorPosition}
            currentSentence={getCurrentSentence()}
            theme={theme}
          />
        )}
        
        <Animated.View style={{ opacity: focusMode ? fadeAnim : 1, flex: 1 }}>
          <TextInput
            ref={textInputRef}
            style={styles.textInput}
            value={text}
            onChangeText={handleTextChange}
            onSelectionChange={handleSelectionChange}
            multiline={true}
            placeholder="글을 작성해보세요..."
            placeholderTextColor={theme.placeholderColor}
            autoCapitalize="sentences"
            autoCorrect={true}
            textContentType="none"
            keyboardAppearance={theme.dark ? 'dark' : 'light'}
          />
        </Animated.View>
      </View>

      <WordCounter text={text} theme={theme} />
      
      {toolbarVisible && (
        <EditorToolbar
          textInputRef={textInputRef}
          theme={theme}
          onFocusToggle={() => setFocusMode(!focusMode)}
          focusMode={focusMode}
        />
      )}
    </KeyboardAvoidingView>
  );
}''',

    "LibraryScreen.js": '''// 문서 라이브러리 화면
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
}''',

    "FocusMode.js": '''// 포커스 모드 컴포넌트
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
}''',

    "EditorToolbar.js": '''// 에디터 툴바 컴포넌트
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
}'''
}

# 파일로 저장
for filename, content in components_structure.items():
    with open(f"react_native_{filename}", "w", encoding="utf-8") as f:
        f.write(content)

print("React Native 컴포넌트 파일들이 생성되었습니다:")
for filename in components_structure.keys():
    print(f"- react_native_{filename}")