/**
 * Factory Empire - Idle Tycoon Game
 * Application principale
 */

import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { GameProvider } from './src/context/GameContext';
import AppNavigator from './src/navigation/AppNavigator';

// Écran de chargement
const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <View style={styles.loadingContent}>
      <Text style={styles.loadingIcon}>🏭</Text>
      <Text style={styles.loadingTitle}>Factory Empire</Text>
      <Text style={styles.loadingSubtitle}>Chargement...</Text>
      <ActivityIndicator size="large" color="#667eea" style={styles.loader} />
    </View>
  </View>
);

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulation de chargement initial (pour afficher le splash screen)
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <LoadingScreen />;
  }

  return (
    <GameProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0a0a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  loadingTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  loadingSubtitle: {
    color: '#888',
    fontSize: 16,
    marginBottom: 30,
  },
  loader: {
    marginTop: 10,
  },
});
