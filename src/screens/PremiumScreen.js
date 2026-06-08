import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { purchasePremium, restorePurchases } from '../services/payments';
import PrimaryButton from '../components/PrimaryButton';

export default function PremiumScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  async function buy() {
    try {
      setLoading(true);
      const active = await purchasePremium();
      if (active) {
        Alert.alert('Premium ativo', 'A sua subscrição Premium está ativa.');
        navigation.goBack();
      } else {
        Alert.alert('Premium', 'Não foi possível confirmar a subscrição.');
      }
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  }

  async function restore() {
    try {
      setLoading(true);
      const active = await restorePurchases();
      Alert.alert(active ? 'Premium restaurado' : 'Sem subscrição ativa');
      if (active) navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Premium</Text>
      <Text style={styles.price}>2.99 USD/mês</Text>
      <Text style={styles.feature}>✓ CVs e cartas ilimitadas</Text>
      <Text style={styles.feature}>✓ Exportação PDF</Text>
      <Text style={styles.feature}>✓ Templates profissionais futuros</Text>
      <Text style={styles.feature}>✓ Tradução PT/EN</Text>
      <Text style={styles.feature}>✓ Histórico de documentos</Text>

      <PrimaryButton title={loading ? 'Aguarde...' : 'Ativar Premium'} disabled={loading} onPress={buy} />
      <PrimaryButton secondary title="Restaurar compra" disabled={loading} onPress={restore} />
      <Text style={styles.note}>Configure RevenueCat, Google Play Billing e Apple In-App Purchases antes de publicar.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8fafc' },
  title: { fontSize: 28, fontWeight: '900', color: '#111827' },
  price: { fontSize: 24, fontWeight: '800', marginVertical: 14 },
  feature: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb', padding: 14, borderRadius: 12, marginVertical: 5 },
  note: { color: '#6b7280', marginTop: 12 }
});
