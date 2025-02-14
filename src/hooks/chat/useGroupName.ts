import { useQuery } from '@tanstack/react-query';

import getGroupName from '@queries/chat/getGroupName';

const useGroupName = (chatRoomId: string) => {
  const {
    data: chatGroupInfo,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['groupName', chatRoomId],
    queryFn: () => getGroupName(chatRoomId),
    enabled: !!chatRoomId,
  });

  return { chatGroupInfo, isPending, isError };
};

export default useGroupName;
