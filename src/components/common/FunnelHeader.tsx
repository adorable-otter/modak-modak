'use client';

import { useRouter } from 'next/navigation';

import { PrevArrow } from '@components/icons';

interface FunnelHeaderProps {
  label: string;
  users?: number;
}

const FunnelHeader = ({ label = '', users }: FunnelHeaderProps) => {
  const router = useRouter();

  const handleNaivation = () => router.back();

  return (
    <header>
      <div className="relative w-full max-w-[600px] mx-auto h-12 flex items-center justify-center bg-white">
        <div
          className="absolute top-[50%] transform translate-y-[-50%] left-5 cursor-pointer w-10 h-10 flex items-center justify-center"
          onClick={handleNaivation}
        >
          <PrevArrow className=" w-6 h-6" />
        </div>
        <h3
          className={`text-center text-xl font-semibold leading-[140%] ${users && users > 0 ? 'flex items-center' : ''}`}
        >
          <span className="block max-w-[175px] overflow-hidden whitespace-nowrap text-ellipsis break-all">{label}</span>
          {users && users > 0 && (
            <span className="text-lg font-semibold leading-[140%] text-primary ml-2">{users}</span>
          )}
        </h3>
      </div>
    </header>
  );
};

export default FunnelHeader;
