import { useQuery } from '@tanstack/react-query';

import { getSinglePost } from '@queries/post/getSinglePost';

// 게시글 수정 - 게시글 정보 가져오기
export const useFetchGetPost = (postId: string) => {
  const { data, isPending, isError } = useQuery({
    queryKey: [postId],
    queryFn: () => getSinglePost(postId),
    enabled: !!postId,
  });
  return { data, isPending, isError };
};
