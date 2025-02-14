'use client';

import { useParams, useRouter } from 'next/navigation';

import { GreaterThan } from '@components/icons';

const NoPost = () => {
  const router = useRouter();
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  return (
    <>
      <div className="mx-auto my-[3.375rem] text-center justify-center">
        <h4 className="pb-5 text-2xl font-bold">아직 게시글이 없네요!</h4>
        <p className="text-gray-700 text-lg">게시글을 쓰기 위해서는</p>
        <p className="text-gray-700 text-lg">일정 선택이 필수이니 등록해볼까요?</p>
        <div
          className="mx-auto flex mt-[1.375rem] border-b-[1px] border-gray-900 w-[7.75rem]"
          onClick={() => router.push(`/groups/${groupId}/schedules/new`)}
        >
          <span className="text-gray-900 text-sm cursor-pointer">일정 등록 바로가기</span>
          <GreaterThan />
        </div>
      </div>
    </>
  );
};

export default NoPost;
