// src/services/authService.ts
// AGORA USANDO A API JAVA DE VERDADE

import api from './api';

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

/**
 * Login REAL: chama a API Java em /api/auth/login
 */
export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/login', {
    email,
    password,
  });

  return data;
}

/**
 * Signup REAL: chama a API Java em /api/auth/signup
 * Aqui mantive o retorno como void para não quebrar nada
 * que já esteja esperando Promise<void>.
 * Se quiser que o signup já devolva token+user, dá pra
 * trocar o tipo pra Promise<AuthResponse> e usar o data.
 */
export async function signup(payload: {
  name: string;
  email: string;
  password: string;
}): Promise<void> {
  await api.post('/auth/signup', payload);
}

/**
 * Opcional: recuperar usuário logado via /api/auth/me
 * (caso queira validar sessão depois só com o token)
 */
export async function me(): Promise<AuthUser> {
  const { data } = await api.get<AuthUser>('/auth/me');
  return data;
}
