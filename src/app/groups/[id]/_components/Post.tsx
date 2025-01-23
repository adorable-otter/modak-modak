'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Comments, Menu } from '@components/icons';
import PostScheduleCard from '@components/common/scheduleCard/PostScheduleCard';
import CommentList from '@app/groups/[id]/_components/CommentList';
import { DeleteModal } from '@app/groups/[id]/_components/DeleteModal';
import { PhotoSlider } from '@app/groups/[id]/_components/PhotoSlider';
import { PostActionBottomSheet } from '@app/groups/[id]/_components/PostActionBottomSheet';

import useUser from '@hooks/useUser';

import { CommentCountType, GroupType, PostImageType, PostType, ScheduleType, UserType } from 'queries/post/getPosts';

export type PostCommonType = {
  id: PostType['id'];
  content: PostType['content'];
  groups: GroupType;
  users: UserType;
  schedules: ScheduleType;
  comments: CommentCountType;
  post_images: PostImageType[];
};

interface PostProps {
  post: PostCommonType;
}

const MAX_LENGTH = 80;

const Post = ({ post }: PostProps) => {
  const [isExpanded, setIsExpanded] = useState<{ [key: string]: boolean }>({});
  const [bottomSheetPostId, setBottomSheetPostId] = useState<string | null>(null);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { user } = useUser();
  // 글 내용 3줄로 줄이기 (최대 80자)
  const truncateText = (text: string | null, postId: string) => {
    if (!text) return '';
    return text.length <= MAX_LENGTH || isExpanded[postId] ? text : `${text.slice(0, MAX_LENGTH)}...`;
  };

  // 더보기 / 접기 토글 함수
  const toggleExpand = (postId: string) => {
    setIsExpanded((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <>
      <article key={post.id} className="w-full mt-5 flex flex-col mb-2">
        <div className="flex items-center justify-between w-full h-8 mb-3">
          <div className="flex items-center space-x-3">
            {/* 동그란 프로필 이미지 */}
            <Image
              src={post.users.profile_image}
              alt="프로필"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />
            {/* 닉네임 */}
            <span className="text-base font-semibold text-gray-900">{post.users.nickname}</span>
          </div>
          {/* 메뉴 아이콘(작성자id와 접속id 일치하는 경우만 보인다) */}
          {user?.id === post.users.id && (
            <div onClick={() => setBottomSheetPostId(post.id)} className="flex h-10 w-10">
              <Menu className="m-auto" />
            </div>
          )}
        </div>

        {/* 사진 컴포넌트 */}
        <PhotoSlider photoList={post.post_images} />

        {/* 글 내용 */}
        <div className="w-full text-sm mb-3">
          <p className="text-gray-800 text-sm break-words">
            {truncateText(post.content, post.id)}
            {post.content && post.content.length > 80 && (
              <span onClick={() => toggleExpand(post.id)} className="text-gray-500 text-sm cursor-pointer ml-1">
                {isExpanded[post.id] ? '접기' : '더보기'}
              </span>
            )}
          </p>
        </div>

        {/* 일정 카드 */}
        <PostScheduleCard
          name={post.schedules.name}
          memo={post.schedules.memo}
          start_date={post.schedules.start_date}
          end_date={post.schedules.end_date}
          start_time={post.schedules.start_time}
        />

        {/* 댓글 */}
        <div className="w-28 flex items-center h-6 text-xs mt-3" onClick={() => setIsCommentOpen(true)}>
          <Comments />
          <span className="ml-1 font-semibold">
            {post.comments.count > 0 ? `${post.comments.count}개 모두 보기` : '댓글 남기기'}
          </span>
        </div>
      </article>

      {/* 댓글 바텀시트 */}
      <CommentList postId={post.id} isOpen={isCommentOpen} onClose={() => setIsCommentOpen(false)} />

      {/* 메뉴 수정 바텀시트 */}
      {bottomSheetPostId && (
        <PostActionBottomSheet
          setBottomSheetPostId={setBottomSheetPostId}
          postId={bottomSheetPostId}
          setDeleteModal={setDeleteModal}
        />
      )}

      {deleteModal && <DeleteModal postId={post.id} setDeleteModal={setDeleteModal} />}
    </>
  );
};

export default Post;
