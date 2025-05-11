import { z } from 'zod';

export const LoginSchema = z.object({
  username: z.string().min(1, '아이디를 입력해주세요.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

// Zod 스키마로부터 TypeScript 타입을 자동으로 생성
export type LoginFormData = z.infer<typeof LoginSchema>;
