import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { formatNumber } from '../utils/formatters';

const Machine = ({ machine = {}, cost = 0, onCollect, onUpgrade }) => {
  const produces = Array.isArray(machine?.produces) ? machine.produces : [];

  return (
    <View style={[styles.card, !machine?.unlocked && styles.locked]}>
      <View style={styles.row}>
        <Text style={styles.title}>{machine?.icon || '🏭'} {machine?.name || 'Machine'}</Text>
        <Text style={styles.subtitle}>Lv {machine?.level || 1}</Text>
      </View>

      <Text style={styles.line}>Produit: {produces.join(', ') || 'Aucune ressource'}</Text>

      <View style={styles.actions}>
        <Pressable style={styles.collectBtn} onPress={onCollect} disabled={!machine?.unlocked}>
          <Text style={styles.btnText}>Collecter</Text>
        </Pressable>
        <Pressable style={styles.upgradeBtn} onPress={onUpgrade}>
          <Text style={styles.btnText}>Upgrade ({formatNumber(cost)})</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a31',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  locked: { opacity: 0.75 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  title: { color: '#fff', fontSize: 16, fontWeight: '700' },
  subtitle: { color: '#9ca3ff', fontWeight: '700' },
  line: { color: '#bbbce7', marginBottom: 10 },
  actions: { flexDirection: 'row', gap: 8 },
  collectBtn: { flex: 1, backgroundColor: '#10b981', padding: 8, borderRadius: 8, alignItems: 'center' },
  upgradeBtn: { flex: 1, backgroundColor: '#6366f1', padding: 8, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
});

export default Machine;
