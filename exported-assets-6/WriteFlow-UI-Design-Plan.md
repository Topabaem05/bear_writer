# WriteFlow UI Design Plan

## Overview
WriteFlow is a minimalist writing application designed for distraction-free writing with a focus on markdown support and a clean user interface. This document outlines the detailed UI specifications for each screen and mode in the application.

## Design Philosophy
- **Minimalism**: Remove unnecessary elements that distract from the writing process
- **Focus**: Highlight the current writing context while dimming peripheral elements
- **Consistency**: Maintain uniform design language across all screens
- **Accessibility**: Support both light and dark modes with appropriate contrast ratios
- **Flexibility**: Allow customization of key elements through settings

## Color Palette
- **Light Mode**:
  - Background: #FFFFFF
  - Text: #1C1C1E
  - Accent: #007AFF
  - Secondary: #8E8E93
  - Highlight: #E5F1FF
  - Border: #E5E5EA
  
- **Dark Mode**:
  - Background: #1C1C1E
  - Text: #FFFFFF
  - Accent: #0A84FF
  - Secondary: #8E8E93
  - Highlight: #2C3A47
  - Border: #38383A

## Typography
- **Primary Font**: SF Pro Text (iOS) / Roboto (Android)
- **Monospace Font**: SF Mono (iOS) / Roboto Mono (Android)
- **Text Sizes**:
  - Headings: 20-24pt
  - Body: 16-18pt
  - UI Elements: 14-16pt
  - Metadata: 12-14pt

## Screen Specifications

### 1. Splash Screen
**Purpose**: First-launch experience and brand introduction

**UI Elements**:
- App logo (Pen icon)
- App name "WriteFlow"
- Loading animation (subtle fade-in)
- Version information (bottom)

**Interactions**:
- Auto-transition to Library after 2-3 seconds
- Load user preferences during this time
- Restore previous session state

### 2. Document Library
**Purpose**: Central hub for organizing and accessing documents

**UI Elements**:
- Navigation bar with title "Library"
- New document button (+)
- Settings button (gear icon)
- Search bar with filter options
- Folder structure with expandable sections
  - Cloud storage (iCloud, Google Drive)
  - Local storage
  - Recent documents
  - Favorites
- Document list with:
  - Document icon and name
  - Modified date
  - Preview snippet (first line)
  - Favorite indicator (star)

**Interactions**:
- Tap document to open in editor
- Long press for context menu (Rename, Delete, Favorite, etc.)
- Swipe left for quick delete
- Swipe right for quick favorite
- Pull down to refresh
- Tap folder to expand/collapse

### 3. Writing Editor
**Purpose**: Primary writing interface with markdown support

**UI Elements**:
- Navigation bar with:
  - Back button
  - Document title (editable)
  - Focus mode toggle
  - Preview button
  - More options menu
- Text editor area with:
  - Markdown syntax highlighting
  - Blue cursor
  - Line/paragraph spacing
  - Automatic indentation
- Status bar with:
  - Word count
  - Character count
  - Reading time
  - Last saved indicator
- Markdown toolbar with formatting buttons:
  - Bold
  - Italic
  - Heading levels
  - Lists
  - Links
  - Images
  - Code blocks

**Interactions**:
- Tap to position cursor
- Select text for formatting options
- Swipe to scroll
- Pinch to zoom (adjust font size)
- Shake to undo
- Two-finger tap for selection menu
- Automatic saving (2-second intervals)
- Toolbar scrolls horizontally for additional options

### 4. Focus Mode
**Purpose**: Distraction-free writing environment with emphasis on current content

**UI Elements**:
- Simplified header (title only)
- No status bar or toolbar visible
- Current sentence/paragraph highlighted (100% opacity)
- Other text dimmed (30% opacity)
- Cursor always visible
- Minimal UI elements

**Interactions**:
- Tap to exit focus mode
- Cursor movement automatically adjusts focus
- Double tap to toggle between sentence and paragraph focus
- Writing automatically scrolls to maintain cursor visibility

### 5. Settings Screen
**Purpose**: User customization and preference management

**UI Elements**:
- Navigation bar with title "Settings"
- Grouped settings sections:
  - Editor Preferences
    - Focus mode behavior
    - Auto-save interval
    - Keyboard shortcuts
    - Typing sounds
  - Display Options
    - Theme (Light/Dark/System)
    - Font selection
    - Font size
    - Line spacing
    - Text width
  - Sync & Backup
    - Cloud service toggles
    - Backup frequency
    - Export formats
  - About & Help
    - Version info
    - Contact support
    - Privacy policy

**Interactions**:
- Toggle switches for binary options
- Sliders for range values
- Selection menus for multiple choice options
- Immediate application of visual changes
- Confirmation dialogs for critical settings

### 6. Preview Mode
**Purpose**: Rendered view of markdown formatting

**UI Elements**:
- Navigation bar with:
  - Back to edit button
  - Share button
  - Print button
- Rendered markdown content:
  - Formatted headings
  - Styled lists
  - Emphasis (bold/italic)
  - Links and images
  - Code blocks with syntax highlighting
- Reading progress indicator

**Interactions**:
- Scroll to navigate
- Tap links to open
- Pinch to zoom
- Share sheet integration
- Return to edit with single tap

### 7. Search & Filter
**Purpose**: Content discovery and document filtering

**UI Elements**:
- Search bar with query input
- Filter button with options:
  - Date range
  - Tags/keywords
  - Document type
  - Content type
- Results list with:
  - Document name and icon
  - Match context snippets
  - Highlighted search terms
  - Result count
- Sort options (relevance, date, name)
- Filter tags display

**Interactions**:
- Real-time search results as typing
- Tap filter to expand options
- Apply multiple filters simultaneously
- Tap result to open document
- Clear search with X button
- Recent searches displayed on empty query

### 8. Statistics View
**Purpose**: Writing metrics and productivity insights

**UI Elements**:
- Word count graph (daily/weekly/monthly)
- Writing session duration metrics
- Writing speed (words per minute)
- Document length comparison
- Goal progress indicators
- Writing streak calendar

**Interactions**:
- Toggle between different time periods
- Tap on graph points for detailed info
- Set and adjust writing goals
- Export statistics report
- Share achievements

## Responsive Considerations
- Support for different screen sizes and orientations
- Adjustable layout based on device dimensions
- Adaptable keyboard handling
- Split-view support on tablets
- Dynamic type support for accessibility

## Animation Specifications
- Smooth transitions between screens (0.3s duration)
- Subtle feedback animations for user actions
- Fade effects for focus mode (0.5s duration)
- Spring-based animations for interactive elements
- Performance-optimized rendering for text manipulations

## Accessibility Features
- Dynamic Type support
- VoiceOver/TalkBack compatibility
- Sufficient color contrast ratios
- Keyboard navigation support
- Reduced motion option
- Screen reader descriptions for all UI elements

## Implementation Notes
- Use React Native's native components where possible
- Custom TextInput component for editor with performance optimizations
- Implement native modules for advanced text handling
- Utilize Animated API for smooth transitions
- Store preferences in AsyncStorage with cloud backup
- Implement proper keyboard handling and avoidance