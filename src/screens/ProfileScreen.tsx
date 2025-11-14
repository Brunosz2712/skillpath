// src/screens/ProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { CourseProgress, getUserProgress } from '../services/progressService';
import { TRACKS } from '../data/tracks';

type TrackSummary = {
  trackId: string;
  trackName: string;
  averagePercent: number;
};

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<CourseProgress[]>([]);
  const [trackSummaries, setTrackSummaries] = useState<TrackSummary[]>([]);
  const [overallAverage, setOverallAverage] = useState<number | null>(null);

  useEffect(() => {
    async function loadProgress() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getUserProgress(user.id);
        setProgress(data);

        if (data.length === 0) {
          setTrackSummaries([]);
          setOverallAverage(null);
          return;
        }

        const total = data.reduce((sum, p) => sum + p.percent, 0);
        setOverallAverage(Math.round(total / data.length));

        const byTrack: Record<string, { sum: number; count: number }> = {};
        data.forEach((p) => {
          if (!byTrack[p.trackId]) {
            byTrack[p.trackId] = { sum: 0, count: 0 };
          }
          byTrack[p.trackId].sum += p.percent;
          byTrack[p.trackId].count += 1;
        });

        const summaries: TrackSummary[] = Object.entries(byTrack).map(
          ([trackId, { sum, count }]) => {
            const track = TRACKS.find((t) => t.id === trackId);
            return {
              trackId,
              trackName: track?.name ?? trackId,
              averagePercent: Math.round(sum / count),
            };
          },
        );

        setTrackSummaries(summaries);
      } catch (error) {
        console.log(error);
        Alert.alert('Erro', 'Não foi possível carregar seus dados de progresso.');
      } finally {
        setLoading(false);
      }
    }

    loadProgress();
  }, [user]);

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível sair da conta.');
    }
  }

  if (!user) {
    return (
      <View style={styles.centeredRoot}>
        <Text style={styles.centeredTitle}>Nenhum usuário autenticado</Text>
        <Text style={styles.centeredSubtitle}>
          Faça login para visualizar seu perfil e o resumo de progresso.
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

  return (
    <View style={styles.root}>
      {/* HERO COM IMAGEM DE PERFIL */}
      <ImageBackground
        source={require('../../assets/images/perfil1.png')}
        style={styles.heroBackground}
        imageStyle={styles.heroImage}
      >
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroBadge}>PERFIL</Text>
          <Text style={styles.heroTitle}>{user.name}</Text>
          <Text style={styles.heroSubtitle}>{user.email}</Text>
          <Text style={styles.heroSmall}>
            Acompanhe seu avanço nas trilhas e veja o quanto falta para a sua
            transição.
          </Text>
        </View>
      </ImageBackground>

      {/* CONTEÚDO SCROLLÁVEL */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumo geral do progresso</Text>
          {overallAverage === null ? (
            <Text style={styles.cardMuted}>
              Ainda não há progresso registrado nas trilhas.
            </Text>
          ) : (
            <View style={styles.overallRow}>
              <Text style={styles.overallValue}>{overallAverage}</Text>
              <Text style={styles.overallLabel}>% concluído em média</Text>
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>Progresso por trilha</Text>

        {trackSummaries.length === 0 ? (
          <Text style={styles.sectionMuted}>
            Você ainda não iniciou o progresso em nenhuma trilha. Use a aba
            Trilhas para começar.
          </Text>
        ) : (
          trackSummaries.map((summary) => (
            <View key={summary.trackId} style={styles.trackCard}>
              <Text style={styles.trackTitle}>{summary.trackName}</Text>
              <Text style={styles.trackSubtitle}>
                Média de conclusão dos cursos dessa trilha.
              </Text>
              <View style={styles.trackRow}>
                <Text style={styles.trackValue}>{summary.averagePercent}</Text>
                <Text style={styles.trackLabel}>% concluído</Text>
              </View>
            </View>
          ))
        )}

        <TouchableOpacity
          onPress={handleLogout}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
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
    height: 220,
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
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#cbd5f5',
    marginBottom: 4,
  },
  heroSmall: {
    fontSize: 11,
    color: '#94a3b8',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
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
  card: {
    backgroundColor: '#0b1120',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 13,
    color: '#e5e7eb',
    fontWeight: '600',
    marginBottom: 6,
  },
  cardMuted: {
    fontSize: 12,
    color: '#9ca3af',
  },
  overallRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  overallValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#22c55e',
    marginRight: 4,
  },
  overallLabel: {
    fontSize: 13,
    color: '#94a3b8',
  },
  sectionTitle: {
    fontSize: 13,
    color: '#e5e7eb',
    fontWeight: '600',
    marginBottom: 6,
  },
  sectionMuted: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 12,
  },
  trackCard: {
    backgroundColor: '#0b1120',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginBottom: 10,
  },
  trackTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#f9fafb',
    marginBottom: 2,
  },
  trackSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 6,
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  trackValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#22c55e',
    marginRight: 4,
  },
  trackLabel: {
    fontSize: 13,
    color: '#94a3b8',
  },
  logoutButton: {
    marginTop: 16,
    borderRadius: 999,
    backgroundColor: '#f97373',
    paddingVertical: 10,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#020617',
  },
});

export default ProfileScreen;
