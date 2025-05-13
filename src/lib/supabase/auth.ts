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
    // 1. Edge Function 호출
    const { data, error: invokeError } = await supabase.functions.invoke(
      'custom-username-login',
      { body: formData }
    );

    // invokeError는 FunctionsHttpError를 포함하며, 아래 catch 블록에서 처리됨
    if (invokeError) throw invokeError;

    // 2. 성공 시 세션 설정
    const { error: sessionError } = await supabase.auth.setSession(
      data.session
    );

    if (sessionError) throw sessionError;

    // 에러가 없으면 성공 데이터 반환
    return { data, error: null };
  } catch (err: unknown) {
    // 3. 모든 에러를 여기서 일관되게 처리
    let errorMessage = '알 수 없는 오류가 발생했습니다.';

    // 서버가 4xx, 5xx 상태 코드로 응답하면 FunctionsHttpError가 발생
    if (err instanceof FunctionsHttpError) {
      // Edge Function에서 보낸 JSON 본문을 파싱
      const errorJson = await err.context.json();
      // 서버에서 정의한 에러 메시지를 그대로 사용
      errorMessage = errorJson.error;
    } else if (err instanceof Error) {
      // 세션 설정 오류 등 다른 에러 처리
      errorMessage = err.message;
    }

    // 최종적으로 처리된 에러 메시지를 담은 Error 객체를 던짐
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
