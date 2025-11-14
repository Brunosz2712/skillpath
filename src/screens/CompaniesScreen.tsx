// src/screens/CompaniesScreen.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ListRenderItem,
  ImageBackground,
} from 'react-native';
import { TRACKS, Track } from '../data/tracks';

const CompaniesScreen: React.FC = () => {
  const renderItem: ListRenderItem<Track> = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>

      <Text style={styles.sectionTitle}>
        Exemplos de empresas / contextos:
      </Text>
      {item.companies.map((company: string, index: number) => (
        <View key={index} style={styles.companyRow}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.companyText}>{company}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.root}>
      {/* HERO COM IMAGEM DE EMPRESAS */}
      <ImageBackground
        source={require('../../assets/images/empresa1.png')}
        style={styles.heroBackground}
        imageStyle={styles.heroImage}
      >
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroBadge}>MERCADO & OPORTUNIDADES</Text>
          <Text style={styles.heroTitle}>Onde o SkillPath te leva</Text>
          <Text style={styles.heroSubtitle}>
            Veja exemplos de empresas e contextos em que cada trilha pode abrir
            portas na sua transição de carreira.
          </Text>
        </View>
      </ImageBackground>

      {/* LISTA DE TRILHAS + EMPRESAS */}
      <FlatList<Track>
        data={TRACKS}
        keyExtractor={(item: Track) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
      />
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
    paddingBottom: 20,
  },
  heroBadge: {
    fontSize: 11,
    color: '#22c55e',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 6,
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
  listContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#0b1120',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#f9fafb',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    color: '#e5e7eb',
    fontWeight: '600',
    marginBottom: 4,
  },
  companyRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bullet: {
    color: '#22c55e',
    marginRight: 4,
  },
  companyText: {
    fontSize: 12,
    color: '#e5e7eb',
    flex: 1,
  },
});

export default CompaniesScreen;
