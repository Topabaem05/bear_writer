// 글쓰기 에디터 화면
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
}
