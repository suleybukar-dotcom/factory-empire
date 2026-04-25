import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useMissions } from '../hooks';

const MissionsScreen = () => {
  const { missions, progress, claims, claimMission } = useMissions();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Missions 📋</Text>
      <ScrollView contentContainerStyle={styles.content}>
        {(missions || []).map((mission) => {
          const current = progress?.[mission?.type] || 0;
          const done = current >= (mission?.target || 0);
          const claimed = !!claims?.[mission?.id];
          return (
            <View style={styles.card} key={mission?.id || Math.random().toString()}>
              <Text style={styles.name}>{mission?.name || 'Mission'}</Text>
              <Text style={styles.desc}>Progression: {current}/{mission?.target || 0}</Text>
              <Text style={styles.reward}>Récompense: 💰 {mission?.reward?.coins || 0} • 🎫 {mission?.reward?.tickets || 0} • 💎 {mission?.reward?.gems || 0}</Text>
              <Pressable
                style={[styles.btn, (!done || claimed) && styles.disabled]}
                onPress={() => claimMission?.(mission?.id)}
                disabled={!done || claimed}
              >
                <Text style={styles.btnText}>{claimed ? 'Déjà réclamée' : 'Réclamer'}</Text>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0b1a' },
  title: { color: '#fff', fontSize: 22, fontWeight: '700', padding: 12 },
  content: { padding: 12, paddingTop: 0 },
  card: { backgroundColor: '#1a1a31', borderRadius: 12, padding: 12, marginBottom: 10 },
  name: { color: '#fff', fontWeight: '700', marginBottom: 4 },
  desc: { color: '#cdd1f6', marginBottom: 4 },
  reward: { color: '#facc15', marginBottom: 8 },
  btn: { backgroundColor: '#10b981', padding: 10, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
  disabled: { opacity: 0.6 },
});

export default MissionsScreen;
