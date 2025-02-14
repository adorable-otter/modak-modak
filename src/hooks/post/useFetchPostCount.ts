import { useQuery } from '@tanstack/react-query';
import { getPostCount } from 'queries/post/getPostCount';

export const useFetchPostCount = (groupId: string, searchTerm?: string) => {
  return useQuery({
    queryKey: ['postCount', groupId, searchTerm || ''],
    queryFn: () => getPostCount(groupId, searchTerm),
    enabled: !!groupId,
  });
};
