import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const zones = [
  { name: 'Usine Alpha', status: 'Débloquée' },
  { name: 'District Robotique', status: 'Bientôt' },
  { name: 'Complexe Lunaire', status: 'Bientôt' },
];

const MapScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Carte 🗺️</Text>
    {zones.map((zone) => (
      <View key={zone.name} style={styles.card}>
        <Text style={styles.name}>{zone.name}</Text>
        <Text style={styles.status}>{zone.status}</Text>
      </View>
    ))}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0b1a', padding: 12 },
  title: { color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 8 },
  card: { backgroundColor: '#1a1a31', borderRadius: 12, padding: 12, marginBottom: 10 },
  name: { color: '#fff', fontWeight: '700' },
  status: { color: '#cdd1f6' },
});

export default MapScreen;
