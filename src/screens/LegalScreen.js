import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function LegalScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Política de Privacidade</Text>
      <Text style={styles.text}>
        Esta aplicação recolhe nome, email e informações profissionais introduzidas pelo utilizador para criar CVs e cartas de apresentação. Os dados são guardados na conta do utilizador e não devem ser vendidos a terceiros. O utilizador pode solicitar eliminação dos seus dados.
      </Text>
      <Text style={styles.title}>Termos de Uso</Text>
      <Text style={styles.text}>
        A aplicação ajuda a gerar documentos profissionais, mas o utilizador deve rever todas as informações antes de enviar qualquer candidatura. A subscrição Premium dá acesso a funcionalidades adicionais enquanto estiver ativa.
      </Text>
      <Text style={styles.title}>Dados e Segurança</Text>
      <Text style={styles.text}>
        Em produção, configure regras de segurança no Firebase Firestore para garantir que cada utilizador só acede aos seus próprios documentos.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8fafc' },
  title: { fontSize: 22, fontWeight: '800', color: '#111827', marginTop: 18, marginBottom: 8 },
  text: { color: '#374151', lineHeight: 22, backgroundColor: '#fff', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb' }
});
