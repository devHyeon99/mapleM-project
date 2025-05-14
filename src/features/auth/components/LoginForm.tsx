import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router';
import {
  LoginSchema,
  LoginFormData,
} from '@/features/auth/schemas/loginSchema';
import { signInWithUsername, signInWithGoogle } from '@/lib/supabase/auth';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GoogleLogo from '@/assets/google.svg?react';
import { Eye, EyeOff, XCircle } from 'lucide-react';

export type LoginFormProps = React.ComponentProps<'div'>;

export function LoginForm({ className, ...props }: LoginFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const passwordValue = watch('password');
  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const clearPassword = () => {
    setValue('password', '', { shouldValidate: true });
  };

  const handleUsernameLogin: SubmitHandler<LoginFormData> = async (
    formData
  ) => {
    setIsPending(true);
    setServerError(null);
    try {
      await signInWithUsername(formData);
    } catch (err) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError('알 수 없는 오류가 발생했습니다.');
      }
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsPending(true);
    setServerError(null);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setServerError(error.message);
      }
    } catch (e) {
      console.error(e);
      setServerError('로그인 중 문제가 발생했습니다.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className={cn('w-full max-w-4xl', className)} {...props}>
      <Card className='overflow-hidden'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <div className='p-6 md:p-8'>
            <form
              onSubmit={handleSubmit(handleUsernameLogin)}
              className='flex flex-col gap-6'
            >
              <CardHeader className='flex flex-col items-center text-center p-0'>
                <CardTitle className='text-2xl font-bold'>
                  MMGG 로그인
                </CardTitle>
                <CardDescription className='text-muted-foreground text-balance text-base'>
                  로그인을 통해 다양한 서비스를 이용해보세요.
                </CardDescription>
              </CardHeader>
              <div className='grid gap-3'>
                <Label htmlFor='username'>아이디</Label>
                <Input id='username' type='text' {...register('username')} />
                {errors.username && (
                  <p className='text-sm text-destructive'>
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='password'>비밀번호</Label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    className='pr-20'
                  />
                  <div className='absolute inset-y-0 right-0 flex items-center pr-0.5'>
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      className='hover:bg-transparent py-2 px-1 h-auto cursor-pointer'
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? (
                        <EyeOff className='size-4 text-muted-foreground' />
                      ) : (
                        <Eye className='size-4 text-muted-foreground' />
                      )}
                      <span className='sr-only'>
                        {showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                      </span>
                    </Button>
                    {passwordValue && (
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='hover:bg-transparent py-2 px-1 h-auto cursor-pointer'
                        onClick={clearPassword}
                      >
                        <XCircle className='size-4 text-muted-foreground' />
                        <span className='sr-only'>비밀번호 지우기</span>
                      </Button>
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className='text-sm text-destructive'>
                    {errors.password.message}
                  </p>
                )}
              </div>
              {serverError && (
                <p className='text-sm text-center font-medium text-destructive'>
                  {serverError}
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
              <button
                type='button'
                className={`gsi-material-button group`}
                onClick={handleGoogleLogin}
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
              <div className='flex justify-center items-center'>
                <Button
                  variant='link'
                  className='!py-0 text-base text-foreground hover:text-primary'
                  asChild
                >
                  <Link to='/register'>이메일 회원가입</Link>
                </Button>
              </div>
            </form>
          </div>
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
