import { CharacterData } from '@/types/character';

interface BasicInfoProps {
  character: CharacterData;
}

export function CharacterBasicInfo({ character }: BasicInfoProps) {
  const basic = character.basic;

  return (
    <section aria-labelledby='basic-info-title' className='flex-1 space-y-2'>
      <h3 id='basic-info-title' className='text-xl font-bold tracking-[0.2rem]'>
        {basic.character_name}
      </h3>

      <dl className='space-y-3'>
        <div className='flex gap-2'>
          <dt className='font-medium w-25'>서버</dt>
          <dd>{basic.world_name}</dd>
        </div>

        <div className='flex gap-2'>
          <dt className='font-medium w-25'>레벨</dt>
          <dd>{basic.character_level}</dd>
        </div>

        <div className='flex gap-2'>
          <dt className='font-medium w-25'>직업</dt>
          <dd>{basic.character_job_name}</dd>
        </div>

        <div className='flex gap-2'>
          <dt className='font-medium w-25'>성별</dt>
          <dd>{basic.character_gender === 'Male' ? '남자' : '여자'}</dd>
        </div>

        <div className='flex gap-2'>
          <dt className='font-medium w-25'>경험치</dt>
          <dd>{(basic.character_exp ?? 0).toLocaleString()}</dd>
        </div>

        <div className='flex gap-2'>
          <dt className='font-medium w-25'>생성일</dt>
          <dd>{new Date(basic.character_date_create).toLocaleDateString()}</dd>
        </div>

        <div className='flex gap-2'>
          <dt className='font-medium w-25'>마지막 로그인</dt>
          <dd>
            {basic.character_date_last_login
              ? new Date(basic.character_date_last_login).toLocaleString()
              : '접속한 기록이 없습니다'}
          </dd>
        </div>

        <div className='flex gap-2'>
          <dt className='font-medium w-25'>마지막 로그아웃</dt>
          <dd>
            {basic.character_date_last_logout
              ? new Date(basic.character_date_last_logout).toLocaleString()
              : '접속한 기록이 없습니다'}
          </dd>
        </div>

        <div className='flex gap-2'>
          <dt className='font-medium w-25'>데이터 동기화</dt>
          <dd>
            {character.lastUpdatedAt
              ? new Date(character.lastUpdatedAt).toLocaleString()
              : '접속한 기록이 없습니다'}
          </dd>
        </div>
      </dl>
    </section>
  );
}
