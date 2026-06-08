import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { auth } from '../services/firebase';
import { createDocument } from '../services/documents';
import { generateCV, generateCoverLetter } from '../utils/generator';
import PrimaryButton from '../components/PrimaryButton';
import TextField from '../components/TextField';

export default function EditorScreen({ navigation }) {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    jobTitle: '',
    company: '',
    education: '',
    experience: '',
    skills: '',
    language: 'Português'
  });
  const [saving, setSaving] = useState(false);

  function update(field, value) {
    setProfile((current) => ({ ...current, [field]: value }));
  }

  async function save(type) {
    try {
      setSaving(true);
      const content = type === 'CV' ? generateCV(profile) : generateCoverLetter(profile);
      const title = type === 'CV'
        ? `CV - ${profile.jobTitle || profile.profession || 'Profissional'}`
        : `Carta - ${profile.company || profile.jobTitle || 'Candidatura'}`;

      await createDocument(auth.currentUser.uid, { type, title, content });
      Alert.alert('Sucesso', `${type} criado com sucesso.`);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 28 }}>
        <Text style={styles.title}>Dados profissionais</Text>
        <Text style={styles.note}>Preencha os campos principais. Depois gere CV ou carta.</Text>

        <TextField placeholder="Nome completo" value={profile.fullName} onChangeText={(v) => update('fullName', v)} />
        <TextField placeholder="Área/profissão. Ex: QHSE Assistant" value={profile.profession} onChangeText={(v) => update('profession', v)} />
        <TextField placeholder="Cargo desejado" value={profile.jobTitle} onChangeText={(v) => update('jobTitle', v)} />
        <TextField placeholder="Empresa alvo" value={profile.company} onChangeText={(v) => update('company', v)} />
        <TextField multiline placeholder="Formação académica" value={profile.education} onChangeText={(v) => update('education', v)} />
        <TextField multiline placeholder="Experiência profissional" value={profile.experience} onChangeText={(v) => update('experience', v)} />
        <TextField multiline placeholder="Competências" value={profile.skills} onChangeText={(v) => update('skills', v)} />

        <View style={styles.languageBox}>
          <Text style={styles.languageTitle}>Idioma: {profile.language}</Text>
          <View style={styles.row}>
            <PrimaryButton secondary title="Português" onPress={() => update('language', 'Português')} />
            <PrimaryButton secondary title="English" onPress={() => update('language', 'English')} />
          </View>
        </View>

        <PrimaryButton title={saving ? 'A guardar...' : 'Gerar CV'} disabled={saving} onPress={() => save('CV')} />
        <PrimaryButton secondary title={saving ? 'A guardar...' : 'Gerar Carta'} disabled={saving} onPress={() => save('Carta')} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, backgroundColor: '#f8fafc' },
  title: { fontSize: 24, fontWeight: '800', color: '#111827' },
  note: { color: '#6b7280', marginVertical: 8 },
  languageBox: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 14, padding: 12, marginVertical: 8 },
  languageTitle: { fontWeight: '700', marginBottom: 6 },
  row: { flexDirection: 'row', gap: 8 }
});
