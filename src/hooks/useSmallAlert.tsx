'use client';

import { useEffect, useState } from 'react';

type SmallAlertProps = {
  children: React.ReactNode;
};

const useSmallAlert = () => {
  const [show, setShow] = useState(false);

  const openAlert = () => setShow(true);
  const closeAlert = () => setShow(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        closeAlert(); // 2.5초 후에 닫힘
      }, 2500);

      return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머 정리
    }
  }, [show]);

  const SmallAlert = ({ children }: SmallAlertProps) => {
    if (!show) return null;
    return (
      <div className='fixed left-0'>
        <div className="w-screen flex justify-center items-center fixed bottom-[6rem]">
          <div className="animate-fade-up animate-once animate-duration-450 bg-black text-white py-2 px-4 rounded-[0.75rem]">
            <div className="flex items-center gap-1">{children}</div>
          </div>
        </div>
      </div>
    );
  };

  return { SmallAlert, openAlert, closeAlert };
};

export default useSmallAlert;
