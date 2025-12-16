/**
 * API Client для работы с проектами
 * Используйте эти функции в клиентских компонентах
 */

import { Project } from '@/types';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

const API_BASE = '/api';

/**
 * Получить все проекты
 */
export async function fetchProjects(includeInactive = false): Promise<Project[]> {
  const url = includeInactive 
    ? `${API_BASE}/projects?all=true` 
    : `${API_BASE}/projects`;
    
  const response = await fetch(url);
  const data: ApiResponse<Project[]> = await response.json();
  
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to fetch projects');
  }
  
  return data.data;
}

/**
 * Получить проект по ID
 */
export async function fetchProjectById(id: number): Promise<Project> {
  const response = await fetch(`${API_BASE}/projects/${id}`);
  const data: ApiResponse<Project> = await response.json();
  
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to fetch project');
  }
  
  return data.data;
}

/**
 * Создать новый проект
 */
export async function createProject(project: Omit<Project, 'id'>): Promise<Project> {
  const response = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
  
  const data: ApiResponse<Project> = await response.json();
  
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to create project');
  }
  
  return data.data;
}

/**
 * Обновить проект
 */
export async function updateProject(
  id: number, 
  updates: Partial<Omit<Project, 'id'>>
): Promise<Project> {
  const response = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  
  const data: ApiResponse<Project> = await response.json();
  
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to update project');
  }
  
  return data.data;
}

/**
 * Удалить проект
 */
export async function deleteProject(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'DELETE',
  });
  
  const data: ApiResponse<void> = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to delete project');
  }
}

/**
 * Поиск проектов
 */
export async function searchProjects(
  query: string,
  field?: 'title' | 'desc' | 'meta'
): Promise<Project[]> {
  const url = field 
    ? `${API_BASE}/search?q=${encodeURIComponent(query)}&field=${field}`
    : `${API_BASE}/search?q=${encodeURIComponent(query)}`;
    
  const response = await fetch(url);
  const data: ApiResponse<Project[]> = await response.json();
  
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Search failed');
  }
  
  return data.data;
}

/**
 * Получить статистику
 */
export async function fetchStats() {
  const response = await fetch(`${API_BASE}/stats`);
  const data = await response.json();
  
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to fetch stats');
  }
  
  return data.data;
}

/**
 * Получить список логотипов технологий
 */
export async function fetchTechLogos(): Promise<string[]> {
  const response = await fetch(`${API_BASE}/techs`);
  const data: ApiResponse<string[]> = await response.json();

  if (!data.success || !data.data) {
    throw new Error(data.error || 'Не удалось загрузить логотипы');
  }

  return data.data;
}

/**
 * Проверить состояние API
 */
export async function checkHealth() {
  const response = await fetch(`${API_BASE}/health`);
  const data = await response.json();
  
  return data;
}
