'use client';

import GlobalLoading from '@app/GlobalLoading';
import NonUserQueryJoin from '@app/join/[id]/_components/NonUserQueryJoin';
import UserQueryJoin from '@app/join/[id]/_components/UserQueryJoin';
import useUser from '@hooks/useUser';

const JoinContents = () => {
  const { user, isPending } = useUser();

  if (isPending) return <GlobalLoading />;

  return (
    <div className="w-full h-full relative top-0 border-x border-gray-200">
      {user ? <UserQueryJoin userId={user.id} /> : <NonUserQueryJoin />}
    </div>
  );
};

export default JoinContents;
