import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  registerSchema,
  type RegisterFormValues,
} from '@/features/auth/schemas/registerSchema';
import { signUpWithEmail } from '@/lib/supabase/auth';
import { checkUsernameExists, checkNicknameExists } from '@/lib/supabase/auth';

// 중복 확인 상태 타입 (변경 없음)
type CheckStatus = 'idle' | 'checking' | 'available' | 'unavailable';

export const useRegisterForm = () => {
  const [usernameStatus, setUsernameStatus] = useState<CheckStatus>('idle');
  const [nicknameStatus, setNicknameStatus] = useState<CheckStatus>('idle');
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      email: '',
      nickname: '',
    },
    // onBlur 모드는 Zod 유효성 검사를 포커스가 떠날 때 실행합니다.
    mode: 'onBlur',
  });

  // 1. onBlur 이벤트에서 사용할 아이디 중복 검사 함수
  const handleUsernameBlur = async () => {
    // 먼저 Zod의 기본 유효성 검사를 실행합니다.
    const isUsernameValid = await form.trigger('username');
    // 유효성 검사에 실패하면 (예: 글자 수 미만) 중복 검사를 실행하지 않습니다.
    if (!isUsernameValid) {
      setUsernameStatus('idle'); // 상태 초기화
      return;
    }

    setUsernameStatus('checking');
    try {
      const isTaken = await checkUsernameExists(form.getValues('username'));
      if (isTaken) {
        setUsernameStatus('unavailable');
        form.setError('username', { message: '이미 사용 중인 아이디입니다.' });
      } else {
        setUsernameStatus('available');
      }
    } catch (error) {
      console.error(error);
      form.setError('username', { message: '확인 중 오류가 발생했습니다.' });
    }
  };

  // 2. onBlur 이벤트에서 사용할 닉네임 중복 검사 함수
  const handleNicknameBlur = async () => {
    const isNicknameValid = await form.trigger('nickname');
    if (!isNicknameValid) {
      setNicknameStatus('idle');
      return;
    }

    setNicknameStatus('checking');
    try {
      const isTaken = await checkNicknameExists(form.getValues('nickname'));
      if (isTaken) {
        setNicknameStatus('unavailable');
        form.setError('nickname', { message: '이미 사용 중인 닉네임입니다.' });
      } else {
        setNicknameStatus('available');
      }
    } catch (error) {
      console.error(error);
      form.setError('nickname', { message: '확인 중 오류가 발생했습니다.' });
    }
  };

  // onSubmit 로직은 최종 방어선으로 그대로 유지합니다.
  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const [isUsernameTaken, isNicknameTaken] = await Promise.all([
        checkUsernameExists(data.username),
        checkNicknameExists(data.nickname),
      ]);

      let hasError = false;
      if (isUsernameTaken) {
        form.setError('username', { message: '이미 사용 중인 아이디입니다.' });
        hasError = true;
      }
      if (isNicknameTaken) {
        form.setError('nickname', { message: '이미 사용 중인 닉네임입니다.' });
        hasError = true;
      }
      if (hasError) return;

      const response = await signUpWithEmail(data);
      if (response.error) throw response.error;

      alert('회원가입 성공! 이메일을 확인하여 가입을 완료해주세요.');
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);

      if (error instanceof Error) {
        if (error.message === '이미 가입된 이메일입니다.') {
          form.setError('email', { message: '이미 가입된 이메일입니다.' });
        } else {
          alert(error.message);
        }
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return {
    form,
    onSubmit,
    usernameStatus,
    nicknameStatus,
    handleUsernameBlur, // onBlur 핸들러를 UI 컴포넌트로 전달
    handleNicknameBlur, // onBlur 핸들러를 UI 컴포넌트로 전달
    showPassword,
    toggleShowPassword,
  };
};
