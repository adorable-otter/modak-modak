'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import HomeContents from '@app/_components/HomeContents';
import Button from '@components/common/Button';
import Header from '@components/common/Header';
import { Plus } from '@components/icons';

const HomeSection = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const targetRef = useRef<HTMLDivElement | null>(null);

  const onCreateGroup = () => {
    router.push('/groups/new');
  };

  useEffect(() => {
    const targetInstanceRef = targetRef.current;

    const options = {
      rootMargin: '-48px 0px 0px 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      setIsScrolled(!entries[0].isIntersecting);
    }, options);

    if (targetInstanceRef) {
      observer.observe(targetInstanceRef);
    }

    return () => {
      if (targetInstanceRef) {
        observer.unobserve(targetInstanceRef);
      }
    };
  }, []);

  return (
    <div className="border-x border-gray-200">
      <Header hasSetting={false} home={true} isScrolled={isScrolled} />
      <HomeContents ref={targetRef} />
      <div className="ml-[calc(100%-144px)]">
        <Button label={'모임 만들기'} className={'floating-btn z-40'} type={'button'} onClick={onCreateGroup}>
          <Plus className={'w-4 h-4'} active={true} />
        </Button>
      </div>
    </div>
  );
};

export default HomeSection;
