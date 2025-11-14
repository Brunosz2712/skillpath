// src/screens/SignupScreen.tsx
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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import { useAuth } from '../contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!name || !email || !password) {
      Alert.alert('Ops', 'Preencha todos os campos.');
      return;
    }

    try {
      setLoading(true);
      await signup({ name, email, password });
      Alert.alert('Sucesso', 'Cadastro realizado. Faça login.');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível criar sua conta.');
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
        <View style={styles.header}>
          <Text style={styles.badgeText}>COMECE SUA TRANSIÇÃO</Text>
          <Text style={styles.title}>Criar conta</Text>
          <Text style={styles.subtitle}>
            Em poucos passos você começa a organizar sua mudança de carreira.
          </Text>
        </View>

        <LinearGradient
          colors={['#0f172a', '#020617']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <Text style={styles.cardHeading}>Seja bem-vindo ao SkillPath</Text>
          <Text style={styles.cardSubHeading}>
            Cadastre-se para salvar seu progresso nas trilhas.
          </Text>

          <Text style={[styles.label, { marginTop: 16 }]}>Nome</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Seu nome completo"
            placeholderTextColor="#64748b"
            style={styles.input}
          />

          <Text style={[styles.label, { marginTop: 12 }]}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="seu@email.com"
            placeholderTextColor="#64748b"
            style={styles.input}
          />

          <Text style={[styles.label, { marginTop: 12 }]}>Senha</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Crie uma senha"
            placeholderTextColor="#64748b"
            style={styles.input}
          />

          <TouchableOpacity
            onPress={handleSignup}
            disabled={loading}
            style={[
              styles.primaryButton,
              loading && styles.primaryButtonDisabled,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? 'Enviando...' : 'CRIAR CONTA'}
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.signinContainer}
        >
          <Text style={styles.signinText}>
            Já tem conta?{' '}
            <Text style={styles.signinHighlight}>Fazer login</Text>
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
    fontSize: 30,
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
    fontSize: 17,
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
  primaryButton: {
    marginTop: 18,
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
  signinContainer: {
    marginTop: 18,
    alignItems: 'center',
  },
  signinText: {
    fontSize: 13,
    color: '#e5e7eb',
  },
  signinHighlight: {
    color: '#38bdf8',
    fontWeight: '600',
  },
});

export default SignupScreen;
