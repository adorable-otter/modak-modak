'use client';

import { useParams, useRouter } from 'next/navigation';

import Button from '@components/common/Button';
import { ModificationLine } from '@components/icons';

const NoPhoto = () => {
  const router = useRouter();
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  return (
    <>
      <div className="mx-auto mt-[7.5rem] mb-24 text-center">
        <h4 className="pb-5 text-2xl font-bold">아직 공유된 사진이 없네요!</h4>
        <p className="text-gray-700 text-lg">사진과 함께 글을 작성하고</p>
        <p className="text-gray-700 text-lg">우리만의 추억을 공유해보세요</p>
      </div>
      <div className="ml-[calc(100%-124px)]">
        <Button
          label="게시글 쓰기"
          className="floating-btn"
          type="button"
          onClick={() => router.push(`/groups/${groupId}/posts/new`)}
        >
          <ModificationLine />
        </Button>
      </div>
    </>
  );
};

export default NoPhoto;
