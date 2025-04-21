import { CharacterData } from '@/types/character';
import { useState } from 'react';
import { CharacterBasicInfo } from '@/features/character/components';
import { TaskManager } from '@/features/task/components';
import { Button } from '@/components/ui/button';

interface CharacterDetailProps {
  character: CharacterData | null;
}

const tabs = [
  { key: 'basic', label: '기본 정보' },
  { key: 'quests', label: '퀘스트' },
  { key: 'boss', label: '보스' },
] as const;

const questTypes = [
  { key: 'daily', label: '일일 관리' },
  { key: 'weekly', label: '주간 관리' },
  { key: 'monthly', label: '월간 관리' },
] as const;

const bossTypes = [
  { key: 'daily', label: '일일 관리' },
  { key: 'weekly', label: '주간 관리' },
  { key: 'monthly', label: '월간 관리' },
] as const;

export function CharacterDetail({ character }: CharacterDetailProps) {
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]['key']>('basic');
  const [questCategory, setQuestCategory] = useState<
    'daily' | 'weekly' | 'monthly'
  >('daily');
  const [bossCategory, setBossCategory] = useState<
    'daily' | 'weekly' | 'monthly'
  >('daily');

  const handleTabChange = (key: (typeof tabs)[number]['key']) => {
    setActiveTab(key);
    if (key === 'quests') setQuestCategory('daily');
    if (key === 'boss') setBossCategory('daily');
  };

  if (!character) {
    return (
      <div className='mt-2 p-4 border rounded-md bg-card text-muted-foreground'>
        캐릭터를 선택하세요.
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return <CharacterBasicInfo character={character} />;
      case 'quests':
        return (
          <div className='flex flex-col h-full'>
            <div className='grid grid-cols-3 gap-2 border-b pb-2'>
              {questTypes.map(({ key, label }) => (
                <Button
                  key={key}
                  variant='ghost'
                  onClick={() => setQuestCategory(key)}
                  aria-current={questCategory === key ? 'page' : undefined}
                  className={`py-1 text-base font-medium transition-all duration-200 ease-in-out ${
                    questCategory === key
                      ? 'text-foreground font-bold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {label}
                </Button>
              ))}
            </div>
            <TaskManager
              key={`quest-${questCategory}`}
              characterId={character.id}
              type='quest'
              category={questCategory}
            />
          </div>
        );
      case 'boss':
        return (
          <div className='flex flex-col h-full'>
            <div className='grid grid-cols-3 gap-2 border-b pb-2'>
              {bossTypes.map(({ key, label }) => (
                <Button
                  key={key}
                  variant='ghost'
                  onClick={() => setBossCategory(key)}
                  aria-current={bossCategory === key ? 'page' : undefined}
                  className={`py-1 text-base font-medium transition-all duration-200 ease-in-out ${
                    bossCategory === key
                      ? 'text-foreground font-bold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {label}
                </Button>
              ))}
            </div>

            <TaskManager
              key={`boss-${bossCategory}`}
              characterId={character.id}
              type='boss'
              category={bossCategory}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='flex flex-col flex-1 gap-2 mt-2 p-4 border rounded-md bg-card'>
      <div className='grid grid-cols-3 gap-2 border-b pb-2'>
        {tabs.map(({ key, label }) => (
          <Button
            key={key}
            variant='ghost'
            onClick={() => handleTabChange(key)}
            aria-current={activeTab === key ? 'page' : undefined}
            className={`py-1 text-base font-medium transition-all duration-200 ease-in-out ${
              activeTab === key
                ? 'text-foreground font-bold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {label}
          </Button>
        ))}
      </div>

      {renderTabContent()}
    </div>
  );
}
