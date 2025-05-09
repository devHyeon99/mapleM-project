import { useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';

export const useAuthInitializer = () => {
  const { setProfile, setSession, setIsLoading } = useAuthStore();

  useEffect(() => {
    setIsLoading(true);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);

        // supabase 문서에서 onAuthStateChange 내에는 async 을 직접 사용하지 말라 되어있음 데드락 현상이 일어남. 그래서 setTimeout을 활용해서 async 사용
        setTimeout(async () => {
          if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
            if (session) {
              try {
                const { data: profile } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', session.user.id)
                  .single();
                setProfile(profile);
              } catch (error) {
                console.error('프로필 정보 로딩 에러:', error);
                setProfile(null);
              }
            }
          } else if (event === 'SIGNED_OUT') {
            setProfile(null);
          }

          if (event === 'INITIAL_SESSION' || event === 'SIGNED_OUT') {
            setIsLoading(false);
          }
        }, 0);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [setSession, setProfile, setIsLoading]);
};
