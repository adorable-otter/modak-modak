'use client';

import { useParams, useRouter } from 'next/navigation';

import { AlertSign, PlusGray } from '@components/icons';
import Button from '@components/common/Button';
import ScheduleCard from '@components/common/scheduleCard/ScheduleCard';

import PhotoUpload from '@app/groups/[id]/posts/new/_components/PhotoUpload';
import PostTextArea from '@app/groups/[id]/posts/new/_components/PostTextArea';
import ScheduleSelectSection, { Schedule } from '@app/groups/[id]/_components/ScheduleSelectSection';

import useUploadPost from '@hooks/post/useUploadPost';
import useUser from '@hooks/common/useUser';
import useSmallAlert from '@hooks/common/useSmallAlert';

import { useState } from 'react';

export const PostNewForm = () => {
  const [content, setContent] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [isUploading, setIsUploading] = useState(false); // 업로드 중 상태

  const router = useRouter();

  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  // 로그인 유저 확인
  const { user } = useUser();

  const { SmallAlert: SubmitAlert, openAlert: OpenSubmitAlert } = useSmallAlert();
  const { SmallAlert: ImageCountAlert, openAlert: OpenImageCountAlert } = useSmallAlert();

  // 게시글 업로드 로직
  const { mutate: uploadPostMutation } = useUploadPost();

  const handleUploadPost = () => {
    if (isUploading) return; // 버튼 중복 클릭 방지
    setIsUploading(true); // 업로드 시작
    // FormData 사용
    const formData = new FormData();
    formData.append('userId', user!.id);
    formData.append('content', content);
    formData.append('scheduleId', selectedSchedule!.id);
    formData.append('groupId', groupId);

    // 이미지 각 파일을 FormData에 추가
    selectedFiles.forEach((file) => {
      formData.append('files', file);
    });
    uploadPostMutation(formData, {
      onSuccess: () => {
        router.push(`/groups/${groupId}`);
      },
      onError: () => {
        setIsUploading(false);
      },
    });
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUploadPost();
        }}
      >
        {/* 일정 선택하기 타이틀 */}
        <div className="w-full flex flex-col px-5 my-5">
          <div className="flex mb-[7px]">
            <label className="font-semibold text-base">일정 선택하기</label>
            <p className="text-[#FF3B30] ml-1">*</p>
          </div>
          <span className="text-sm text-gray-500 mb-4">추억을 공유하고 싶은 일정을 선택해주세요</span>

          <div onClick={() => setIsScheduleModalOpen(true)} className="cursor-pointer">
            {selectedSchedule ? (
              <ScheduleCard
                name={selectedSchedule.name}
                memo={selectedSchedule.memo}
                start_date={selectedSchedule.start_date}
                end_date={selectedSchedule.end_date}
                start_time={selectedSchedule.start_time}
              />
            ) : (
              <div className="w-full h-[95px] flex flex-col items-center  justify-center border border-gray-300 rounded-xl cursor-pointer">
                <PlusGray />
              </div>
            )}
          </div>

          {/* 일정 선택하기 화면 */}
          {isScheduleModalOpen && (
            <ScheduleSelectSection
              setIsScheduleModalOpen={setIsScheduleModalOpen}
              selectedSchedule={selectedSchedule}
              setSelectedSchedule={setSelectedSchedule}
            />
          )}
        </div>

        {/* 사진 업로드 컴포넌트 */}
        <PhotoUpload
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          OpenImageCountAlert={OpenImageCountAlert}
        />

        {/* 글 입력 컴포넌트 */}
        <PostTextArea content={content} setContent={setContent} />

        <div className="fixed w-full max-w-[600px] m-auto px-5 bottom-3">
          <Button
            label="작성 완료"
            className="full-btn"
            disabled={selectedFiles.length === 0 || selectedSchedule === null}
            type="submit"
          />

          {/* 버튼이 disabled 상태일 때만 동작 */}
          {selectedFiles.length === 0 || selectedSchedule === null ? (
            <div
              className="absolute inset-0 flex items-center justify-center bg-transparent"
              onClick={() => OpenSubmitAlert()}
            />
          ) : null}
        </div>
      </form>
      <SubmitAlert>
        <AlertSign className="mr-1" />
        {selectedFiles.length === 0 && selectedSchedule === null
          ? `일정 선택과 사진 첨부는 필수예요!`
          : selectedFiles.length === 0
            ? `사진을 첨부해주세요!`
            : `일정을 선택해주세요!`}
      </SubmitAlert>
      <ImageCountAlert>
        <AlertSign className="mr-1" />
        {'최대 10개의 파일만 업로드할 수 있습니다!'}
      </ImageCountAlert>
    </>
  );
};

export default PostNewForm;
