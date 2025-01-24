import Header from '@components/common/Header';
import MembersPageContents from '@app/groups/[id]/management/members/_components/MembersPageContents';

const MembersPage = () => {
  return (
    <div className="mx-auto max-w-[600px] h-screen overflow-y-scroll scrollbar-hide">
      <div className="h-full border-x border-gray-200">
        <Header home={false} label={'멤버 목록'} isScrolled={true} />
        <div className="pt-6 mb-36 scrollbar-hide">
          <MembersPageContents />
        </div>
      </div>
    </div>
  );
};

export default MembersPage;
