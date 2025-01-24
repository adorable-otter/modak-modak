'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Home, Chat, User } from '@components/icons';

const buttons = [
  {
    id: 'home',
    label: '홈',
    iconOff: <Home className="w-6 h-6" />,
    iconOn: <Home className="w-6 h-6" active={true} />,
    href: '/',
  },
  {
    id: 'chat',
    label: '채팅',
    iconOff: <Chat className="w-6 h-6" />,
    iconOn: <Chat className="w-6 h-6" active={true} />,
    href: '/',
  },
  {
    id: 'mypage',
    label: '마이페이지',
    iconOff: <User className="w-6 h-6" />,
    iconOn: <User className="w-6 h-6" active={true} />,
    href: '/mypage',
  },
];

const BottomNav = () => {
  const [activeButton, setActiveButton] = useState('');
  const pathname = usePathname();

  // URL 경로에 따라 활성 버튼 설정
  useEffect(() => {
    const active = pathname.includes('/chat') ? 'chat' : pathname.includes('/mypage') ? 'mypage' : 'home';
    setActiveButton(active);
  }, [pathname]);

  // 특정 경로에서 BottomNav 숨김
  const hiddenPaths = ['/login', '/signup', '/new', '/edit', '/schedule', '/join'];
  const isHideNav = hiddenPaths.some((path) => pathname.includes(path));

  if (isHideNav) {
    return null; // 조건 만족 시 BottomNav를 렌더링하지 않음
  }

  return (
    <div className="m-auto w-full flex max-w-[600px]">
      <div className="w-full max-w-[600px] h-16 fixed bottom-0 bg-white flex shadow-[0px_-4px_4px_0px_rgba(0,0,0,0.1)] z-[30]">
        {buttons.map((button) => (
          <Link
            href={button.href}
            key={button.id}
            className="flex-1 flex justify-center items-center"
            onClick={
              button.id !== 'chat'
                ? () => setActiveButton(button.id)
                : () => alert('아직 서비스 준비 중입니다!😊 조금만 기다려 주세요.')
            }
          >
            <div className="flex flex-col justify-end items-center">
              <div
                className={`w-16 h-8 rounded-full flex items-center justify-center ${activeButton === button.id ? 'bg-primary-10' : ''}`}
              >
                {activeButton === button.id ? button.iconOn : button.iconOff}
              </div>
              <div className={`text-sm ${activeButton === button.id ? 'text-primary' : 'text-gray-500'}`}>
                {button.label}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
