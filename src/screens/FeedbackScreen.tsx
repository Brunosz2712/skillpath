// src/screens/FeedbackScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  ListRenderItem,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import {
  Feedback,
  listFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} from '../services/feedbackService';

const FeedbackScreen: React.FC = () => {
  const { user } = useAuth();

  const [rating, setRating] = useState<'1' | '2' | '3' | '4' | '5'>('5');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  async function loadFeedbacks() {
    try {
      setLoadingList(true);
      const data = await listFeedback();
      setFeedbacks(data);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível carregar os feedbacks.');
    } finally {
      setLoadingList(false);
    }
  }

  function resetForm() {
    setRating('5');
    setTitle('');
    setMessage('');
    setEditingId(null);
  }

  async function handleSubmit() {
    if (!user) {
      Alert.alert('Ops', 'Faça login para enviar um feedback.');
      return;
    }

    if (!message.trim()) {
      Alert.alert('Ops', 'Escreva pelo menos um comentário.');
      return;
    }

    try {
      setSaving(true);

      const numericRating = Number(rating);

      if (editingId === null) {
        // CREATE
        const created = await createFeedback({
          userId: user.id,
          rating: numericRating,
          title: title.trim() || undefined,
          message: message.trim(),
        });

        setFeedbacks((prev) => [created, ...prev]);
        resetForm();
        Alert.alert('Obrigado!', 'Seu feedback foi enviado.');
      } else {
        // UPDATE (sem userId no corpo)
        const updated = await updateFeedback(editingId, {
          rating: numericRating,
          title: title.trim() || undefined,
          message: message.trim(),
        });

        setFeedbacks((prev) =>
          prev.map((f) => (f.id === editingId ? updated : f)),
        );
        resetForm();
        Alert.alert('Pronto!', 'Seu feedback foi atualizado.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível salvar o feedback.');
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(item: Feedback) {
    setEditingId(item.id);
    setRating(String(item.rating) as '1' | '2' | '3' | '4' | '5');
    setTitle(item.title ?? '');
    setMessage(item.message);
  }

  async function handleDelete(item: Feedback) {
    Alert.alert(
      'Remover feedback',
      'Tem certeza que deseja remover este comentário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteFeedback(item.id);
              setFeedbacks((prev) => prev.filter((f) => f.id !== item.id));
            } catch (error) {
              console.log(error);
              Alert.alert('Erro', 'Não foi possível remover o feedback.');
            }
          },
        },
      ],
    );
  }

  const renderItem: ListRenderItem<Feedback> = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>
          {item.title && item.title.trim().length > 0
            ? item.title
            : 'Sem título'}
        </Text>
        <Text style={styles.cardRating}>{'★'.repeat(item.rating)}</Text>
      </View>
      <Text style={styles.cardMessage}>{item.message}</Text>
      <View style={styles.cardFooter}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Text style={styles.cardActionEdit}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item)}>
          <Text style={styles.cardActionDelete}>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.root}>
      {/* HERO COM IMAGEM, IGUAL AO ABOUT */}
      <ImageBackground
        source={require('../../assets/images/feedback.webp')}
        style={styles.heroBackground}
        imageStyle={styles.heroImage}
      >
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroBadge}>FEEDBACK</Text>
          <Text style={styles.heroTitle}>Sua opinião importa</Text>
          <Text style={styles.heroSubtitle}>
            Cada comentário ajuda a melhorar o SkillPath e apoiar mais pessoas
            na transição de carreira.
          </Text>
        </View>
      </ImageBackground>

      {/* CONTEÚDO SCROLLÁVEL: FORM + LISTA */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Formulário */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>
            {editingId ? 'Editar feedback' : 'Deixe seu feedback'}
          </Text>

          <Text style={styles.label}>Como você avalia o app?</Text>
          <View style={styles.ratingRow}>
            {(['1', '2', '3', '4', '5'] as const).map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.ratingChip,
                  rating === value && styles.ratingChipActive,
                ]}
                onPress={() => setRating(value)}
              >
                <Text
                  style={[
                    styles.ratingChipText,
                    rating === value && styles.ratingChipTextActive,
                  ]}
                >
                  {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Título (opcional)</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Ex.: App muito intuitivo"
            placeholderTextColor="#64748b"
            style={styles.input}
          />

          <Text style={styles.label}>Comentário</Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Conte o que você mais gostou ou o que podemos melhorar..."
            placeholderTextColor="#64748b"
            style={[styles.input, styles.textArea]}
            multiline
          />

          <View style={styles.formButtonsRow}>
            {editingId && (
              <TouchableOpacity
                onPress={resetForm}
                style={styles.secondaryButton}
              >
                <Text style={styles.secondaryButtonText}>Cancelar edição</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={saving}
              style={[
                styles.primaryButton,
                saving && styles.primaryButtonDisabled,
              ]}
            >
              <Text style={styles.primaryButtonText}>
                {saving
                  ? 'Enviando...'
                  : editingId
                  ? 'Salvar alterações'
                  : 'Enviar feedback'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Lista de feedbacks */}
        <View style={styles.listContainer}>
          <Text style={styles.sectionTitle}>Feedbacks da comunidade</Text>
          {loadingList ? (
            <ActivityIndicator />
          ) : feedbacks.length === 0 ? (
            <Text style={styles.emptyText}>
              Ainda não há feedbacks cadastrados. Que tal ser o primeiro a
              comentar?
            </Text>
          ) : (
            <FlatList<Feedback>
              data={feedbacks}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderItem}
              scrollEnabled={false}
              contentContainerStyle={styles.listContent}
            />
          )}
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

  // HERO (mesma lógica do AboutScreen)
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

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },

  formCard: {
    backgroundColor: '#0b1120',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  formTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e5e7eb',
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: '#cbd5f5',
    marginTop: 8,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  ratingChip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginRight: 6,
  },
  ratingChipActive: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  ratingChipText: {
    fontSize: 12,
    color: '#e5e7eb',
  },
  ratingChipTextActive: {
    color: '#020617',
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#020617',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#f9fafb',
    fontSize: 13,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  formButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  primaryButton: {
    backgroundColor: '#22c55e',
    borderRadius: 999,
    paddingVertical: 9,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginLeft: 8,
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: '#020617',
    fontWeight: '600',
    fontSize: 13,
  },
  secondaryButton: {
    borderRadius: 999,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#64748b',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#e5e7eb',
    fontSize: 12,
  },

  listContainer: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 13,
    color: '#e5e7eb',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  listContent: {
    paddingTop: 4,
    paddingBottom: 12,
  },
  card: {
    backgroundColor: '#020617',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginBottom: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 13,
    color: '#f9fafb',
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  cardRating: {
    fontSize: 12,
    color: '#facc15',
  },
  cardMessage: {
    fontSize: 12,
    color: '#e5e7eb',
    marginBottom: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cardActionEdit: {
    fontSize: 11,
    color: '#38bdf8',
    marginRight: 12,
  },
  cardActionDelete: {
    fontSize: 11,
    color: '#f97373',
  },
});

export default FeedbackScreen;
