'use client';

import { useParams } from 'next/navigation';
import MemberCard from '@app/groups/[id]/management/members/_components/MemberCard';
import GlobalLoading from '@app/GlobalLoading';
import GlobalError from '@app/GlobalError';
import useFetchCurMembers from '@hooks/management/useFetchCurMembers';

interface CurMemberListProps {
  isLeaderUser: boolean;
}
const CurMemberList = ({ isLeaderUser }: CurMemberListProps) => {
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const { data: curMemberList, isPending, isError } = useFetchCurMembers({ groupId });

  if (isPending) return <GlobalLoading />;
  if (isError) return <GlobalError />;

  //유저가 대표가 아닐 때 멤버 데이터에서 대표 데이터를 뽑아내기
  const filteredLeaderData =
    isLeaderUser || !curMemberList ? null : curMemberList.others.find((member) => member.is_leader === true);
  const leaderData = filteredLeaderData;

  //대표를 제외한 멤버들의 데이터
  const filteredData = !curMemberList ? null : curMemberList.others.filter((member) => member.is_leader !== true);

  return (
    <div>
      <div className="pt-5 font-semibold">
        <div className="px-5 py-3 flex items-center gap-2">
          <span>현재 참여 멤버</span>
          <span className="text-primary">{curMemberList ? curMemberList.others.length + 1 : '...'}</span>
        </div>
      </div>
      <div className={`${curMemberList ? 'border-b border-gray-200' : ''}`}>
        <div className="divide-y divide-gray-200">
          {curMemberList && (
            <>
              {isLeaderUser ? (
                <>
                  <MemberCard
                    memberData={curMemberList.me}
                    isLeaderUser={isLeaderUser}
                    mode={'curMembers'}
                    isLeader={true}
                    isMe={true}
                  />
                </>
              ) : (
                <>
                  <MemberCard
                    memberData={curMemberList.me}
                    isLeaderUser={isLeaderUser}
                    mode={'curMembers'}
                    isMe={true}
                  />
                  {leaderData && (
                    <MemberCard
                      memberData={leaderData}
                      isLeaderUser={isLeaderUser}
                      mode={'curMembers'}
                      isLeader={true}
                    />
                  )}
                </>
              )}
              {filteredData?.map((member) => (
                <MemberCard key={member.users.id} memberData={member} isLeaderUser={isLeaderUser} mode={'curMembers'} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurMemberList;
