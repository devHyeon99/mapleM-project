import { supabase } from './client';
import { FunctionsHttpError } from '@supabase/supabase-js';
import { RegisterFormData } from '@/features/auth/schemas/registerSchema';
import { LoginFormData } from '@/features/auth/schemas/loginSchema';

// 이메일 회원 가입
export const signUpWithEmail = async (formData: RegisterFormData) => {
  const { username, nickname, email, password } = formData;

  const { data: emailExists, error: rpcError } = await supabase.rpc(
    'email_exists',
    {
      email_to_check: email,
    }
  );

  if (rpcError) {
    throw new Error('이메일 확인 중 오류가 발생했습니다: ' + rpcError.message);
  }

  if (emailExists) {
    alert('이미 가입된 이메일입니다. 로그인하거나 다른 이메일을 사용해주세요.');
    throw new Error('이미 가입된 이메일입니다. 다른 이메일을 사용해주세요.');
  }

  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        nickname,
      },
    },
  });
};

// 아이디 + 비밀번호 로그인
export const signInWithUsername = async (formData: LoginFormData) => {
  try {
    const { data, error: invokeError } = await supabase.functions.invoke(
      'custom-username-login',
      {
        body: formData,
      }
    );

    if (invokeError) throw invokeError;
    if (data.error) throw new Error(data.error);

    const { error: sessionError } = await supabase.auth.setSession(
      data.session
    );
    if (sessionError) throw sessionError;

    return { error: null };
  } catch (err: unknown) {
    if (err instanceof FunctionsHttpError) {
      try {
        const errorJson = await err.context.json();
        return {
          error: new Error(
            errorJson.error || '함수 실행 중 오류가 발생했습니다.'
          ),
        };
      } catch {
        return { error: new Error('에러 응답을 처리하는 데 실패했습니다.') };
      }
    }
    if (err instanceof Error) {
      return { error: err };
    }
    return { error: new Error('알 수 없는 오류가 발생했습니다.') };
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
