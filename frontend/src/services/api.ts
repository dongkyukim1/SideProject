import axios from 'axios';
import { Resume, CreateResumeRequest, UpdateResumeRequest } from '@/types';
import { getSession, signIn, signOut } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor for adding auth token
api.interceptors.request.use(async (config) => {
  // NextAuth 세션에서 토큰 가져오기
  const session = await getSession();
  const token = session?.user?.accessToken as string;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const resumeApi = {
  create: (data: CreateResumeRequest) => 
    api.post<Resume>('/api/resumes', data),
    
  getAll: () => 
    api.get<Resume[]>('/api/resumes'),
    
  getById: (id: number) => 
    api.get<Resume>(`/api/resumes/${id}`),
    
  update: (id: number, data: UpdateResumeRequest) => 
    api.put<Resume>(`/api/resumes/${id}`, data),
};

export const authApi = {
  login: (provider: string) => {
    // 백엔드 OAuth 엔드포인트로 리디렉션
    if (provider === 'google') {
      window.location.href = `${API_URL}/oauth2/authorization/google`;
    } else if (provider === 'github') {
      window.location.href = `${API_URL}/oauth2/authorization/github`;
    } else {
      // NextAuth 사용 (백업 옵션)
      signIn(provider, { callbackUrl: '/dashboard' });
    }
  },
  
  logout: () => {
    // 백엔드 로그아웃 엔드포인트로 리디렉션
    window.location.href = `${API_URL}/logout`;
  },
}; 