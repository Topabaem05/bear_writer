# WriteFlow UI Component Library

## Overview
This document defines the reusable UI components for the WriteFlow writing application. Each component is designed to maintain consistency across the app while supporting both light and dark themes.

## Color System

### Light Theme
```
Primary: #007AFF
Background: #FFFFFF
Text: #1C1C1E
Secondary Text: #8E8E93
Border: #E5E5EA
Highlight: #E5F1FF
```

### Dark Theme
```
Primary: #0A84FF
Background: #1C1C1E
Text: #FFFFFF
Secondary Text: #8E8E93
Border: #38383A
Highlight: #2C3A47
```

## Typography Scale

| Level | Size | Weight | Line Height | Usage |
|-------|------|---------|-------------|--------|
| H1 | 24pt | Bold | 1.2 | Page titles |
| H2 | 20pt | Semibold | 1.3 | Section headers |
| H3 | 18pt | Semibold | 1.4 | Subsection headers |
| Body | 16pt | Regular | 1.5 | Main content |
| Caption | 14pt | Regular | 1.4 | Metadata, labels |
| Small | 12pt | Regular | 1.3 | Fine print |

## Core Components

### 1. Button Components

#### Primary Button
```jsx
<TouchableOpacity style={styles.buttonPrimary}>
  <Text style={styles.buttonPrimaryText}>Create New</Text>
</TouchableOpacity>
```

**Properties:**
- Background: Primary color
- Text: White
- Border radius: 8px
- Padding: 12px 24px
- Font weight: Semibold

#### Secondary Button
```jsx
<TouchableOpacity style={styles.buttonSecondary}>
  <Text style={styles.buttonSecondaryText}>Cancel</Text>
</TouchableOpacity>
```

**Properties:**
- Background: Transparent
- Text: Primary color
- Border: 1px solid primary
- Border radius: 8px
- Padding: 12px 24px

#### Icon Button
```jsx
<TouchableOpacity style={styles.iconButton}>
  <Icon name="settings" size={20} />
</TouchableOpacity>
```

**Properties:**
- Size: 44x44px (iOS standard)
- Background: Transparent
- Icon color: Primary or text color
- Tap area: Full button size

### 2. Text Input Components

#### Standard Text Input
```jsx
<TextInput
  style={styles.textInput}
  placeholder="Search documents..."
  placeholderTextColor={colors.textSecondary}
/>
```

**Properties:**
- Border: 1px solid border color
- Border radius: 8px
- Padding: 12px 16px
- Font size: 16pt
- Background: Surface color

#### Search Input
```jsx
<View style={styles.searchContainer}>
  <Icon name="search" style={styles.searchIcon} />
  <TextInput style={styles.searchInput} />
  <TouchableOpacity style={styles.clearButton}>
    <Icon name="x" />
  </TouchableOpacity>
</View>
```

**Properties:**
- Left icon: Search glass
- Right icon: Clear (when active)
- Background: Secondary background
- Border radius: 10px

### 3. List Components

#### Document List Item
```jsx
<TouchableOpacity style={styles.documentItem}>
  <View style={styles.documentIcon}>
    <Icon name="file-text" />
  </View>
  <View style={styles.documentContent}>
    <Text style={styles.documentTitle}>Document Name</Text>
    <Text style={styles.documentPreview}>Preview text...</Text>
    <Text style={styles.documentMeta}>Modified 2 hours ago</Text>
  </View>
  <TouchableOpacity style={styles.favoriteButton}>
    <Icon name="star" />
  </TouchableOpacity>
</TouchableOpacity>
```

**Properties:**
- Padding: 16px
- Border bottom: 1px solid border color
- Icon size: 24x24px
- Content flex: 1
- Swipe actions: Delete, Favorite

#### Folder List Item
```jsx
<TouchableOpacity style={styles.folderItem}>
  <Icon name="folder" style={styles.folderIcon} />
  <Text style={styles.folderName}>Folder Name</Text>
  <Text style={styles.itemCount}>(5)</Text>
  <Icon name="chevron-right" style={styles.chevronIcon} />
</TouchableOpacity>
```

### 4. Navigation Components

#### Navigation Header
```jsx
<View style={styles.navigationHeader}>
  <TouchableOpacity style={styles.backButton}>
    <Icon name="arrow-left" />
  </TouchableOpacity>
  <Text style={styles.headerTitle}>Document Title</Text>
  <View style={styles.headerActions}>
    <TouchableOpacity style={styles.headerAction}>
      <Icon name="share" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.headerAction}>
      <Icon name="more-horizontal" />
    </TouchableOpacity>
  </View>
</View>
```

**Properties:**
- Height: 64px (including status bar)
- Background: Surface color
- Border bottom: 1px solid border color
- Safe area support

#### Tab Bar
```jsx
<View style={styles.tabBar}>
  <TouchableOpacity style={styles.tab}>
    <Icon name="edit" />
    <Text>Edit</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.tab}>
    <Icon name="eye" />
    <Text>Preview</Text>
  </TouchableOpacity>
</View>
```

### 5. Editor Components

