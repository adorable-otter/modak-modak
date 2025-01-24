'use client';

import { useParams } from 'next/navigation';
import MemberCard from '@app/groups/[id]/management/members/_components/MemberCard';
import GlobalLoading from '@app/GlobalLoading';
import GlobalError from '@app/GlobalError';
import useFetchWaitingMembers from '@hooks/management/useFetchWaitingMembers';

interface WaitingMemberListProps {
  isLeaderUser: boolean;
}
const WaitingMemberList = ({ isLeaderUser }: WaitingMemberListProps) => {
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const { data, isPending, isError } = useFetchWaitingMembers({ groupId });

  if (isPending) return <GlobalLoading />;
  if (isError) return <GlobalError />;

  return (
    <>
      <div>
        <div className="pt-5 font-semibold">
          <div className="px-5 py-3 flex items-center gap-2">
            <span>대기 멤버</span> <span className="text-primary">{data ? data.length : 0}</span>
          </div>
        </div>
        <div className={`${data?.length ? 'border-b border-gray-200' : ''}`}>
          <div className="divide-y divide-gray-200">
            {data &&
              data.map((member) => (
                <MemberCard key={member.users.id} memberData={member} isLeaderUser={isLeaderUser} mode={'waiting'} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitingMemberList;
