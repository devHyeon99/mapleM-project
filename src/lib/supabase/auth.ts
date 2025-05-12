import { supabase } from './client';
import { FunctionsHttpError } from '@supabase/supabase-js';
import { LoginFormData } from '@/features/auth/schemas/loginSchema';
import { type RegisterFormValues } from '@/features/auth/schemas/registerSchema';

// 이메일 회원 가입
export const signUpWithEmail = async (formData: RegisterFormValues) => {
  const { username, nickname, email, password } = formData;

  const { data: emailExists, error: rpcError } = await supabase.rpc(
    'email_exists',
    { email_to_check: email }
  );

  if (rpcError) {
    throw new Error(`이메일 확인 중 오류가 발생했습니다: ${rpcError.message}`);
  }

  if (emailExists) {
    throw new Error('이미 가입된 이메일입니다.');
  }

  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username, nickname },
    },
  });
};

// 아이디 + 비밀번호 로그인
export const signInWithUsername = async (formData: LoginFormData) => {
  try {
    const { data, error: invokeError } = await supabase.functions.invoke(
      'custom-username-login',
      { body: formData }
    );

    if (invokeError) throw invokeError;
    if (data.error) throw new Error(data.error);

    const { error: sessionError } = await supabase.auth.setSession(
      data.session
    );
    if (sessionError) throw sessionError;

    return { data, error: null };
  } catch (err: unknown) {
    let errorMessage = '알 수 없는 오류가 발생했습니다.';
    if (err instanceof FunctionsHttpError) {
      const errorJson = await err.context.json();
      errorMessage = errorJson.error || '함수 실행 중 오류가 발생했습니다.';
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }
    throw new Error(errorMessage);
  }
};

// 구글 소셜 로그인
export const signInWithGoogle = async () => {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
    },
  });
};

// 로그아웃
export const signOut = async () => {
  return supabase.auth.signOut();
};

// 아이디 중복 확인
export const checkUsernameExists = async (username: string) => {
  const { data, error } = await supabase.rpc('username_exists', {
    username_to_check: username,
  });
  if (error) throw new Error('아이디 확인 중 오류 발생');
  return data;
};

// 닉네임 중복 확인
export const checkNicknameExists = async (nickname: string) => {
  const { data, error } = await supabase.rpc('nickname_exists', {
    nickname_to_check: nickname,
  });
  if (error) throw new Error('닉네임 확인 중 오류 발생');
  return data;
};
