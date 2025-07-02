import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../../services/axios';
import { User } from '../../../types/api';

// Query keys
export const USERS_QUERY_KEYS = {
  all: ['users'] as const,
  lists: () => [...USERS_QUERY_KEYS.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...USERS_QUERY_KEYS.lists(), { filters }] as const,
  details: () => [...USERS_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...USERS_QUERY_KEYS.details(), id] as const,
};

// API functions
const usersApi = {
  // Get all users with optional search
  getUsers: async (search?: string): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    let users = response.data;
    
    // Client-side search filtering
    if (search) {
      const searchLower = search.toLowerCase();
      users = users.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.username.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.company.name.toLowerCase().includes(searchLower)
      );
    }
    
    return users;
  },

  // Get single user
  getUser: async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  // Get users with pagination (for potential future use)
  getUsersPaginated: async ({ pageParam = 1, search }: { pageParam?: number; search?: string }) => {
    const limit = 8;
    const start = (pageParam - 1) * limit;
    
    // Since JSONPlaceholder doesn't support pagination for users, we'll simulate it
    const allUsers = await usersApi.getUsers(search);
    const users = allUsers.slice(start, start + limit);
    
    return {
      users,
      nextPage: start + limit < allUsers.length ? pageParam + 1 : undefined,
      hasMore: start + limit < allUsers.length,
    };
  },
};

// React Query hooks
export const useUsers = (search?: string) => {
  return useQuery({
    queryKey: USERS_QUERY_KEYS.list({ search }),
    queryFn: () => usersApi.getUsers(search),
    staleTime: 10 * 60 * 1000, // 10 minutes (users change less frequently)
  });
};

export const useUser = (id: number) => {
  return useQuery({
    queryKey: USERS_QUERY_KEYS.detail(id),
    queryFn: () => usersApi.getUser(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

// Prefetch user (useful for hovering over user cards)
export const usePrefetchUser = () => {
  const queryClient = useQueryClient();

  return (id: number) => {
    queryClient.prefetchQuery({
      queryKey: USERS_QUERY_KEYS.detail(id),
      queryFn: () => usersApi.getUser(id),
      staleTime: 10 * 60 * 1000,
    });
  };
}; 