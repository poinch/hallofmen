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
  accessToken,
}: {
  endpoint: string;
  method: 'POST' | 'PUT' | 'DELETE';
  data?: any;
  id?: string;
  accessToken: string;
}): Promise<T> {
  const response = await fetch(`/api/${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data, id, accessToken }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }

  return response.json();
}

// Services CRUD
export const createService = (
  data: Omit<Service, 'id' | 'created_at' | 'updated_at'>,
  accessToken: string
) => apiRequest<Service>({ endpoint: 'services', method: 'POST', data, accessToken });

export const updateService = (id: string, data: Partial<Service>, accessToken: string) =>
  apiRequest<Service>({ endpoint: 'services', method: 'PUT', id, data, accessToken });

export const deleteService = (id: string, accessToken: string) =>
  apiRequest({ endpoint: 'services', method: 'DELETE', id, accessToken });

// Team Members CRUD
export const createTeamMember = (
  data: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>,
  accessToken: string
) => apiRequest<TeamMember>({ endpoint: 'team', method: 'POST', data, accessToken });

export const updateTeamMember = (id: string, data: Partial<TeamMember>, accessToken: string) =>
  apiRequest<TeamMember>({ endpoint: 'team', method: 'PUT', id, data, accessToken });

export const deleteTeamMember = (id: string, accessToken: string) =>
  apiRequest({ endpoint: 'team', method: 'DELETE', id, accessToken });

// Gallery CRUD
export const createGalleryItem = (
  data: Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>,
  accessToken: string
) => apiRequest<GalleryItem>({ endpoint: 'gallery', method: 'POST', data, accessToken });

export const updateGalleryItem = (id: string, data: Partial<GalleryItem>, accessToken: string) =>
  apiRequest<GalleryItem>({ endpoint: 'gallery', method: 'PUT', id, data, accessToken });

export const deleteGalleryItem = (id: string, accessToken: string) =>
  apiRequest({ endpoint: 'gallery', method: 'DELETE', id, accessToken });

// Contact CRUD
export const updateContact = (id: string, data: Partial<Contact>, accessToken: string) =>
  apiRequest<Contact>({ endpoint: 'contacts', method: 'PUT', id, data, accessToken });

export const deleteContact = (id: string, accessToken: string) =>
  apiRequest({ endpoint: 'contacts', method: 'DELETE', id, accessToken });

// Hours CRUD
export const updateHours = (id: string, data: Partial<Hours>, accessToken: string) =>
  apiRequest<Hours>({ endpoint: 'hours', method: 'PUT', id, data, accessToken });

export const deleteHours = (id: string, accessToken: string) =>
  apiRequest({ endpoint: 'hours', method: 'DELETE', id, accessToken });
