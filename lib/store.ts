import { create } from 'zustand';

interface UserProfile {
  userID: string;
  personalID: string;
  userType: 'student' | 'parent' | 'teacher' | 'admin';
  displayName: string;
  studentFullName: string;
  fatherName: string;
  avatar: string;
  email: string | null;
  isPremium: boolean;
  nativeLanguage: 'english' | 'urdu' | 'both';
  isFirstLogin: boolean;
  profileComplete: boolean;
  grade: number;
  board: string;
  createdAt: any;
}

interface AppState {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAuthReady: boolean;
  setAuthReady: (ready: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),
  isAuthReady: false,
  setAuthReady: (ready) => set({ isAuthReady: ready }),
}));
