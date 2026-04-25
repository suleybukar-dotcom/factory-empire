import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Pressable, View } from 'react-native';
import { useGacha } from '../hooks';

const GachaScreen = () => {
  const { tickets, pull } = useGacha();
  const [result, setResult] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Gacha 🎰</Text>
      <Text style={styles.sub}>Tickets: {tickets || 0}</Text>

      <Pressable style={styles.btn} onPress={() => setResult(pull?.() || null)}>
        <Text style={styles.btnText}>Faire un tirage</Text>
      </Pressable>

      <View style={styles.result}>
        {result ? (
          <Text style={styles.resultText}>{result.icon} {result.name} ({result.rarity})</Text>
        ) : (
          <Text style={styles.resultText}>Aucun tirage pour le moment.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0b1a', padding: 16 },
  title: { color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 8 },
  sub: { color: '#cdd1f6', marginBottom: 16 },
  btn: { backgroundColor: '#a855f7', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
  result: { marginTop: 18, backgroundColor: '#1a1a31', borderRadius: 10, padding: 12 },
  resultText: { color: '#fff' },
});

export default GachaScreen;
