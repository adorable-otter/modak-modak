'use client';

import { useRef } from 'react';

import { User } from '@supabase/supabase-js';

import Button from '@components/common/Button';

import useChatMessage from '@hooks/chat/useChatMessage';

interface ChatInputProps {
  user: User | null;
  chatRoomId: string;
}

const ChatInput = ({ user, chatRoomId }: ChatInputProps) => {
  const { message, setMessage, sendMessage, SmallAlert } = useChatMessage(chatRoomId as string, user?.id as string);

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);

    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;

      const maxHeight = 100;

      if (textAreaRef.current.scrollHeight > maxHeight) {
        textAreaRef.current.style.height = `${maxHeight}px`;
        textAreaRef.current.style.overflow = 'auto';
      } else {
        textAreaRef.current.style.overflow = 'hidden';
      }
    }
  };

  const resetTextAreaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage(resetTextAreaHeight);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto border-x border-gray-200 px-5 py-2 absolute bottom-0 left-0 right-0 z-10 bg-white">
      <div className="w-full border bg-white px-3 py-2 rounded-lg flex items-center gap-1">
        <textarea
          rows={1}
          ref={textAreaRef}
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="메세지 입력하기.."
          className="resize-none border-none outline-none min-h-6 h-6 text-sm w-full"
        />
        <Button
          type="button"
          label="보내기"
          className={`w-12 text-sm font-semibold leading-[140%] ${message ? 'text-primary' : 'text-gray-400'}`}
          onClick={() => sendMessage(resetTextAreaHeight)}
        />
      </div>
      <SmallAlert>메세지를 입력해주세요.</SmallAlert>
    </div>
  );
};

export default ChatInput;
