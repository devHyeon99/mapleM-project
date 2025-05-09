import { useState } from 'react';
import { cn } from '@/lib/utils';
import { signUp } from '@/lib/supabase/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // 1. 이메일/비밀번호로 Supabase 인증
    const { data: signUpData, error: signUpError } = await signUp({
      email,
      password,
      username,
      nickname,
    });

    if (signUpError || !signUpData.user) {
      setMessage(signUpError?.message ?? '회원가입 실패');
      setLoading(false);
      return;
    }

    setLoading(false);
    console.log(message);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='flex flex-col items-center text-center'>
          <CardTitle className='text-2xl font-bold'>MMGG 회원가입</CardTitle>
          <CardDescription className='text-muted-foreground text-balance'>
            회원가입을 통해 다양한 서비스를 이용해보세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className='flex flex-col gap-6' onSubmit={handleRegister}>
            {/* 아이디 */}
            <div className='grid gap-2'>
              <Label htmlFor='username'>아이디</Label>
              <Input
                id='username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='아이디를 입력하세요'
              />
            </div>

            {/* 비밀번호 */}
            <div className='grid gap-2'>
              <Label htmlFor='password'>비밀번호</Label>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='영문+숫자+특수문자 포함 8자 이상'
              />
            </div>

            {/* 닉네임 */}
            <div className='grid gap-2'>
              <Label htmlFor='nickname'>닉네임</Label>
              <Input
                id='nickname'
                type='text'
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder='닉네임을 입력하세요'
              />
            </div>

            {/* 이메일 */}
            <div className='grid gap-2'>
              <Label htmlFor='email'>이메일</Label>
              <Input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='example@email.com'
              />
            </div>
            {/* 회원가입 버튼 */}
            <div className='py-4'>
              <Button type='submit' className='w-full' disabled={loading}>
                {loading ? '가입 중...' : '회원가입'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
