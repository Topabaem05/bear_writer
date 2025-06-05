# 추가적인 Context 파일들과 스타일 시스템을 생성하겠습니다.

additional_files = {
    "ThemeContext.js": '''// 테마 관리 Context
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const lightTheme = {
  dark: false,
  backgroundColor: '#FFFFFF',
  textColor: '#1C1C1E',
  secondaryTextColor: '#8E8E93',
  placeholderColor: '#C7C7CC',
  borderColor: '#E5E5EA',
  primaryColor: '#007AFF',
  errorColor: '#FF3B30',
  successColor: '#34C759',
  warningColor: '#FF9500',
  inputBackgroundColor: '#F2F2F7',
  toolbarBackgroundColor: '#F9F9F9',
  toolbarIconColor: '#8E8E93',
  activeButtonColor: '#007AFF',
  activeButtonTextColor: '#FFFFFF',
  focusBackgroundColor: 'rgba(0, 122, 255, 0.1)',
  dimmedTextColor: '#8E8E93',
  fontSize: 16,
  fontFamily: 'SF Mono',
  lineHeight: 1.5,
};

const darkTheme = {
  dark: true,
  backgroundColor: '#000000',
  textColor: '#FFFFFF',
  secondaryTextColor: '#8E8E93',
  placeholderColor: '#48484A',
  borderColor: '#38383A',
  primaryColor: '#0A84FF',
  errorColor: '#FF453A',
  successColor: '#30D158',
  warningColor: '#FF9F0A',
  inputBackgroundColor: '#1C1C1E',
  toolbarBackgroundColor: '#1C1C1E',
  toolbarIconColor: '#8E8E93',
  activeButtonColor: '#0A84FF',
  activeButtonTextColor: '#FFFFFF',
  focusBackgroundColor: 'rgba(10, 132, 255, 0.1)',
  dimmedTextColor: '#48484A',
  fontSize: 16,
  fontFamily: 'SF Mono',
  lineHeight: 1.5,
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 16,
    lineHeight: 1.5,
    fontFamily: 'SF Mono',
  });

  const theme = {
    ...(isDarkMode ? darkTheme : lightTheme),
    ...settings,
  };

  useEffect(() => {
    loadThemeSettings();
  }, []);

  const loadThemeSettings = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      const savedSettings = await AsyncStorage.getItem('editorSettings');
      
      if (savedTheme) {
        setIsDarkMode(JSON.parse(savedTheme));
      }
      
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Failed to load theme settings:', error);
    }
  };

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    try {
      await AsyncStorage.setItem('theme', JSON.stringify(newMode));
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  const updateSettings = async (newSettings) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    try {
      await AsyncStorage.setItem('editorSettings', JSON.stringify(updatedSettings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const value = {
    theme,
    isDarkMode,
    toggleTheme,
    updateSettings,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};''',

    "DocumentContext.js": '''// 문서 관리 Context
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateUUID } from '../utils/helpers';

const DocumentContext = createContext();

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
};

export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [recentDocuments, setRecentDocuments] = useState([]);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const savedDocuments = await AsyncStorage.getItem('documents');
      const savedRecent = await AsyncStorage.getItem('recentDocuments');
      
      if (savedDocuments) {
        setDocuments(JSON.parse(savedDocuments));
      }
      
      if (savedRecent) {
        setRecentDocuments(JSON.parse(savedRecent));
      }
    } catch (error) {
      console.error('Failed to load documents:', error);
    }
  };

  const saveDocuments = async (docs) => {
    try {
      await AsyncStorage.setItem('documents', JSON.stringify(docs));
    } catch (error) {
      console.error('Failed to save documents:', error);
    }
  };

  const createDocument = () => {
    const newDocument = {
      id: generateUUID(),
      title: '새 문서',
      content: '',
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      wordCount: 0,
      characterCount: 0,
      readingTime: 0,
    };

    const updatedDocuments = [newDocument, ...documents];
    setDocuments(updatedDocuments);
    setCurrentDocument(newDocument);
    saveDocuments(updatedDocuments);
    
    return newDocument;
  };

  const updateDocument = (id, updates) => {
    const updatedDocuments = documents.map(doc => {
      if (doc.id === id) {
        const updated = {
          ...doc,
          ...updates,
          lastModified: new Date().toISOString(),
        };
        
        // 통계 계산
        if (updates.content !== undefined) {
          updated.wordCount = countWords(updates.content);
          updated.characterCount = updates.content.length;
          updated.readingTime = calculateReadingTime(updates.content);
          
          // 제목이 비어있으면 첫 번째 줄을 제목으로 사용
          if (!updated.title || updated.title === '새 문서') {
            const firstLine = updates.content.split('\\n')[0];
            updated.title = firstLine.slice(0, 50) || '새 문서';
          }
        }
        
        // 현재 문서 업데이트
        if (currentDocument && currentDocument.id === id) {
          setCurrentDocument(updated);
        }
        
        return updated;
      }
      return doc;
    });

    setDocuments(updatedDocuments);
    saveDocuments(updatedDocuments);
    addToRecent(id);
  };

  const deleteDocument = (id) => {
    const updatedDocuments = documents.filter(doc => doc.id !== id);
    setDocuments(updatedDocuments);
    saveDocuments(updatedDocuments);
    
    if (currentDocument && currentDocument.id === id) {
      setCurrentDocument(null);
    }
  };

  const getDocument = (id) => {
    return documents.find(doc => doc.id === id);
  };

  const openDocument = (id) => {
    const document = getDocument(id);
    if (document) {
      setCurrentDocument(document);
      addToRecent(id);
    }
  };

  const addToRecent = (id) => {
    const updatedRecent = [id, ...recentDocuments.filter(docId => docId !== id)].slice(0, 10);
    setRecentDocuments(updatedRecent);
    AsyncStorage.setItem('recentDocuments', JSON.stringify(updatedRecent));
  };

  const countWords = (text) => {
    return text.trim().split(/\\s+/).filter(word => word.length > 0).length;
  };

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = countWords(text);
    return Math.ceil(words / wordsPerMinute);
  };

  const searchDocuments = (query) => {
    return documents.filter(doc =>
      doc.title.toLowerCase().includes(query.toLowerCase()) ||
      doc.content.toLowerCase().includes(query.toLowerCase())
    );
  };

  const getRecentDocuments = () => {
    return recentDocuments
      .map(id => getDocument(id))
      .filter(doc => doc !== undefined);
  };

  const value = {
    documents,
    currentDocument,
    recentDocuments: getRecentDocuments(),
    createDocument,
    updateDocument,
    deleteDocument,
    getDocument,
    openDocument,
    searchDocuments,
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};''',

    "helpers.js": '''// 유틸리티 함수들
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return '어제';
  if (diffDays < 7) return `${diffDays}일 전`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
  
  return date.toLocaleDateString();
};

export const markdownToHtml = (markdown) => {
  // 간단한 마크다운 변환기
  return markdown
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\\*\\*(.*?)\\*\\*/gim, '<strong>$1</strong>')
    .replace(/\\*(.*?)\\*/gim, '<em>$1</em>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/\\n/gim, '<br>');
};

export const extractFirstLine = (text) => {
  const lines = text.split('\\n');
  const firstLine = lines[0].trim();
  
  // 마크다운 헤더 제거
  return firstLine.replace(/^#+\\s*/, '').slice(0, 50);
};

export const calculateReadingStats = (text) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\\s+/).filter(word => word.length > 0);
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\\s/g, '').length;
  const paragraphs = text.split(/\\n\\s*\\n/).filter(p => p.trim().length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const readingTime = Math.ceil(words.length / wordsPerMinute);

  return {
    words: words.length,
    characters,
    charactersNoSpaces,
    paragraphs: paragraphs.length,
    sentences: sentences.length,
    readingTime: readingTime || 1,
  };
};

export const exportToMarkdown = (document) => {
  return document.content;
};

export const exportToHtml = (document) => {
  const html = markdownToHtml(document.content);
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${document.title}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
               line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1, h2, h3 { color: #333; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 4px; }
        code { background: #f4f4f4; padding: 2px 4px; border-radius: 2px; }
    </style>
</head>
<body>
    ${html}
</body>
</html>`;
};''',

    "package.json": '''{
  "name": "IAWriterClone",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "eject": "expo eject"
  },
  "dependencies": {
    "@react-navigation/native": "^6.0.0",
    "@react-navigation/stack": "^6.0.0",
    "@react-native-async-storage/async-storage": "^1.17.0",
    "react": "18.0.0",
    "react-native": "0.69.0",
    "react-native-vector-icons": "^9.0.0",
    "react-native-gesture-handler": "^2.0.0",
    "react-native-reanimated": "^2.8.0",
    "react-native-safe-area-context": "^4.0.0",
    "react-native-screens": "^3.0.0",
    "react-native-sound": "^0.11.0",
    "react-native-share": "^7.0.0",
    "react-native-document-picker": "^8.0.0",
    "react-native-fs": "^2.18.0",
    "expo": "~46.0.0",
    "expo-status-bar": "~1.4.0",
    "expo-font": "~10.2.0",
    "expo-haptics": "~11.3.0"
  },
  "devDependencies": {
    "@babel/core": "^7.12.9"
  },
  "private": true
}'''
}

# 추가 파일들 저장
for filename, content in additional_files.items():
    with open(f"react_native_{filename}", "w", encoding="utf-8") as f:
        f.write(content)

print("추가 Context 및 설정 파일들이 생성되었습니다:")
for filename in additional_files.keys():
    print(f"- react_native_{filename}")