import { createClient, AuthApiError } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// 에러 응답을 생성하는 헬퍼 함수
const createErrorResponse = (message: string, status: number) => {
  return new Response(JSON.stringify({ error: message }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: status,
  });
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { username, password } = await req.json();

    // 400 Bad Request: 요청 정보가 부족할 때
    if (!username || !password) {
      return createErrorResponse('아이디와 비밀번호를 모두 입력해주세요.', 400);
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('username', username)
      .single();

    // 401 Unauthorized: 아이디가 존재하지 않을 때 (비밀번호 오류와 동일한 메시지 사용)
    if (profileError || !profile) {
      return createErrorResponse(
        '아이디 또는 비밀번호가 올바르지 않습니다.',
        401
      );
    }

    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.admin.getUserById(profile.id);

    // 500 Internal Server Error: 서버 내부 데이터 정합성 문제
    if (userError || !user) {
      console.error('Inconsistent data: profile exists but user does not.', {
        profileId: profile.id,
      });
      return createErrorResponse(
        '인증 시스템에서 사용자를 찾을 수 없습니다.',
        500
      );
    }

    const { data: sessionData, error: signInError } =
      await supabaseAdmin.auth.signInWithPassword({
        email: user.email!,
        password: password,
      });

    if (signInError) {
      // 403 Forbidden: 이메일 미인증
      if (
        signInError instanceof AuthApiError &&
        signInError.message === 'Email not confirmed'
      ) {
        return createErrorResponse('이메일 인증을 완료해주세요.', 403);
      }
      // 401 Unauthorized: 비밀번호가 틀렸을 때
      return createErrorResponse(
        '아이디 또는 비밀번호가 올바르지 않습니다.',
        401
      );
    }

    // 200 OK: 성공
    return new Response(JSON.stringify(sessionData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    // 500 Internal Server Error: 예상치 못한 모든 에러
    console.error('Unexpected error in Custom Login Function:', error.message);
    return createErrorResponse(
      '서버에서 예상치 못한 오류가 발생했습니다.',
      500
    );
  }
});
