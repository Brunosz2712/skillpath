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
            Um app para organizar sua transição de carreira com trilhas guiadas
            em diferentes áreas.
          </Text>
        </View>
      </ImageBackground>

      {/* CONTEÚDO */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>O que é o SkillPath?</Text>
        <Text style={styles.sectionText}>
          O SkillPath foi criado para apoiar pessoas que querem mudar de área,
          mas não sabem por onde começar. O app organiza trilhas de estudo
          iniciais em Tecnologia, Contabilidade, Administração e Economia,
          acompanhando o percentual de conclusão de cada curso.
        </Text>

        <Text style={styles.sectionText}>
          A proposta é dar clareza de caminho: você escolhe a área de destino,
          acompanha seu progresso e visualiza exemplos de empresas onde esse
          conhecimento pode ser aplicado.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Versão publicada</Text>
          <Text style={styles.cardText}>
            A versão em execução deve corresponder ao commit abaixo, usado como
            referência na publicação via Firebase App Distribution.
          </Text>

          <Text style={styles.label}>Commit de referência</Text>
          <Text style={styles.commit}>{COMMIT_HASH}</Text>

          <Text style={styles.warning}>
            Caso seja gerada uma nova versão do aplicativo, lembre-se de atualizar
            este hash para manter a rastreabilidade entre o código-fonte enviado
            e o binário publicado.
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
    fontSize: 11,
    color: '#22c55e',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f9fafb',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#cbd5f5',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e5e7eb',
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 10,
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
    fontSize: 14,
    fontWeight: '600',
    color: '#e5e7eb',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#e5e7eb',
    marginBottom: 2,
  },
  commit: {
    fontSize: 13,
    color: '#22c55e',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginBottom: 12,
  },
  warning: {
    fontSize: 11,
    color: '#9ca3af',
  },
});

export default AboutScreen;
