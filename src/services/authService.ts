// import api from './api';

// export type User = {
//   id: number;
//   name: string;
//   email: string;
// };

// export type LoginResponse = {
//   token: string;
//   user: User;
// };

// export async function login(email: string, password: string): Promise<LoginResponse> {
//   const { data } = await api.post<LoginResponse>('/auth/login', { email, password });
//   return data;
// }

// export async function signup(payload: {
//   name: string;
//   email: string;
//   password: string;
// }): Promise<LoginResponse | void> {
//   const { data } = await api.post('/auth/signup', payload);
//   return data;
// }

// src/services/authService.ts
// MODO MOCK — sem chamadas HTTP

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

// contador simples só pra gerar IDs diferentes se quiser
let FAKE_USER_ID = 1;

/**
 * Login fake: aceita QUALQUER email/senha
 * e devolve um usuário mockado.
 */
export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  // delay leve só pra parecer requisição real
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    token: 'fake-jwt-token',
    user: {
      id: FAKE_USER_ID,
      name: 'Usuário SkillPath',
      email,
    },
  };
}

/**
 * Signup fake: só finge que cadastrou,
 * incrementa o ID e retorna void.
 */
export async function signup(payload: {
  name: string;
  email: string;
  password: string;
}): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  FAKE_USER_ID = FAKE_USER_ID + 1;

  // se quiser debugar:
  // console.log('Usuário mock cadastrado:', payload);
}
