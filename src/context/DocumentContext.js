// 문서 관리 Context
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
            const firstLine = updates.content.split('\n')[0];
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
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
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
};
