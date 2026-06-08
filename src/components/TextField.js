import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function TextField(props) {
  return <TextInput placeholderTextColor="#9ca3af" style={[styles.input, props.multiline && styles.multiline]} {...props} />;
}

const styles = StyleSheet.create({
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 12, padding: 12, marginVertical: 6 },
  multiline: { minHeight: 90, textAlignVertical: 'top' }
});
