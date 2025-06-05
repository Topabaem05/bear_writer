// 메인 앱 컴포넌트
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
}