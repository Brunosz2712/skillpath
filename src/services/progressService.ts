// // src/services/progressService.ts
// import api from './api';

// export type CourseProgress = {
//   id: number;
//   userId: number;
//   trackId: string;  // 'tech', 'contabilidade', etc.
//   courseId: string; // 'tech-1', 'cont-2', etc.
//   percent: number;  // 0-100
// };

// /**
//  * GET /api/users/{userId}/progress?trackId=...
//  */
// export async function getUserProgress(
//   userId: number,
//   trackId?: string
// ): Promise<CourseProgress[]> {
//   const params = trackId ? { trackId } : undefined;
//   const { data } = await api.get<CourseProgress[]>(
//     `/users/${userId}/progress`,
//     { params }
//   );
//   return data;
// }

// /**
//  * POST /api/users/{userId}/progress
//  * body: { trackId, courseId, percent }
//  */
// export async function createCourseProgress(
//   userId: number,
//   payload: { trackId: string; courseId: string; percent: number }
// ): Promise<CourseProgress> {
//   const { data } = await api.post<CourseProgress>(
//     `/users/${userId}/progress`,
//     payload
//   );
//   return data;
// }

// /**
//  * PUT /api/users/{userId}/progress/{progressId}
//  * body: { percent }
//  */
// export async function updateCourseProgress(
//   userId: number,
//   progressId: number,
//   payload: { percent: number }
// ): Promise<CourseProgress> {
//   const { data } = await api.put<CourseProgress>(
//     `/users/${userId}/progress/${progressId}`,
//     payload
//   );
//   return data;
// }

// /**
//  * DELETE /api/users/{userId}/progress/{progressId}
//  */
// export async function deleteCourseProgress(
//   userId: number,
//   progressId: number
// ): Promise<void> {
//   await api.delete(`/users/${userId}/progress/${progressId}`);
// }

// src/services/progressService.ts
// MODO MOCK — tudo em memória, sem backend

export type CourseProgress = {
  id: number;
  userId: number;
  trackId: string;   // 'tech', 'contabilidade', 'administracao', 'economia'
  courseId: string;  // ex: 'tech-1', 'cont-2' (usa o que vem da tela)
  percent: number;   // 0-100
};

// "banco de dados" em memória
let progressStore: CourseProgress[] = [];
let NEXT_ID = 1;

/**
 * READ: lista progresso do usuário (pode filtrar por trackId)
 */
export async function getUserProgress(
  userId: number,
  trackId?: string
): Promise<CourseProgress[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  let result = progressStore.filter((p) => p.userId === userId);

  if (trackId) {
    result = result.filter((p) => p.trackId === trackId);
  }

  return result;
}

/**
 * CREATE: cria um novo registro de progresso
 */
export async function createCourseProgress(
  userId: number,
  payload: { trackId: string; courseId: string; percent: number }
): Promise<CourseProgress> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const newItem: CourseProgress = {
    id: NEXT_ID++,
    userId,
    trackId: payload.trackId,
    courseId: payload.courseId,
    percent: payload.percent,
  };

  progressStore.push(newItem);
  return newItem;
}

/**
 * UPDATE: altera o percent
 */
export async function updateCourseProgress(
  userId: number,
  progressId: number,
  payload: { percent: number }
): Promise<CourseProgress> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const index = progressStore.findIndex(
    (p) => p.id === progressId && p.userId === userId,
  );

  if (index === -1) {
    // em backend real daria 404; aqui só joga erro
    throw new Error('Progress not found');
  }

  progressStore[index] = {
    ...progressStore[index],
    percent: payload.percent,
  };

  return progressStore[index];
}

/**
 * DELETE: remove um registro
 */
export async function deleteCourseProgress(
  userId: number,
  progressId: number
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  progressStore = progressStore.filter(
    (p) => !(p.id === progressId && p.userId === userId),
  );
}
// kjb