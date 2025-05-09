import { supabase } from './client';
import { UserProfile } from '@/types/supabase';

// Supabase 회원가입 API + 별도 Profiles 테이블 유저 프로필 정보 저장
export const signUp = async ({
  email,
  password,
  username,
  nickname,
}: Omit<UserProfile, 'id'> & { password: string }) => {
  // 1. Supabase Auth로 사용자 인증 정보 생성
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  // 1-1. 인증 과정에서 에러 발생 시 즉시 중단 및 에러 반환
  if (signUpError) {
    return { data: null, error: signUpError };
  }

  // 1-2. 사용자가 정상적으로 생성되지 않았을 경우 (이메일 인증 등)
  if (!signUpData.user) {
    return {
      data: null,
      error: new Error('회원가입이 정상적으로 되지 않았습니다.'),
    };
  }

  // 2. 생성된 사용자의 ID를 이용해 profiles 테이블에 추가 정보 삽입
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      username,
      nickname,
    })
    .eq('id', signUpData.user.id);

  // 2-1. 프로필 생성 과정에서 에러 발생 시 에러 반환
  if (profileError) {
    // 참고: 이 경우 auth.users에는 사용자가 생성되었지만 profiles에는 없는 상태가 됨.
    return { data: null, error: profileError };
  }

  // 3. 모든 과정이 성공하면 생성된 사용자 정보 반환
  return { data: signUpData, error: null };
};

export const signInWithEmail = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};
