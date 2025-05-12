import { z } from 'zod';

export const registerSchema = z.object({
  // 아이디: 'username' 필드, 영어/숫자 조합, 5-20자
  username: z
    .string()
    .min(5, { message: '아이디는 5자 이상이어야 합니다.' })
    .max(20, { message: '아이디는 20자를 넘을 수 없습니다.' })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: '아이디는 영어와 숫자의 조합으로만 가능합니다.',
    }),

  // 비밀번호: 8자 이상, 영어/숫자/특수문자 포함
  password: z
    .string()
    .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
      message: '비밀번호는 영어, 숫자, 특수문자를 모두 포함해야 합니다.',
    }),

  // 닉네임: 2-10자, 한글/영어/숫자 허용
  nickname: z
    .string()
    .min(2, { message: '닉네임은 2자 이상이어야 합니다.' })
    .max(10, { message: '닉네임은 10자를 넘을 수 없습니다.' })
    .regex(/^[a-zA-Z0-9가-힣]+$/, {
      message: '닉네임은 한글, 영어, 숫자만 사용 가능합니다.',
    }),

  // 이메일: 유효한 이메일 형식
  email: z.string().email({ message: '올바른 이메일 형식이 아닙니다.' }),
});

// 스키마로부터 TypeScript 타입 추론
export type RegisterFormValues = z.infer<typeof registerSchema>;
