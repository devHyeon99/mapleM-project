import { useQuery } from '@tanstack/react-query';
import fetchNoticesFromApi from '@/api/notice';

export const useNoticeQuery = () => {
  return useQuery({
    queryKey: ['notices'],
    queryFn: fetchNoticesFromApi,
    staleTime: 10 * 60 * 1000, // 10분
    gcTime: 30 * 60 * 1000, // 30분
    refetchOnWindowFocus: false, // 창 포커스 시 자동 리프레시 비활성화
  });
};
