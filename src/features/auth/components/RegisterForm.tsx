import { useRegisterForm } from '@/features/auth/hooks/useRegisterForm';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

export const RegisterForm = () => {
  const {
    form,
    onSubmit,
    usernameStatus,
    nicknameStatus,
    handleUsernameBlur,
    handleNicknameBlur,
    showPassword,
    toggleShowPassword,
  } = useRegisterForm();

  // 상태 메시지 렌더링 함수
  const renderStatusMessage = (
    status: typeof usernameStatus,
    type: '아이디' | '닉네임'
  ) => {
    switch (status) {
      case 'checking':
        return (
          <FormDescription className='text-blue-400'>
            {type} 중복 확인 중입니다...
          </FormDescription>
        );
      case 'available':
        return (
          <FormDescription className='text-green-500'>
            사용 가능한 {type}입니다.
          </FormDescription>
        );
      default:
        return null;
    }
  };

  return (
    <div className='w-full max-w-sm rounded-lg border border-border bg-card p-6'>
      <Form {...form}>
        <h2 className='mb-2 w-full text-center text-2xl font-bold'>
          MMGG 회원가입
        </h2>
        <p className='mb-8 text-center text-muted-foreground'>
          회원가입을 통해 <br />
          MMGG의 다양한 서비스를 이용해보세요.
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>아이디</FormLabel>
                <FormControl>
                  <Input
                    placeholder='영어 + 숫자 5~20자'
                    {...field}
                    onBlur={handleUsernameBlur}
                  />
                </FormControl>
                {renderStatusMessage(usernameStatus, '아이디')}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <div className='relative'>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='영어 + 숫자 + 특수문자 포함 8자 이상'
                      {...field}
                      className='pr-10'
                    />
                  </FormControl>
                  <div className='absolute inset-y-0 right-0 flex items-center pr-0.5'>
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      className='p-2 h-auto hover:bg-transparent cursor-pointer'
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? (
                        <EyeOff
                          className='size-4 text-muted-foreground'
                          aria-hidden='true'
                        />
                      ) : (
                        <Eye
                          className='size-4 text-muted-foreground'
                          aria-hidden='true'
                        />
                      )}
                      <span className='sr-only'>
                        {showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                      </span>
                    </Button>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='nickname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>닉네임</FormLabel>
                <FormControl>
                  <Input
                    placeholder='한글 + 영어 + 숫자 포함 2~10자'
                    {...field}
                    onBlur={handleNicknameBlur}
                  />
                </FormControl>
                {renderStatusMessage(nicknameStatus, '닉네임')}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input placeholder='example@email.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full'>
            가입하기
          </Button>
        </form>
      </Form>
    </div>
  );
};
