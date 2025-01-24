'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import useUserToManageStore from '@stores/useUserToManage';
import CurMemberList from '@app/groups/[id]/management/members/_components/CurMemberList';
import WaitingMemberList from '@app/groups/[id]/management/members/_components/WaitingMemberList';
import MembersBottomSheet from '@app/groups/[id]/management/members/_components/MembersBottomSheet';
import ManagementModal from '@app/groups/[id]/management/_components/modal/ManagementModal';
import GlobalLoading from '@app/GlobalLoading';
import GlobalError from '@app/GlobalError';
import { AddMember } from '@components/icons';
import useIsLeader from '@hooks/management/useIsLeader';
import useSmallAlert from '@hooks/useSmallAlert';

type TabType = 'currentMembers' | 'awaitingMembers';

const MembersPageContents = () => {
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const [selectedTab, setSelectedTab] = useState<TabType>('currentMembers');
  const { userPermitted, setUserPermitted } = useUserToManageStore();
  const { SmallAlert: MemberAddedAlert, openAlert } = useSmallAlert();

  const handleCurMemTabClick = () => {
    setSelectedTab('currentMembers');
  };

  const handleAwaitMemTabClick = () => {
    setSelectedTab('awaitingMembers');
  };

  const { data: isLeaderUser, isPending, isError } = useIsLeader({ groupId });

  useEffect(() => {
    if (userPermitted) {
      setUserPermitted(false);
      openAlert();
    }
  }, [userPermitted]);

  if (isPending) return <GlobalLoading />;
  if (isError) return <GlobalError />;

  return (
    <>
      <div className="w-full">
        <div className="px-5 flex items-center">
          <div
            onClick={handleCurMemTabClick}
            className={`w-[50%] py-3 text-center ${selectedTab === 'currentMembers' ? 'font-semibold border-b-2 border-gray-900' : ''}`}
          >
            참여 중
          </div>
          <div
            onClick={handleAwaitMemTabClick}
            className={`w-[50%] py-3 text-center ${selectedTab === 'awaitingMembers' ? 'font-semibold border-b-2 border-gray-900' : ''}`}
          >
            대기 중
          </div>
        </div>
      </div>
      {selectedTab === 'currentMembers' ? (
        <CurMemberList isLeaderUser={isLeaderUser ? isLeaderUser : false} />
      ) : (
        <WaitingMemberList isLeaderUser={isLeaderUser ? isLeaderUser : false} />
      )}
      <ManagementModal isLeader={isLeaderUser ? isLeaderUser : false} modalMode={'leaderTransition'} />
      <MembersBottomSheet />
      <MemberAddedAlert>
        <div className="flex gap-2.5">
          <AddMember />
          <span>{'멤버가 추가 되었어요!'}</span>
        </div>
      </MemberAddedAlert>
    </>
  );
};

export default MembersPageContents;
