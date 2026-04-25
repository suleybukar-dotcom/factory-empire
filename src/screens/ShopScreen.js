import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useUpgrades } from '../hooks';

const ShopScreen = () => {
  const { coins, employees, hireEmployee, getEmployeeCost } = useUpgrades();
  const employeeList = Object.entries(employees || {});

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Boutique • 💰 {Math.floor(coins || 0)}</Text>
      <ScrollView contentContainerStyle={styles.content}>
        {employeeList.map(([id, employee]) => {
          const cost = getEmployeeCost?.(id) || 0;
          const full = (employee?.count || 0) >= (employee?.maxCount || 0);
          return (
            <View style={styles.card} key={id}>
              <Text style={styles.name}>{employee?.icon || '👤'} {employee?.name || id}</Text>
              <Text style={styles.desc}>Niveau: {employee?.count || 0}/{employee?.maxCount || 0}</Text>
              <Pressable style={[styles.btn, full && styles.disabled]} onPress={() => hireEmployee?.(id)} disabled={full}>
                <Text style={styles.btnText}>Embaucher ({Math.floor(cost)})</Text>
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
  title: { color: '#fff', fontSize: 20, fontWeight: '700', padding: 12 },
  content: { padding: 12, paddingTop: 0 },
  card: { backgroundColor: '#1a1a31', borderRadius: 12, padding: 12, marginBottom: 10 },
  name: { color: '#fff', fontWeight: '700', marginBottom: 6 },
  desc: { color: '#cdd1f6', marginBottom: 8 },
  btn: { backgroundColor: '#6366f1', padding: 10, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
  disabled: { opacity: 0.6 },
});

export default ShopScreen;
