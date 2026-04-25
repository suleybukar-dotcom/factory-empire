import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { DailyRewardModal, Machine, ResourceBar, SellModal } from '../components';
import { RESOURCES } from '../constants/gameConfig';
import { useDailyRewards, useProduction, useUpgrades } from '../hooks';

const MainScreen = () => {
  const [showSell, setShowSell] = useState(false);
  const [showDaily, setShowDaily] = useState(false);

  const { machines, collectMachine } = useProduction();
  const { coins = 0, upgradeMachine, getMachineUpgradeCost } = useUpgrades();
  const { daily, dailyRewards, canClaim, claimDailyReward } = useDailyRewards();

  const resourceSnapshot = useMemo(() => {
    const values = {};
    Object.keys(RESOURCES).forEach((key) => {
      values[key] = 0;
    });
    return values;
  }, []);

  const estimatedCoins = 0;
  const machineList = Object.entries(machines || {});
  const todayReward = dailyRewards?.[(daily?.day || 1) - 1];

  return (
    <SafeAreaView style={styles.container}>
      <ResourceBar resources={resourceSnapshot} coins={coins} gems={0} tickets={0} />

      <View style={styles.header}>
        <Text style={styles.title}>Factory Floor</Text>
        <View style={styles.row}>
          <Pressable style={styles.btn} onPress={() => setShowSell(true)}>
            <Text style={styles.btnText}>Vendre Ressources</Text>
          </Pressable>
          <Pressable style={[styles.btn, !canClaim && styles.disabled]} onPress={() => setShowDaily(true)}>
            <Text style={styles.btnText}>Récompense Jour</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {machineList.map(([id, machine]) => (
          <Machine
            key={id}
            machine={machine || {}}
            cost={getMachineUpgradeCost?.(id) || 0}
            onCollect={() => collectMachine?.(id)}
            onUpgrade={() => upgradeMachine?.(id)}
          />
        ))}
      </ScrollView>

      <SellModal
        visible={showSell}
        estimatedCoins={estimatedCoins}
        onCancel={() => setShowSell(false)}
        onConfirm={() => setShowSell(false)}
      />

      <DailyRewardModal
        visible={showDaily}
        reward={todayReward}
        onClose={() => setShowDaily(false)}
        onClaim={() => {
          claimDailyReward?.();
          setShowDaily(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0b1a' },
  header: { padding: 12 },
  title: { color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 10 },
  row: { flexDirection: 'row', gap: 8 },
  btn: { flex: 1, backgroundColor: '#374151', padding: 10, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  disabled: { opacity: 0.6 },
  content: { padding: 12, paddingTop: 0, paddingBottom: 24 },
});

export default MainScreen;
