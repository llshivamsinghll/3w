export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  GET_ME: '/api/auth/me',
  
  GET_POSTS: '/api/posts',
  CREATE_POST: '/api/posts',
  GET_POST: (id) => `/api/posts/${id}`,
  UPDATE_POST: (id) => `/api/posts/${id}`,
  DELETE_POST: (id) => `/api/posts/${id}`,
  LIKE_POST: (id) => `/api/posts/${id}/like`,
  GET_POST_LIKES: (id) => `/api/posts/${id}/likes`,
  ADD_COMMENT: (id) => `/api/posts/${id}/comment`,
  DELETE_COMMENT: (id, commentId) => `/api/posts/${id}/comment/${commentId}`,
};

export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';
