import { useForm, SubmitHandler } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GoogleLogo from '@/assets/google.svg?react';
import { Link } from 'react-router';

// 2. react-hook-form에서 사용할 폼 데이터 타입을 정의합니다.
type FormData = {
  username: string;
  password: string;
};

export interface LoginFormProps extends React.ComponentProps<'div'> {
  onUsernameLogin: SubmitHandler<FormData>;
  onGoogleLogin: () => void;
  isPending?: boolean;
  errorMessage?: string | null;
}

export function LoginForm({
  className,
  onUsernameLogin,
  onGoogleLogin,
  isPending = false,
  errorMessage,
  ...props
}: LoginFormProps) {
  // 3. react-hook-form의 핵심 기능들을 가져옵니다.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <div className={cn('w-full max-w-4xl', className)} {...props}>
      <Card className='overflow-hidden'>
        {/* 4. 데스크탑(md 이상)에서만 2단 그리드 레이아웃을 사용합니다. */}
        <CardContent className='grid p-0 md:grid-cols-2'>
          <div className='p-6 md:p-8'>
            <form
              onSubmit={handleSubmit(onUsernameLogin)}
              className='flex flex-col gap-6'
            >
              <div className='flex flex-col items-center text-center'>
                <h1 className='text-2xl font-bold'>MMGG 로그인</h1>
                <p className='text-muted-foreground text-balance'>
                  로그인을 통해 다양한 서비스를 이용해보세요.
                </p>
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='username'>아이디</Label>
                <Input
                  id='username'
                  type='text'
                  {...register('username', {
                    required: '아이디를 입력해주세요.',
                  })}
                />
                {errors.username && (
                  <p className='text-sm text-destructive'>
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className='grid gap-3'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>비밀번호</Label>
                  <a
                    href='#'
                    className='ml-auto text-sm underline-offset-2 hover:underline'
                  >
                    비밀번호를 잊으셨나요?
                  </a>
                </div>
                <Input
                  id='password'
                  type='password'
                  {...register('password', {
                    required: '비밀번호를 입력해주세요.',
                  })}
                />
                {errors.password && (
                  <p className='text-sm text-destructive'>
                    {errors.password.message}
                  </p>
                )}
              </div>
              {errorMessage && (
                <p className='text-sm text-center font-medium text-destructive'>
                  {errorMessage}
                </p>
              )}
              <Button
                type='submit'
                className='w-full text-base'
                disabled={isPending}
              >
                {isPending ? '로그인 중...' : '로그인'}
              </Button>

              <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                <span className='bg-card text-muted-foreground relative z-10 px-2'>
                  OR
                </span>
              </div>

              {/* 5. Google 로그인 버튼은 type="button"으로 지정하여 폼 제출을 방지합니다. */}
              <button
                type='button'
                className={`gsi-material-button group`}
                onClick={onGoogleLogin}
                disabled={isPending}
              >
                <div className='gsi-material-button-state'></div>
                <div className='gsi-material-button-content-wrapper'>
                  <div className='gsi-material-button-icon'>
                    <GoogleLogo className='h-5 w-5' />
                  </div>
                  <span className='gsi-material-button-contents'>
                    Google 계정으로 로그인
                  </span>
                  <span className='hidden'>Google 계정으로 로그인</span>
                </div>
              </button>
              <div className='flex justify-center gap-2'>
                <span>아직 계정이 없으신가요?</span>
                <Link
                  to='/register'
                  className='underline-offset-10 hover:underline'
                >
                  회원가입
                </Link>
              </div>
            </form>
          </div>

          {/* 6. 데스크탑에서는 보이고, 모바일에서는 숨겨지는 이미지 영역입니다. */}
          <div className='bg-muted relative hidden md:block'>
            <img
              src='https://placehold.co/800x1000/000000/FFF?text=MMGG'
              alt='Welcome'
              className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.3]'
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
