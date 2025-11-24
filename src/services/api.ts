import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  // Emulador Android (Expo em emulador): use 10.0.2.2
  // Dispositivo físico: use o IP da sua máquina na mesma rede, ex: http://192.168.0.10:8080/api
  baseURL: 'http://10.0.2.2:8080/api',
  timeout: 10000,
});

// Interceptor para anexar o JWT em todas as requisições (quando existir)
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@skillpath:token');

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
