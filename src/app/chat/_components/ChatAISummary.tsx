'use client';

import { useRef, useState } from 'react';

import Summary from '@app/chat/_components/Summary';

import { Ai, AiNextArrow } from '@components/icons';
import Button from '@components/common/Button';

import useSmallAlert from '@hooks/common/useSmallAlert';

import { MessageType } from '@queries/chat/getChatList';

interface ChatAISummaryProps {
  messages: MessageType[] | [];
}

const ChatAISummary = ({ messages }: ChatAISummaryProps) => {
  const [summary, setSummary] = useState<string | null>(null);

  const { SmallAlert, openAlert } = useSmallAlert();

  const buttonRef = useRef<boolean>(false);

  const filterTodayMessages = (messages: MessageType[]) => {
    const today = new Date().toLocaleDateString();
    return messages.filter((message) => new Date(message.created_at).toLocaleDateString() === today);
  };

  const handleSummarize = () => {
    const todayMessages = filterTodayMessages(messages || []);

    if (todayMessages.length === 0) {
      openAlert();
      return;
    }

    if (buttonRef.current) return;

    buttonRef.current = true;

    const ws = new WebSocket('wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01', [
      'realtime',
      `openai-insecure-api-key.${process.env.NEXT_PUBLIC_OPEN_API_KEY}`,
      'openai-beta.realtime-v1',
    ]);

    ws.addEventListener('open', () => {
      console.log('GPT API 리얼타임 연결');

      const createResponseEvent = {
        type: 'response.create',
        response: {
          modalities: ['text'],
          instructions:
            '모든 결과는 한국어로 작성해주세요. 대화를 요약해 주세요. 만약 대화를 이해할 수 없거나 요약이 불가능하면, 다음과 같이 응답하세요: "대화를 요약할 수 없습니다. 대화 내용을 확인해 주세요."',
        },
      };

      ws.send(JSON.stringify(createResponseEvent));

      const createConversationEvent = {
        type: 'conversation.item.create',
        item: {
          type: 'message',
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: todayMessages.map((msg) => msg.message).join(' '),
            },
          ],
        },
      };

      ws.send(JSON.stringify(createConversationEvent));
    });

    ws.addEventListener('message', (data) => {
      const message = JSON.parse(data.data);
      console.log(message.type);
      switch (message.type) {
        case 'response.text.delta':
          setSummary((prev) => (prev || '') + message.delta);
          break;
        case 'response.text.done':
          break;
        case 'response.done':
          ws.close();
          break;
      }
    });

    ws.addEventListener('error', (error) => {
      console.error('웹소켓 에러', error);
    });

    ws.addEventListener('close', () => {
      buttonRef.current = false;
      console.log('AI 요약을 마쳤습니다.');
    });
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSummary(null);
  };

  return (
    <>
      <div
        onClick={handleSummarize}
        className="flex items-center gap-2 py-[10px] px-3 mt-4 mb-5 mx-auto bg-gray-900 bg-opacity-50 rounded-[100px] cursor-pointer"
      >
        <Button
          type="button"
          label="AI 요약하기"
          className="flex items-center gap-1 text-sm font-semibold leading-[140%] text-white"
        >
          <Ai className="w-5 h-5" />
        </Button>
        <AiNextArrow />
        <SmallAlert>오늘의 대화가 없습니다.</SmallAlert>
      </div>
      {summary && <Summary summary={summary} handleClose={handleClose} />}
    </>
  );
};

export default ChatAISummary;
