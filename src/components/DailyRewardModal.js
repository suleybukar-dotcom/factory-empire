import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

const DailyRewardModal = ({ visible = false, onClose, onClaim, reward }) => {
  return (
    <Modal visible={!!visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>🎁 Récompense quotidienne</Text>
          <Text style={styles.content}>
            💰 +{reward?.coins || 0} | 🎫 +{reward?.tickets || 0} | 💎 +{reward?.gems || 0}
          </Text>
          <View style={styles.row}>
            <Pressable style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.text}>Fermer</Text>
            </Pressable>
            <Pressable style={styles.claimBtn} onPress={onClaim}>
              <Text style={styles.text}>Réclamer</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  modal: { width: '85%', backgroundColor: '#17172b', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#3a3a6a' },
  title: { color: '#fff', fontWeight: '700', fontSize: 18, marginBottom: 8 },
  content: { color: '#d0d3ff', marginBottom: 14 },
  row: { flexDirection: 'row', gap: 8 },
  closeBtn: { flex: 1, backgroundColor: '#4b5563', borderRadius: 8, padding: 10, alignItems: 'center' },
  claimBtn: { flex: 1, backgroundColor: '#10b981', borderRadius: 8, padding: 10, alignItems: 'center' },
  text: { color: '#fff', fontWeight: '700' },
});

export default DailyRewardModal;
