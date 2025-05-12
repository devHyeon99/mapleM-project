import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';

interface UseNicknameOptions {
  autoOpenDialog?: boolean;
  onSuccess?: (newNickname: string) => void;
}

export const useNickname = ({
  autoOpenDialog = false,
  onSuccess,
}: UseNicknameOptions = {}) => {
  const { session, profile, setProfile } = useAuthStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [nickname, setNickname] = useState(profile?.nickname || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [canChangeNickname, setCanChangeNickname] = useState(false);
  const [daysUntilChangeable, setDaysUntilChangeable] = useState(0);

  // autoOpenDialog 옵션이 켜져 있을 때만 실행되는 로직
  useEffect(() => {
    if (autoOpenDialog) {
      if (session && profile && !profile.nickname) {
        setIsDialogOpen(true);
      } else {
        setIsDialogOpen(false);
      }
    }
  }, [session, profile, autoOpenDialog]);

  // 프로필 정보가 변경되면 입력 필드 값 동기화
  useEffect(() => {
    if (profile) {
      const lastChangedStr = profile.nickname_last_changed_at;
      if (!lastChangedStr) {
        setCanChangeNickname(true);
        return;
      }

      const lastChangedDate = new Date(lastChangedStr);
      const today = new Date();
      const timeDiff = today.getTime() - lastChangedDate.getTime();
      const daysPassed = timeDiff / (1000 * 3600 * 24);

      if (daysPassed >= 30) {
        setCanChangeNickname(true);
      } else {
        setCanChangeNickname(false);
        setDaysUntilChangeable(Math.ceil(30 - daysPassed));
      }
    }
  }, [profile]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setErrorMessage(null);

    const trimmedNickname = nickname.trim();
    if (!trimmedNickname || !session) return;
    if (trimmedNickname === profile?.nickname) {
      setErrorMessage('새로운 닉네임과 현재 닉네임이 동일합니다.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { count, error: checkError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('nickname', trimmedNickname)
        .not('id', 'eq', session.user.id);

      if (checkError) throw checkError;
      if (count && count > 0) {
        setErrorMessage(
          '이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.'
        );
        return;
      }

      const { data, error: updateError } = await supabase
        .from('profiles')
        .update({
          nickname: trimmedNickname,
          nickname_last_changed_at: new Date().toISOString(),
        })
        .eq('id', session.user.id)
        .select()
        .single();

      if (updateError) throw updateError;
      if (data) {
        setProfile(data);
        onSuccess?.(trimmedNickname);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage('오류가 발생했습니다: ' + error.message);
      } else {
        setErrorMessage('알 수 없는 오류가 발생했습니다.');
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
    errorMessage,
    setErrorMessage,
    handleSubmit,
    canChangeNickname,
    daysUntilChangeable,
  };
};
