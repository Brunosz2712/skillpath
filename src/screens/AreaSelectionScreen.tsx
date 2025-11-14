// src/screens/AreaSelectionScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ListRenderItem,
  ImageBackground,
} from 'react-native';
import { TRACKS } from '../data/tracks';
import { useNavigation } from '@react-navigation/native';

type AreaItem = {
  id: string;
  name: string;
  description: string;
};

const AreaSelectionScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const areas: AreaItem[] = TRACKS.map((t) => ({
    id: t.id,
    name: t.name,
    description: t.description,
  }));

  const renderItem: ListRenderItem<AreaItem> = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Trilhas', {
          screen: 'TrackList',
          params: { areaId: item.id },
        })
      }
      style={styles.card}
    >
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <Text style={styles.cardLink}>Ver trilha de estudos →</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.root}>
      {/* HERO COM IMAGEM DE FUNDO */}
      <ImageBackground
        source={require('../../assets/images/teconologia1.png')}
        style={styles.heroBackground}
        imageStyle={styles.heroImage}
      >
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroBadge}>CURSOS DE TRANSIÇÃO</Text>
          <Text style={styles.heroTitle}>Cursos para mudar de carreira</Text>
          <Text style={styles.heroSubtitle}>
            Escolha uma área de destino e veja uma trilha com os fundamentos
            essenciais para sair do zero.
          </Text>
        </View>
      </ImageBackground>

      {/* LISTA DE ÁREAS */}
      <FlatList<AreaItem>
        data={areas}
        keyExtractor={(item: AreaItem) => item.id}
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
    height: 230,
    justifyContent: 'flex-end',
  },
  heroImage: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(2, 6, 23, 0.72)', // escurece a imagem
  },
  heroContent: {
    paddingHorizontal: 24,
    paddingBottom: 22,
  },
  heroBadge: {
    fontSize: 11,
    color: '#22c55e',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#f9fafb',
    marginBottom: 6,
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
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f9fafb',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 8,
  },
  cardLink: {
    fontSize: 13,
    color: '#22c55e',
    fontWeight: '500',
  },
});

export default AreaSelectionScreen;
