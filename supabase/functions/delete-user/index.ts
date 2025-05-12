import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

serve(async (req) => {
  // CORS preflight 요청 처리
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Authorization 헤더 존재 여부 먼저 확인
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header is missing' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401, // Unauthorized
        }
      );
    }

    // admin 권한을 가진 Supabase 클라이언트 생성
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 전달받은 JWT로 사용자 정보 조회
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(authHeader.replace('Bearer ', ''));

    // getUser 자체에서 에러가 발생한 경우
    if (userError) {
      throw userError;
    }

    // JWT는 유효하나 해당 유저가 DB에 없는 경우
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404, // Not Found
      });
    }

    // Supabase 내장 관리자 함수로 사용자 삭제
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
      user.id
    );

    if (deleteError) {
      throw deleteError;
    }

    // 성공 응답
    return new Response(JSON.stringify({ message: '회원탈퇴 성공' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    // 모든 에러 처리
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
