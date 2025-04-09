import { isResetRequired } from './dateUtils';
import { useAccountStore } from '@/store/useAccountStore';
import { useBossStore } from '@/store/useBossStore';
import { useQuestStore } from '@/store/useQuestStore';

export function checkAndResetTasks() {
  const { resetTimestamps, updateResetTimestamps } = useAccountStore.getState();
  const { resetQuests } = useQuestStore.getState();
  const { resetBosses } = useBossStore.getState();
  const now = new Date();

  const questTypes: ('daily' | 'weekly' | 'monthly')[] = [
    'daily',
    'weekly',
    'monthly',
  ];

  const bossTypes: ('daily' | 'weekly-thursday' | 'monthly')[] = [
    'daily',
    'weekly-thursday',
    'monthly',
  ];

  const updatedResetTimestamps = { ...resetTimestamps };
  let shouldUpdate = false;

  for (const type of questTypes) {
    const lastReset = resetTimestamps[type];
    if (isResetRequired(type, lastReset, now)) {
      resetQuests(type);
      updatedResetTimestamps[type] = now.toISOString();
      shouldUpdate = true;
    }
  }

  for (const type of bossTypes) {
    const lastReset = resetTimestamps[type];
    if (isResetRequired(type, lastReset, now)) {
      resetBosses(type === 'weekly-thursday' ? 'weekly' : type);
      updatedResetTimestamps[type] = now.toISOString();
      shouldUpdate = true;
    }
  }

  if (shouldUpdate) {
    updateResetTimestamps(updatedResetTimestamps);
  }
}
