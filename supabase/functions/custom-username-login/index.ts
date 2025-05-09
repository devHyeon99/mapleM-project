import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      throw new Error('아이디와 비밀번호를 모두 입력해주세요.');
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('username', username)
      .single();

    if (profileError || !profile) {
      throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
    }

    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.admin.getUserById(profile.id);

    if (userError || !user) {
      throw new Error('인증 시스템에서 사용자를 찾을 수 없습니다.');
    }

    const { data: sessionData, error: signInError } =
      await supabaseAdmin.auth.signInWithPassword({
        email: user.email!,
        password: password,
      });

    if (signInError) {
      throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
    }

    return new Response(JSON.stringify(sessionData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Custom Login Function Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
