import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress = 0, height = 8, color = '#667eea' }) => {
  const ratio = Math.min(Math.max(progress, 0), 1);

  return (
    <View style={[styles.track, { height }]}> 
      <View style={[styles.fill, { width: `${ratio * 100}%`, backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
    borderRadius: 999,
    backgroundColor: '#2a2a3f',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
});

export default ProgressBar;
