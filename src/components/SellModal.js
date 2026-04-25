import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

const SellModal = ({ visible = false, onCancel, onConfirm, estimatedCoins = 0 }) => (
  <Modal visible={!!visible} animationType="slide" transparent={true} onRequestClose={onCancel}>
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>Vendre les ressources ?</Text>
        <Text style={styles.content}>Tu vas recevoir environ 💰 {Math.floor(estimatedCoins || 0)}.</Text>

        <View style={styles.row}>
          <Pressable style={styles.cancelBtn} onPress={onCancel}>
            <Text style={styles.text}>Annuler</Text>
          </Pressable>
          <Pressable style={styles.confirmBtn} onPress={onConfirm}>
            <Text style={styles.text}>Vendre</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center' },
  modal: { width: '85%', backgroundColor: '#17172b', borderRadius: 12, padding: 16 },
  title: { color: '#fff', fontSize: 16, fontWeight: '700' },
  content: { color: '#d0d3ff', marginVertical: 12 },
  row: { flexDirection: 'row', gap: 10 },
  cancelBtn: { flex: 1, backgroundColor: '#4b5563', padding: 10, borderRadius: 8, alignItems: 'center' },
  confirmBtn: { flex: 1, backgroundColor: '#f59e0b', padding: 10, borderRadius: 8, alignItems: 'center' },
  text: { color: '#fff', fontWeight: '700' },
});

export default SellModal;
