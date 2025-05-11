import { useRegisterForm } from '../hooks/useRegisterForm';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { form, states, handlers } = useRegisterForm();
  const { register, handleSubmit, errors, isSubmitting } = form;
  const { isSuccess, setIsSuccess, formError } = states;
  const { handleRegister } = handlers;

  return (
    <>
      <div className={cn('flex flex-col gap-6', className)} {...props}>
        <Card>
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl font-bold'>MMGG 회원가입</CardTitle>
            <CardDescription>
              회원가입을 통해 다양한 서비스를 이용해보세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className='flex flex-col gap-4'
              onSubmit={handleSubmit(handleRegister)}
            >
              <div className='grid gap-2'>
                <Label htmlFor='username'>아이디</Label>
                <Input
                  id='username'
                  type='text'
                  placeholder='아이디를 입력하세요'
                  {...register('username')}
                />
                {errors.username && (
                  <p className='text-sm text-destructive mt-1'>
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='password'>비밀번호</Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='영문+숫자+특수문자 포함 8자 이상'
                  {...register('password')}
                />
                {errors.password && (
                  <p className='text-sm text-destructive mt-1'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='nickname'>닉네임</Label>
                <Input
                  id='nickname'
                  type='text'
                  placeholder='닉네임을 입력하세요'
                  {...register('nickname')}
                />
                {errors.nickname && (
                  <p className='text-sm text-destructive mt-1'>
                    {errors.nickname.message}
                  </p>
                )}
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='email'>이메일</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='example@email.com'
                  {...register('email')}
                />
                {errors.email && (
                  <p className='text-sm text-destructive mt-1'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {formError && (
                <p className='text-sm text-center font-medium text-destructive'>
                  {formError}
                </p>
              )}

              <div className='py-4'>
                <Button
                  type='submit'
                  className='w-full'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '가입 중...' : '회원가입'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>회원가입 완료!</DialogTitle>
            <DialogDescription>
              가입하신 이메일로 인증 메일을 보냈습니다. 인증 완료 후 로그인
              가능합니다.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
