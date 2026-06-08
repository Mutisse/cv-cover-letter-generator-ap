import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { signOut } from 'firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import { auth } from '../services/firebase';
import { isPremiumActive } from '../services/payments';
import { exportTextToPDF } from '../utils/pdf';
import { listDocuments, removeDocument } from '../services/documents';
import PrimaryButton from '../components/PrimaryButton';

const FREE_LIMIT = 3;

export default function HomeScreen({ navigation }) {
  const [documents, setDocuments] = useState([]);
  const [premium, setPremium] = useState(false);
  const user = auth.currentUser;

  const refresh = useCallback(async () => {
    const [docs, premiumActive] = await Promise.all([listDocuments(user.uid), isPremiumActive()]);
    setDocuments(docs);
    setPremium(premiumActive);
  }, [user.uid]);

  useFocusEffect(useCallback(() => { refresh(); }, [refresh]));
  useEffect(() => { navigation.setOptions({ headerRight: () => <Text onPress={() => signOut(auth)} style={styles.logout}>Sair</Text> }); }, [navigation]);

  async function deleteDoc(id) {
    await removeDocument(id);
    refresh();
  }

  async function exportDoc(item) {
    if (!premium) {
      Alert.alert('Premium', 'Ative o Premium para exportar PDF.');
      return;
    }
    await exportTextToPDF(item.title, item.content);
  }

  const limitReached = !premium && documents.length >= FREE_LIMIT;

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Olá, {user.displayName || user.email}</Text>
      <Text style={styles.plan}>Plano: {premium ? 'Premium' : `Grátis (${documents.length}/${FREE_LIMIT})`}</Text>

      {limitReached && <Text style={styles.warning}>Limite grátis atingido. Ative Premium para criar documentos ilimitados.</Text>}

      <PrimaryButton title="Criar CV ou Carta" disabled={limitReached} onPress={() => navigation.navigate('Editor')} />
      <PrimaryButton secondary title="Ver Premium" onPress={() => navigation.navigate('Premium')} />
      <PrimaryButton secondary title="Política e Termos" onPress={() => navigation.navigate('Legal')} />

      <Text style={styles.section}>Meus documentos</Text>
      <FlatList
        data={documents}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>Ainda não existem documentos.</Text>}
        renderItem={({ item }) => (
          <View style={styles.docCard}>
            <Text style={styles.docTitle}>{item.title}</Text>
            <Text style={styles.docType}>{item.type}</Text>
            <Text numberOfLines={4} style={styles.preview}>{item.content}</Text>
            <PrimaryButton title="Exportar PDF" secondary onPress={() => exportDoc(item)} />
            <PrimaryButton title="Apagar" secondary onPress={() => deleteDoc(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, backgroundColor: '#f8fafc' },
  logout: { color: '#111827', fontWeight: '700', marginRight: 12 },
  greeting: { fontSize: 22, fontWeight: '800', color: '#111827' },
  plan: { color: '#6b7280', marginVertical: 6 },
  warning: { backgroundColor: '#fef3c7', color: '#92400e', padding: 12, borderRadius: 12, marginVertical: 8 },
  section: { fontSize: 18, fontWeight: '800', marginTop: 18, marginBottom: 8 },
  empty: { color: '#6b7280', marginTop: 20 },
  docCard: { backgroundColor: '#fff', borderRadius: 16, padding: 14, marginVertical: 8, borderWidth: 1, borderColor: '#e5e7eb' },
  docTitle: { fontSize: 16, fontWeight: '800' },
  docType: { color: '#6b7280', marginBottom: 8 },
  preview: { color: '#374151' }
});
