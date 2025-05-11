import { z } from 'zod';

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(4, '아이디는 4자 이상이어야 합니다.')
    .regex(/^[a-zA-Z0-9]+$/, '사용 할 수 없는 아이디 입니다.'),

  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
      '영문, 숫자, 특수문자를 하나 이상 포함해야 합니다.'
    ),

  nickname: z
    .string()
    .min(2, '닉네임은 2자 이상이어야 합니다.')
    .regex(/^[가-힣a-zA-Z0-9]+$/, '사용 할 수 없는 닉네임 입니다.'),

  email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
});

export type RegisterFormData = z.infer<typeof RegisterSchema>;
