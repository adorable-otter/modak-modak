import Link from 'next/link';
import JoinContents from '@app/join/[id]/_components/JoinContents';
import { Logo } from '@components/icons';

const Join = () => {
  return (
    <div className="mx-auto max-w-[600px]">
      <header className={`w-full max-w-[600px] fixed top-0 z-10`}>
        <div className="px-5 h-12 flex items-center justify-start">
          <Link href={'/'}>
            <Logo className="w-20 h-10" />
          </Link>
        </div>
      </header>
      <div className="h-screen w-full">
        <JoinContents />
      </div>
    </div>
  );
};

export default Join;
