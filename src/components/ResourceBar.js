import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RESOURCES } from '../constants/gameConfig';
import { formatNumber } from '../utils/formatters';

const ResourceBar = ({ resources = {}, coins = 0, gems = 0, tickets = 0 }) => {
  const resourceEntries = Object.entries(resources || {});

  return (
    <View style={styles.wrapper}>
      <View style={styles.walletRow}>
        <Text style={styles.walletText}>💰 {formatNumber(coins)}</Text>
        <Text style={styles.walletText}>💎 {formatNumber(gems)}</Text>
        <Text style={styles.walletText}>🎫 {formatNumber(tickets)}</Text>
      </View>
      <View style={styles.resourceRow}>
        {resourceEntries.map(([resourceId, amount]) => (
          <View style={styles.pill} key={resourceId}>
            <Text style={styles.pillText}>
              {RESOURCES?.[resourceId]?.icon || '📦'} {formatNumber(amount)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
    backgroundColor: '#141428',
    borderBottomWidth: 1,
    borderBottomColor: '#23233d',
  },
  walletRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  walletText: { color: '#fff', fontWeight: '700' },
  resourceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    backgroundColor: '#20203a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  pillText: { color: '#d6d6f2', fontSize: 12 },
});

export default ResourceBar;
