import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';

export const useNickname = () => {
  const { session, profile, setProfile } = useAuthStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session && profile && !profile.nickname) {
      setIsDialogOpen(true);
    }
  }, [session, profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedNickname = nickname.trim();
    if (!trimmedNickname || !session) return;
    setIsSubmitting(true);

    try {
      const { count, error: checkError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('nickname', trimmedNickname);

      if (checkError) {
        throw checkError;
      }

      if (count && count > 0) {
        alert('이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.');
        return;
      }

      const { data, error: updateError } = await supabase
        .from('profiles')
        .update({ nickname: trimmedNickname })
        .eq('id', session.user.id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      if (data) {
        alert('닉네임이 성공적으로 설정되었습니다!');
        setProfile(data);
        setIsDialogOpen(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert('오류가 발생했습니다: ' + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isDialogOpen,
    setIsDialogOpen,
    nickname,
    setNickname,
    isSubmitting,
    handleSubmit,
  };
};
