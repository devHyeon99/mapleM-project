import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  registerSchema,
  type RegisterFormValues,
} from '@/features/auth/schemas/registerSchema';
import { signUpWithEmail } from '@/lib/supabase/auth';
import { checkUsernameExists, checkNicknameExists } from '@/lib/supabase/auth';
import { useNavigate } from 'react-router';

type CheckStatus = 'idle' | 'checking' | 'available' | 'unavailable';

export const useRegisterForm = () => {
  const navigate = useNavigate();

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
    mode: 'onBlur',
  });

  const handleUsernameBlur = async () => {
    const isUsernameValid = await form.trigger('username');
    if (!isUsernameValid) {
      setUsernameStatus('idle');
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

      navigate('/login', {
        state: {
          message: '회원가입이 완료되었습니다. 이메일 인증 후 로그인해주세요.',
        },
        replace: true,
      });
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
    handleUsernameBlur,
    handleNicknameBlur,
    showPassword,
    toggleShowPassword,
  };
};
