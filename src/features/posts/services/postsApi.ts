import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import api from '../../../services/axios';
import { Post, Comment, CreatePostRequest, UpdatePostRequest } from '../../../types/api';
import toast from 'react-hot-toast';

// Query keys
export const POSTS_QUERY_KEYS = {
  all: ['posts'] as const,
  lists: () => [...POSTS_QUERY_KEYS.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...POSTS_QUERY_KEYS.lists(), { filters }] as const,
  details: () => [...POSTS_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...POSTS_QUERY_KEYS.details(), id] as const,
  comments: (postId: number) => [...POSTS_QUERY_KEYS.all, 'comments', postId] as const,
  infinite: (search?: string) => [...POSTS_QUERY_KEYS.all, 'infinite', { search }] as const,
};

// API functions
const postsApi = {
  // Get all posts with optional search
  getPosts: async (search?: string): Promise<Post[]> => {
    const response = await api.get<Post[]>('/posts');
    let posts = response.data;
    
    // Client-side search filtering
    if (search) {
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return posts;
  },

  // Get posts with pagination for infinite scroll
  getPostsPaginated: async ({ pageParam = 1, search }: { pageParam?: number; search?: string }) => {
    const limit = 10;
    const start = (pageParam - 1) * limit;
    
    let url = `/posts?_start=${start}&_limit=${limit}`;
    const response = await api.get<Post[]>(url);
    let posts = response.data;
    
    // Client-side search filtering
    if (search) {
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return {
      posts,
      nextPage: posts.length === limit ? pageParam + 1 : undefined,
      hasMore: posts.length === limit,
    };
  },

  // Get single post
  getPost: async (id: number): Promise<Post> => {
    const response = await api.get<Post>(`/posts/${id}`);
    return response.data;
  },

  // Get post comments
  getPostComments: async (postId: number): Promise<Comment[]> => {
    const response = await api.get<Comment[]>(`/posts/${postId}/comments`);
    return response.data;
  },

  // Create new post
  createPost: async (data: CreatePostRequest): Promise<Post> => {
    const response = await api.post<Post>('/posts', data);
    return response.data;
  },

  // Update post
  updatePost: async (data: UpdatePostRequest): Promise<Post> => {
    const response = await api.put<Post>(`/posts/${data.id}`, data);
    return response.data;
  },

  // Delete post
  deletePost: async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}`);
  },

  // Get posts by user
  getUserPosts: async (userId: number): Promise<Post[]> => {
    const response = await api.get<Post[]>(`/users/${userId}/posts`);
    return response.data;
  },
};

// React Query hooks
export const usePostsInfinite = (search?: string) => {
  return useInfiniteQuery({
    queryKey: POSTS_QUERY_KEYS.infinite(search),
    queryFn: ({ pageParam }) => postsApi.getPostsPaginated({ pageParam, search }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePosts = (search?: string) => {
  return useQuery({
    queryKey: POSTS_QUERY_KEYS.list({ search }),
    queryFn: () => postsApi.getPosts(search),
    staleTime: 5 * 60 * 1000,
  });
};

export const usePost = (id: number) => {
  return useQuery({
    queryKey: POSTS_QUERY_KEYS.detail(id),
    queryFn: () => postsApi.getPost(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePostComments = (postId: number) => {
  return useQuery({
    queryKey: POSTS_QUERY_KEYS.comments(postId),
    queryFn: () => postsApi.getPostComments(postId),
    enabled: !!postId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUserPosts = (userId: number) => {
  return useQuery({
    queryKey: [...POSTS_QUERY_KEYS.all, 'user', userId],
    queryFn: () => postsApi.getUserPosts(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

// Mutations
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: postsApi.createPost,
    onSuccess: (newPost) => {
      // Invalidate and refetch posts
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEYS.all });
      toast.success('Post created successfully!');
    },
    onError: (error) => {
      console.error('Create post error:', error);
      toast.error('Failed to create post');
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: postsApi.updatePost,
    onSuccess: (updatedPost) => {
      // Update the post in cache
      queryClient.setQueryData(POSTS_QUERY_KEYS.detail(updatedPost.id), updatedPost);
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEYS.lists() });
      toast.success('Post updated successfully!');
    },
    onError: (error) => {
      console.error('Update post error:', error);
      toast.error('Failed to update post');
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: postsApi.deletePost,
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: POSTS_QUERY_KEYS.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEYS.lists() });
      toast.success('Post deleted successfully!');
    },
    onError: (error) => {
      console.error('Delete post error:', error);
      toast.error('Failed to delete post');
    },
  });
}; 