import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { CharacterData } from '@/types/character';
import { characterImageMap } from '@/constants/character_name';
import { cn } from '@/lib/utils';
import { loadedImageCache } from '@/utils/imageCacheUtils';

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

  const [isImageLoaded, setIsImageLoaded] = useState(
    loadedImageCache.has(imageFile)
  );

  const handleLoad = () => {
    if (!isImageLoaded) {
      loadedImageCache.add(imageFile);
      setIsImageLoaded(true);
    }
  };

  return (
    <button
      type='button'
      className={cn(
        'flex flex-col justify-end items-center w-full h-32 border rounded-md bg-card cursor-pointer',
        'hover:border-primary/70 dark:hover:border-white/50',
        selected &&
          'shadow-[0_0_1px_1px_rgba(242,147,37,1)] dark:shadow-[0_0_1px_1px_rgb(242,243,244)]'
      )}
      onClick={onClick}
    >
      <div className='flex flex-col flex-1 justify-center gap-2 items-center'>
        <div className='w-12 h-12 relative'>
          {!isImageLoaded && (
            <Skeleton className='absolute inset-0 bg-muted animate-pulse rounded-md' />
          )}
          <img
            src={imageFile}
            alt={`${character_name} 이미지`}
            className={`w-12 h-12 rounded-md transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            width='48'
            height='48'
            loading='lazy'
            onLoad={handleLoad}
            onError={handleLoad}
          />
        </div>
        <span>{character_name}</span>
      </div>
    </button>
  );
};
