import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RegisterSchema,
  RegisterFormData,
} from '@/features/auth/schemas/registerSchema';
import { signUpWithEmail } from '@/lib/supabase/auth';
import { supabase } from '@/lib/supabase/client';

export const useRegisterForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onBlur',
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const username = watch('username');
  const nickname = watch('nickname');

  // Username 중복 확인 디바운싱
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (username && !errors.username) {
        const { data } = await supabase.functions.invoke('check-duplicates', {
          body: { username },
        });
        if (data?.isUsernameDuplicate) {
          setError('username', {
            type: 'manual',
            message: '이미 사용 중인 아이디입니다.',
          });
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [username, errors.username, setError]);

  // Nickname 중복 확인 디바운싱
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (nickname && !errors.nickname) {
        const { data } = await supabase.functions.invoke('check-duplicates', {
          body: { nickname },
        });
        if (data?.isNicknameDuplicate) {
          setError('nickname', {
            type: 'manual',
            message: '이미 사용 중인 닉네임입니다.',
          });
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [nickname, errors.nickname, setError]);

  // 회원가입 제출 핸들러
  const handleRegister: SubmitHandler<RegisterFormData> = async (data) => {
    setFormError('');
    const { error } = await signUpWithEmail(data);

    if (error) {
      if (error.message.includes('User already registered')) {
        setFormError('이미 가입된 이메일입니다.');
      } else {
        setFormError(error.message);
      }
    } else {
      setIsSuccess(true);
    }
  };

  // 컴포넌트에게 필요한 모든 것을 반환
  return {
    form: {
      register,
      handleSubmit,
      errors,
      isSubmitting,
    },
    states: {
      isSuccess,
      setIsSuccess,
      formError,
    },
    handlers: {
      handleRegister,
    },
  };
};
