import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Feather from 'react-native-vector-icons/Feather';

// DocumentListItem Implementation
export const DocumentListItem = ({
  title,
  previewText,
  metaText,
  isFavorite,
  onPress,
  onToggleFavorite,
  style, // For custom container styling
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.itemContainer, { borderBottomColor: theme.borderColor }, style]}
      onPress={onPress}
    >
      <Feather
        name="file-text"
        size={24}
        color={theme.secondaryTextColor} // Or theme.primaryColor
        style={styles.itemIcon}
      />
      <View style={styles.itemContentContainer}>
        <Text
          style={[
            styles.documentTitle,
            { color: theme.textColor, fontFamily: theme.fontFamily },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.documentPreview,
            { color: theme.secondaryTextColor, fontFamily: theme.fontFamily, fontSize: theme.fontSizeUIMelement },
          ]}
          numberOfLines={1}
        >
          {previewText}
        </Text>
        <Text
          style={[
            styles.documentMeta,
            { color: theme.secondaryTextColor, fontFamily: theme.fontFamily, fontSize: theme.fontSizeMetadata },
          ]}
          numberOfLines={1}
        >
          {metaText}
        </Text>
      </View>
      {onToggleFavorite && (
        <TouchableOpacity onPress={onToggleFavorite} style={styles.favoriteIconContainer}>
          <Feather
            name="star"
            size={22}
            color={isFavorite ? theme.primaryColor : theme.secondaryTextColor}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

// FolderListItem Implementation
export const FolderListItem = ({
  folderName,
  itemCount,
  onPress,
  style, // For custom container styling
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.itemContainer, { borderBottomColor: theme.borderColor }, style]}
      onPress={onPress}
    >
      <Feather
        name="folder"
        size={24}
        color={theme.primaryColor} // Or theme.secondaryTextColor
        style={styles.itemIcon}
      />
      <View style={styles.itemContentContainer}>
        <Text
          style={[styles.folderName, { color: theme.textColor, fontFamily: theme.fontFamily, fontSize: theme.fontSizeBody }]}
          numberOfLines={1}
        >
          {folderName}
        </Text>
      </View>
      <Text
        style={[styles.itemCount, { color: theme.secondaryTextColor, fontFamily: theme.fontFamily, fontSize: theme.fontSizeBody }]}
      >
        {itemCount}
      </Text>
      <Feather
        name="chevron-right"
        size={24}
        color={theme.secondaryTextColor}
        style={styles.chevronIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  itemIcon: {
    marginRight: 16,
  },
  itemContentContainer: {
    flex: 1, // Takes up available space in the middle
    justifyContent: 'center',
  },
  documentTitle: {
    fontWeight: 'bold', // As per spec (or '600' for semibold)
    // fontSize: theme.fontSizeBody, // Applied inline
    marginBottom: 2,
  },
  documentPreview: {
    // fontSize: theme.fontSizeUIMelement, // Applied inline
    marginBottom: 2,
  },
  documentMeta: {
    // fontSize: theme.fontSizeMetadata, // Applied inline
  },
  favoriteIconContainer: {
    paddingLeft: 16, // Space between content and favorite icon
    padding: 5, // Making touch target slightly larger
  },
  folderName: {
    // fontSize: theme.fontSizeBody, // Applied inline
  },
  itemCount: {
    marginHorizontal: 16, // Space around item count
    // fontSize: theme.fontSizeBody, // Applied inline
  },
  chevronIcon: {
    // No specific margin needed if item count and content container handle spacing
  },
});
