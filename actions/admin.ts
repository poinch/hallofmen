import { Database } from '@/lib/types';

type Service = Database['public']['Tables']['services']['Row'];
type TeamMember = Database['public']['Tables']['team_members']['Row'];
type GalleryItem = Database['public']['Tables']['gallery']['Row'];
type Contact = Database['public']['Tables']['contacts']['Row'];
type Hours = Database['public']['Tables']['hours']['Row'];

// Generic API request handler
async function apiRequest<T>({
  endpoint,
  method,
  data,
  id,
}: {
  endpoint: string;
  method: 'POST' | 'PUT' | 'DELETE';
  data?: any;
  id?: string;
}): Promise<T> {
  const response = await fetch(`/api/${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data, id }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }

  return response.json();
}

// Services CRUD
export const createService = (data: Omit<Service, 'id' | 'created_at' | 'updated_at'>) =>
  apiRequest<Service>({ endpoint: 'services', method: 'POST', data });

export const updateService = (id: string, data: Partial<Service>) =>
  apiRequest<Service>({ endpoint: 'services', method: 'PUT', id, data });

export const deleteService = (id: string) =>
  apiRequest({ endpoint: 'services', method: 'DELETE', id });

// Team Members CRUD
export const createTeamMember = (data: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>) =>
  apiRequest<TeamMember>({ endpoint: 'team', method: 'POST', data });

export const updateTeamMember = (id: string, data: Partial<TeamMember>) =>
  apiRequest<TeamMember>({ endpoint: 'team', method: 'PUT', id, data });

export const deleteTeamMember = (id: string) =>
  apiRequest({ endpoint: 'team', method: 'DELETE', id });

// Gallery CRUD
export const createGalleryItem = (data: Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>) =>
  apiRequest<GalleryItem>({ endpoint: 'gallery', method: 'POST', data });

export const updateGalleryItem = (id: string, data: Partial<GalleryItem>) =>
  apiRequest<GalleryItem>({ endpoint: 'gallery', method: 'PUT', id, data });

export const deleteGalleryItem = (id: string) =>
  apiRequest({ endpoint: 'gallery', method: 'DELETE', id });

// Contact CRUD
export async function updateContact(id: string, data: Partial<Contact>) {
  const response = await fetch('/api/contacts', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, data }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

export async function deleteContact(id: string) {
  const response = await fetch('/api/contacts', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

// Hours CRUD
export const updateHours = (id: string, data: Partial<Hours>) =>
  apiRequest<Hours>({ endpoint: 'hours', method: 'PUT', id, data });

export const deleteHours = (id: string) => apiRequest({ endpoint: 'hours', method: 'DELETE', id });
