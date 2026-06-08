import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function PrimaryButton({ title, onPress, disabled, secondary }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, secondary && styles.secondary, disabled && styles.disabled]}
    >
      <Text style={[styles.text, secondary && styles.secondaryText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: '#111827', padding: 14, borderRadius: 12, alignItems: 'center', marginVertical: 6 },
  secondary: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#d1d5db' },
  disabled: { opacity: 0.5 },
  text: { color: '#fff', fontWeight: '700' },
  secondaryText: { color: '#111827' }
});
