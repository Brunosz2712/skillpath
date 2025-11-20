// src/services/feedbackService.ts
// VERSÃO REAL — usando API Java via Axios

import api from './api';

export type Feedback = {
  id: number;
  userId: number;
  rating: number;
  title?: string;
  message: string;
  createdAt: string;
};

export type FeedbackInput = {
  userId: number;
  rating: number;
  title?: string;
  message: string;
};

// GET /api/feedback
export async function listFeedback(): Promise<Feedback[]> {
  const { data } = await api.get<Feedback[]>('/feedback');
  return data;
}

// POST /api/feedback
export async function createFeedback(input: FeedbackInput): Promise<Feedback> {
  const { data } = await api.post<Feedback>('/feedback', input);
  return data;
}

// PUT /api/feedback/{id}
export async function updateFeedback(
  id: number,
  input: Omit<FeedbackInput, 'userId'>,
): Promise<Feedback> {
  const { data } = await api.put<Feedback>(`/feedback/${id}`, input);
  return data;
}

// DELETE /api/feedback/{id}
export async function deleteFeedback(id: number): Promise<void> {
  await api.delete(`/feedback/${id}`);
}
