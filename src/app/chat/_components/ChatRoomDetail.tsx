'use client';

import { useParams } from 'next/navigation';

import ChatInput from '@app/chat/_components/ChatInput';
import ChatRoom from '@app/chat/_components/ChatRoom';

import FunnelHeader from '@components/common/FunnelHeader';

import useIOSKeyboardHeight from '@hooks/comment/useIOSKeyboardHeight';
import useGroupName from '@hooks/chat/useGroupName';
import useUser from '@hooks/common/useUser';

const ChatRoomDetail = () => {
  const { user } = useUser();

  const { id: chatRoomId } = useParams();

  const { chatGroupInfo } = useGroupName(chatRoomId as string);

  const keyboardHeight = useIOSKeyboardHeight();

  return (
    <div
      className="absoulte max-w-[600px] mx-auto border-x border-gray-200 w-full h-dvh transition-all"
      style={{
        bottom: keyboardHeight > 0 ? keyboardHeight : 0,
      }}
    >
      <FunnelHeader label={chatGroupInfo?.data.name as string} users={chatGroupInfo?.chatRoomUsers} />
      <ChatRoom user={user} chatRoomId={chatRoomId as string} />
      <ChatInput user={user} chatRoomId={chatRoomId as string} />
    </div>
  );
};

export default ChatRoomDetail;
