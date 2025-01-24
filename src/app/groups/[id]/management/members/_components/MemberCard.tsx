'use client';

import Image from 'next/image';
import MemberCardLeaderBtns from '@app/groups/[id]/management/members/_components/MemberCardLeaderBtns';
import { CurMemberType } from '@queries/management/fetchMembers';

interface MemberCardProps {
  memberData: CurMemberType;
  isLeaderUser: boolean;
  isLeader?: boolean;
  isMe?: boolean;
  mode: 'curMembers' | 'waiting';
}
const MemberCard = ({
  memberData,
  isLeaderUser,
  isLeader = false,
  isMe = false,
  mode,
}: MemberCardProps) => {
  const { users } = memberData;
  const { nickname, profile_image: profile } = users;

  return (
    <div className="w-full">
      <div className="px-5 h-16 flex bg-gray-100 justify-between items-center">
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={profile}
              width={56}
              height={56}
              alt={'member_profile'}
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <span className="flex items-center gap-1">
            {nickname} {isMe && <span className="text-gray-500 text-sm">{'(나)'}</span>}
          </span>
        </div>
        {isLeaderUser ? (
          <MemberCardLeaderBtns
            memberId={memberData.users.id}
            isLeader={isLeader}
            mode={mode}
          />
        ) : (
          <>
            {mode === 'curMembers' && isLeader && (
              <div className="w-[40px] h-[40px] flex justify-center items-center">
                <span className="text-primary">대표</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MemberCard;
