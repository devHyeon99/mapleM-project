import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  nickname: string | null;
  nickname_last_changed_at: string;
  updated_at: string;
}

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setProfile: (profile: Profile | null) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  profile: null,
  session: null,
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session, user: session?.user ?? null }),
  setProfile: (profile) => set({ profile }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
