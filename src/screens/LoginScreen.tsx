// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Ops', 'Preencha e-mail e senha.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro ao entrar', 'Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <LinearGradient
      colors={['#020617', '#020617']}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Cabeçalho / Branding */}
        <View style={styles.header}>
          <Text style={styles.badgeText}>TRANSIÇÃO DE CARREIRA</Text>
          <Text style={styles.title}>SkillPath</Text>
          <Text style={styles.subtitle}>
            Crie sua rota de estudos para mudar de área com segurança.
          </Text>
        </View>

        {/* Card de login */}
        <LinearGradient
          colors={['#0f172a', '#020617']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <Text style={styles.cardHeading}>Já estuda com a gente?</Text>
          <Text style={styles.cardSubHeading}>
            Faça login para acompanhar sua trilha de transição.
          </Text>

          <Text style={[styles.label, { marginTop: 16 }]}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="seu@email.com"
            placeholderTextColor="#64748b"
            style={styles.input}
          />

          <Text style={[styles.label, { marginTop: 14 }]}>Senha</Text>
          <View style={styles.passwordRow}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secure}
              placeholder="••••••••"
              placeholderTextColor="#64748b"
              style={[styles.input, styles.inputPassword]}
            />
            <TouchableOpacity
              onPress={() => setSecure((prev) => !prev)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={secure ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#94a3b8"
              />
            </TouchableOpacity>
          </View>

          {/* Botão principal – login */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            style={[
              styles.primaryButton,
              loading && styles.primaryButtonDisabled,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? 'Entrando...' : 'ENTRAR'}
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Link de cadastro */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={styles.signupContainer}
        >
          <Text style={styles.signupText}>
            Ainda não tem conta?{' '}
            <Text style={styles.signupHighlight}>Criar conta agora</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 18,
  },
  badgeText: {
    fontSize: 11,
    letterSpacing: 1,
    color: '#818cf8',
    fontWeight: '600',
    marginBottom: 6,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#f9fafb',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#cbd5f5',
  },
  card: {
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  cardHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f9fafb',
    marginBottom: 4,
  },
  cardSubHeading: {
    fontSize: 12,
    color: '#cbd5f5',
  },
  label: {
    fontSize: 13,
    color: '#e5e7eb',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#020617',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#f9fafb',
    fontSize: 14,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputPassword: {
    flex: 1,
    paddingRight: 40,
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
    padding: 4,
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: '#22c55e',
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: '#020617',
    fontWeight: '700',
    fontSize: 14,
  },
  signupContainer: {
    marginTop: 18,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 13,
    color: '#e5e7eb',
  },
  signupHighlight: {
    color: '#38bdf8',
    fontWeight: '600',
  },
});

export default LoginScreen;
