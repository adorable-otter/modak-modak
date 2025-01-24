import { forwardRef } from 'react';

import HomeTitle from '@app/_components/HomeTitle';
import HomeGroupListSection from '@app/_components/HomeGroupListSection';

const HomeContents = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <>
      <div className="px-5 pt-[2.625rem] pb-[2.313rem] min-h-[8.7rem]">
        <HomeTitle />
      </div>
      <div ref={ref} />
      <div className="h-auto pb-[5.25rem] bg-white rounded-t-[1.25rem]">
        
        <HomeGroupListSection />
      </div>
    </>
  );
});

HomeContents.displayName = 'HomeContents';

export default HomeContents;
