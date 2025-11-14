// src/screens/TrackDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  ListRenderItem,
  ImageBackground,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { useAuth } from '../contexts/AuthContext';
import {
  CourseProgress,
  getUserProgress,
  updateCourseProgress,
  deleteCourseProgress,
  createCourseProgress,
} from '../services/progressService';
import { TRACKS } from '../data/tracks';

type RouteParams = {
  trackId: string;
  trackName: string;
};

const TrackDetailScreen: React.FC = () => {
  const route = useRoute();
  const { trackId, trackName } = route.params as RouteParams;

  const { user } = useAuth();
  const [progressList, setProgressList] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(false);

  const track = TRACKS.find((t) => t.id === trackId);

  async function loadProgress() {
    if (!user) return;

    try {
      setLoading(true);
      const data = await getUserProgress(user.id, trackId);
      setProgressList(data);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível carregar seu progresso.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProgress();
  }, [user]);

  async function handleChangePercent(progress: CourseProgress, value: number) {
    if (!user) return;

    const percent = Math.round(value);
    setProgressList((prev) =>
      prev.map((p) => (p.id === progress.id ? { ...p, percent } : p)),
    );

    try {
      await updateCourseProgress(user.id, progress.id, { percent });
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível atualizar o progresso.');
    }
  }

  async function handleDelete(progress: CourseProgress) {
    if (!user) return;

    Alert.alert('Remover curso', 'Tem certeza que deseja remover esse registro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteCourseProgress(user.id, progress.id);
            setProgressList((prev) => prev.filter((p) => p.id !== progress.id));
          } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Não foi possível remover.');
          }
        },
      },
    ]);
  }

  async function handleInitializeTrack() {
    if (!user || !track) return;

    try {
      setInitializing(true);

      const created: CourseProgress[] = [];

      for (const course of track.courses) {
        const alreadyExists = progressList.some(
          (p) => p.courseId === course.id && p.trackId === track.id,
        );
        if (alreadyExists) continue;

        const newProgress = await createCourseProgress(user.id, {
          trackId: track.id,
          courseId: course.id,
          percent: 0,
        });
        created.push(newProgress);
      }

      if (created.length === 0) {
        Alert.alert(
          'Já inicializado',
          'Todos os cursos dessa trilha já possuem progresso cadastrado.',
        );
        return;
      }

      setProgressList((prev) => [...prev, ...created]);
      Alert.alert('Pronto!', 'Progresso da trilha inicializado com sucesso.');
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Erro',
        'Não foi possível inicializar o progresso. Verifique sua conexão ou API.',
      );
    } finally {
      setInitializing(false);
    }
  }

  if (!track) {
    return (
      <View style={styles.centeredRoot}>
        <Text style={styles.centeredTitle}>Trilha não encontrada</Text>
        <Text style={styles.centeredSubtitle}>
          Volte e selecione uma área válida para visualizar os cursos.
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centeredRoot}>
        <ActivityIndicator />
      </View>
    );
  }

  const renderItem: ListRenderItem<CourseProgress> = ({ item }) => {
    const course = track.courses.find((c) => c.id === item.courseId);

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{course?.name ?? item.courseId}</Text>
          <TouchableOpacity onPress={() => handleDelete(item)}>
            <Text style={styles.removeText}>Remover</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progresso</Text>
          <Text style={styles.progressValue}>{item.percent}%</Text>
        </View>

        <Slider
          value={item.percent}
          minimumValue={0}
          maximumValue={100}
          step={1}
          minimumTrackTintColor="#22c55e"
          maximumTrackTintColor="#334155"
          thumbTintColor="#22c55e"
          onSlidingComplete={(value: number) =>
            handleChangePercent(item, value)
          }
        />
      </View>
    );
  };

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
          <Text style={styles.heroBadge}>PROGRESSO DA TRILHA</Text>
          <Text style={styles.heroTitle}>{trackName}</Text>
          <Text style={styles.heroSubtitle}>
            Ajuste o quanto você já concluiu de cada curso e acompanhe sua
            evolução.
          </Text>
        </View>
      </ImageBackground>

      {/* CONTEÚDO: BOTÃO + LISTA */}
      <View style={styles.content}>
        <TouchableOpacity
          onPress={handleInitializeTrack}
          disabled={initializing}
          style={[styles.initButton, initializing && styles.initButtonDisabled]}
        >
          <Text style={styles.initButtonText}>
            {initializing ? 'Inicializando...' : 'Inicializar progresso da trilha'}
          </Text>
        </TouchableOpacity>

        {progressList.length === 0 ? (
          <Text style={styles.emptyText}>
            Nenhum registro encontrado. Use o botão acima para criar o progresso
            dos cursos dessa trilha.
          </Text>
        ) : (
          <FlatList<CourseProgress>
            data={progressList}
            keyExtractor={(item: CourseProgress) => String(item.id)}
            contentContainerStyle={styles.listContent}
            renderItem={renderItem}
          />
        )}
      </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },
  centeredRoot: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  centeredTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f9fafb',
    marginBottom: 6,
  },
  centeredSubtitle: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
  },
  initButton: {
    marginBottom: 10,
    backgroundColor: '#22c55e',
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
  },
  initButtonDisabled: {
    opacity: 0.7,
  },
  initButtonText: {
    color: '#020617',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyText: {
    fontSize: 13,
    color: '#94a3b8',
  },
  listContent: {
    paddingTop: 12,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#0b1120',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#f9fafb',
    marginRight: 8,
  },
  removeText: {
    fontSize: 11,
    color: '#f87171',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 11,
    color: '#94a3b8',
  },
  progressValue: {
    fontSize: 11,
    fontWeight: '600',
    color: '#22c55e',
  },
});

export default TrackDetailScreen;
