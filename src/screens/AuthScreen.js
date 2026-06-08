import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../services/firebase';
import PrimaryButton from '../components/PrimaryButton';
import TextField from '../components/TextField';

export default function AuthScreen() {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit() {
    try {
      setLoading(true);
      if (mode === 'register') {
        if (!name.trim()) throw new Error('Insira o seu nome.');
        const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
        await updateProfile(result.user, { displayName: name.trim() });
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Gerador de CV e Carta</Text>
        <Text style={styles.subtitle}>Crie CVs e cartas profissionais em português ou inglês.</Text>

        {mode === 'register' && <TextField placeholder="Nome" value={name} onChangeText={setName} />}
        <TextField placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <TextField placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />

        <PrimaryButton title={loading ? 'Aguarde...' : mode === 'login' ? 'Entrar' : 'Criar conta'} onPress={submit} disabled={loading} />
        <PrimaryButton secondary title={mode === 'login' ? 'Criar nova conta' : 'Já tenho conta'} onPress={() => setMode(mode === 'login' ? 'register' : 'login')} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f8fafc' },
  card: { backgroundColor: '#fff', borderRadius: 18, padding: 20, borderWidth: 1, borderColor: '#e5e7eb' },
  title: { fontSize: 26, fontWeight: '800', color: '#111827' },
  subtitle: { color: '#6b7280', marginVertical: 12 }
});