#### Markdown Toolbar
```jsx
<View style={styles.markdownToolbar}>
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <TouchableOpacity style={styles.toolbarButton}>
      <Text style={styles.toolbarButtonText}>B</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.toolbarButton}>
      <Text style={styles.toolbarButtonText}>I</Text>
    </TouchableOpacity>
    {/* More buttons */}
  </ScrollView>
</View>
```

**Properties:**
- Background: Surface color
- Height: 44px
- Border top: 1px solid border color
- Horizontal scroll for overflow

#### Status Bar
```jsx
<View style={styles.statusBar}>
  <Text style={styles.statusText}>Words: 245</Text>
  <Text style={styles.statusSeparator}>|</Text>
  <Text style={styles.statusText}>Characters: 1,247</Text>
  <Text style={styles.statusSeparator}>|</Text>
  <Text style={styles.statusText}>Reading time: 2 min</Text>
</View>
```

### 6. Settings Components

#### Toggle Switch
```jsx
<View style={styles.settingRow}>
  <Text style={styles.settingLabel}>Dark Mode</Text>
  <Switch
    value={isDarkMode}
    onValueChange={setIsDarkMode}
    trackColor={{ false: colors.border, true: colors.primary }}
    thumbColor={colors.surface}
  />
</View>
```

#### Slider
```jsx
<View style={styles.settingRow}>
  <Text style={styles.settingLabel}>Font Size</Text>
  <Slider
    style={styles.slider}
    minimumValue={12}
    maximumValue={24}
    value={fontSize}
    onValueChange={setFontSize}
    minimumTrackTintColor={colors.primary}
    maximumTrackTintColor={colors.border}
    thumbTintColor={colors.primary}
  />
  <Text style={styles.settingValue}>{fontSize}pt</Text>
</View>
```

#### Picker
```jsx
<View style={styles.settingRow}>
  <Text style={styles.settingLabel}>Export Format</Text>
  <TouchableOpacity style={styles.picker}>
    <Text style={styles.pickerText}>PDF</Text>
    <Icon name="chevron-down" />
  </TouchableOpacity>
</View>
```

### 7. Modal Components

#### Action Sheet
```jsx
<Modal visible={showActionSheet} transparent animationType="slide">
  <View style={styles.modalOverlay}>
    <View style={styles.actionSheet}>
      <TouchableOpacity style={styles.actionItem}>
        <Icon name="share" />
        <Text>Share</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionItem}>
        <Icon name="trash" />
        <Text>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
```

#### Alert Dialog
```jsx
<Modal visible={showAlert} transparent animationType="fade">
  <View style={styles.alertOverlay}>
    <View style={styles.alertContainer}>
      <Text style={styles.alertTitle}>Delete Document</Text>
      <Text style={styles.alertMessage}>Are you sure you want to delete this document?</Text>
      <View style={styles.alertActions}>
        <TouchableOpacity style={styles.alertButton}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.alertButtonDestructive}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
```

### 8. Loading Components

#### Activity Indicator
```jsx
<View style={styles.loadingContainer}>
  <ActivityIndicator size="large" color={colors.primary} />
  <Text style={styles.loadingText}>Saving...</Text>
</View>
```

#### Skeleton Loader
```jsx
<View style={styles.skeletonItem}>
  <View style={styles.skeletonIcon} />
  <View style={styles.skeletonContent}>
    <View style={styles.skeletonTitle} />
    <View style={styles.skeletonText} />
    <View style={styles.skeletonMeta} />
  </View>
</View>
```

## Animation Guidelines

### Transition Durations
- Fast: 200ms (button presses, toggles)
- Standard: 300ms (screen transitions)
- Slow: 500ms (focus mode changes)

### Easing Functions
- Ease out: For entering animations
- Ease in: For exiting animations
- Ease in-out: For looping animations

### Focus Mode Animation
```javascript
const focusAnimation = Animated.timing(opacity, {
  toValue: isFocused ? 1.0 : 0.3,
  duration: 500,
  easing: Easing.out(Easing.cubic),
  useNativeDriver: true,
});
```

## Responsive Breakpoints

| Device | Width | Layout Considerations |
|--------|-------|---------------------|
| iPhone SE | 375px | Single column, compact toolbar |
| iPhone 12 | 390px | Standard layout |
| iPhone 12 Pro Max | 428px | Wider margins, larger touch targets |
| iPad | 768px+ | Split view support, sidebar navigation |

## Accessibility Standards

### Color Contrast
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI elements: 3:1 minimum

### Touch Targets
- Minimum size: 44x44px
- Recommended spacing: 8px between targets

### Screen Reader Support
- All interactive elements have accessible labels
- Text inputs have proper roles and hints
- Dynamic content changes are announced

## Implementation Examples

### Theme Provider
```jsx
const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const theme = {
    colors: isDarkMode ? darkColors : lightColors,
    spacing: spacing,
    typography: typography,
  };
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### Custom Hook for Theme
```jsx
const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return theme;
};
```

### StyleSheet Example
```jsx
const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.small,
  },
  // More styles...
});
```

This component library ensures consistency across the WriteFlow application while maintaining flexibility for customization and theme switching.