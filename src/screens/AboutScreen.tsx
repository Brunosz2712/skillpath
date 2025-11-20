// src/screens/AboutScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  ImageBackground,
} from 'react-native';
import { COMMIT_HASH } from '../utils/commitInfo';

const AboutScreen: React.FC = () => {
  return (
    <View style={styles.root}>
      {/* HERO COM IMAGEM DO APP */}
      <ImageBackground
        source={require('../../assets/images/about1.png')}
        style={styles.heroBackground}
        imageStyle={styles.heroImage}
      >
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroBadge}>SOBRE O APP</Text>
          <Text style={styles.heroTitle}>SkillPath</Text>
          <Text style={styles.heroSubtitle}>
            Organize sua transição de carreira com trilhas claras e foco no que
            realmente importa.
          </Text>
        </View>
      </ImageBackground>

      {/* CONTEÚDO */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>O que é o SkillPath?</Text>
        <Text style={styles.sectionText}>
          O SkillPath foi pensado para quem quer mudar de área, mas está
          perdido sobre por onde começar. O app sugere trilhas iniciais em
          Tecnologia, Contabilidade, Administração e Economia, com progresso em
          porcentagem para cada curso.
        </Text>

        <Text style={styles.sectionText}>
          A ideia é tirar o “ruído” do caminho: você escolhe a área de destino,
          acompanha a evolução e enxerga exemplos de empresas onde esse perfil
          pode fazer sentido.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Versão publicada</Text>
          <Text style={styles.cardText}>
            Esta versão do aplicativo está ligada ao commit abaixo, usado como
            referência para a publicação via Firebase App Distribution.
          </Text>

          <Text style={styles.label}>Commit de referência</Text>
          <Text style={styles.commit}>{COMMIT_HASH}</Text>

          <Text style={styles.warning}>
            Sempre que uma nova versão for gerada, lembre-se de atualizar este
            hash. Isso garante a rastreabilidade entre o código enviado e o
            binário publicado.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#020617',
  },
  heroBackground: {
    height: 210,
    justifyContent: 'flex-end',
  },
  heroImage: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(2, 6, 23, 0.78)',
  },
  heroContent: {
    paddingHorizontal: 24,
    paddingBottom: 18,
  },
  heroBadge: {
    fontSize: 12,
    color: '#22c55e',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 26, // ↑ um pouco
    fontWeight: '800',
    color: '#f9fafb',
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 14, // ↑ um pouco
    color: '#cbd5f5',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 16, // ↑ um pouco
    fontWeight: '600',
    color: '#e5e7eb',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 13, // ↑ um pouco
    color: '#9ca3af',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#0b1120',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginTop: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#e5e7eb',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 13, // ↑ um pouco
    color: '#9ca3af',
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#e5e7eb',
    marginBottom: 4,
  },
  commit: {
    fontSize: 13,
    color: '#22c55e',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginBottom: 12,
  },
  warning: {
    fontSize: 12, // ↑ um pouco
    color: '#9ca3af',
  },
});

export default AboutScreen;
