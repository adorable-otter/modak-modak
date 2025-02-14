import { getPosts } from 'queries/post/getPosts';
import { useInfiniteQuery } from '@tanstack/react-query';

const PAGE_SIZE = 1;

export const useFetchGetPosts = (groupId: string, searchTerm?: string) => {
  const { data, fetchNextPage, hasNextPage, isPending, isError } = useInfiniteQuery({
    queryKey: ['posts', groupId, searchTerm || ''],
    queryFn: ({ pageParam = 0 }) => getPosts(groupId, Number(pageParam), PAGE_SIZE, searchTerm),
    enabled: !!groupId,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0) {
        return undefined; // 페이지네이션 종료
      }
      return allPages.length; // 다음 페이지 번호 반환
    },
  });

  return { data, fetchNextPage, hasNextPage, isPending, isError };
};
