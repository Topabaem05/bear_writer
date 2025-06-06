import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function SplashScreen({ navigation }) {
  const fadeAnim = new Animated.Value(0); // Renamed for clarity
  const { theme } = useTheme();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Increased fade-in duration
      useNativeDriver: true,
    }).start(() => {
      // Auto-transition to Library after 2-3 seconds
      setTimeout(() => navigation.replace('Library'), 1500); // Increased timeout
    });
  }, [fadeAnim, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Animated.Image
        source={require('../assets/images/app-logo.png')}
        style={[
          styles.logoImage,
          { opacity: fadeAnim },
        ]}
        resizeMode="contain"
      />
      <Animated.Text style={[
        styles.appName,
        { opacity: fadeAnim, color: theme.textColor, fontSize: theme.fontSizeHeading1 }
      ]}>
        WriteFlow
      </Animated.Text>
      <Animated.Text style={[
        styles.versionText,
        { opacity: fadeAnim, color: theme.secondaryTextColor, fontSize: theme.fontSizeMetadata }
      ]}>
        Version 1.0.0
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 100, // Adjust as needed
    height: 100, // Adjust as needed
    marginBottom: 20,
  },
  appName: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  versionText: {
    position: 'absolute',
    bottom: 30, // Adjust as needed
    textAlign: 'center',
  },
});
