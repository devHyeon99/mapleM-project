import { CharacterData } from '@/types/character';
import { characterImageMap } from '@/constants/character_name';

export interface CharacterCardProps {
  characterBasicData: CharacterData['basic'];
  onClick: () => void;
  selected?: boolean;
}

export const CharacterCard = ({
  characterBasicData: { character_name, character_job_name },
  onClick,
  selected = false,
}: CharacterCardProps) => {
  const imageFile =
    characterImageMap[character_job_name] ||
    '/src/assets/images/jobs/default.png';

  return (
    <button
      type='button'
      className={`flex flex-col justify-end items-center w-full h-32 border rounded-md bg-card cursor-pointer transition-all ${
        selected
          ? 'outline outline-primary/70 shadow-[0_0_1px_1px_rgba(242,147,37,1)] dark:outline-gray-200 dark:shadow-[0_0_1px_1px_rgba(156,163,175,0.3)]'
          : ''
      }`}
      onClick={onClick}
    >
      <div className='flex flex-col flex-1 justify-center gap-2 items-center'>
        <img
          src={imageFile}
          alt={`${character_name} 이미지`}
          className='w-12 h-12 rounded-md'
        />
        <span>{character_name}</span>
      </div>
    </button>
  );
};
