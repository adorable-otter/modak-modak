import { createClient } from '@utils/supabase/client';

import { Database } from '@ts/supabase';

type GroupNameType = Database['public']['Tables']['chat_rooms']['Row'];

type GroupName = Pick<GroupNameType, 'name'>;

interface GroupInformationType {
  data: GroupName;
  chatRoomUsers: number;
}

const getGroupName = async (chatRoomId: string): Promise<GroupInformationType> => {
  const supabase = createClient();

  const { data, error: groupNameError } = await supabase
    .from('chat_rooms')
    .select('name')
    .eq('id', chatRoomId)
    .single();

  const { data: groupUsers, error: chatRoomUserError } = await supabase
    .from('chat_room_members')
    .select('id')
    .eq('chat_room_id', chatRoomId);

  if (chatRoomUserError) {
    throw new Error('채팅방 인원을 가져오는 중 에러가 발생했습니다.');
  }

  if (groupNameError) {
    throw new Error('그룹 이름을 가져오는 중 에러가 발생했습니다.');
  }

  return { data, chatRoomUsers: groupUsers.length };
};

export default getGroupName;
