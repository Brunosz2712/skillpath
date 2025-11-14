// src/screens/TrackListScreen.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
  ImageBackground,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TRACKS, Course } from '../data/tracks';

type RouteParams = {
  areaId?: string;
};

const TrackListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { areaId } = (route.params as RouteParams) || {};

  const track =
    TRACKS.find((t) => t.id === areaId) ??
    TRACKS[0];

  const renderItem: ListRenderItem<Course> = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('TrackDetail', {
          trackId: track.id,
          trackName: track.name,
        })
      }
      style={styles.card}
    >
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.root}>
      {/* HERO COM IMAGEM DA TRILHA */}
      <ImageBackground
        source={require('../../assets/images/teconologia1.png')}
        style={styles.heroBackground}
        imageStyle={styles.heroImage}
      >
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroBadge}>TRILHA DE ESTUDOS</Text>
          <Text style={styles.heroTitle}>{track.name}</Text>
          <Text style={styles.heroSubtitle}>{track.description}</Text>
        </View>
      </ImageBackground>

      {/* LISTA DE CURSOS DA TRILHA */}
      <FlatList<Course>
        data={track.courses}
        keyExtractor={(item: Course) => item.id}
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
    color: '#818cf8',
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
    padding: 16,
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
  },
});

export default TrackListScreen;
