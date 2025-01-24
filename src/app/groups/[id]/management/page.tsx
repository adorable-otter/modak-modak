import Header from '@components/common/Header';
import ManagementContents from '@app/groups/[id]/management/_components/ManagementContents';

interface ManagementPageProps {
  params: {
    id: string;
  };
}
const ManagementPage = ({ params }: ManagementPageProps) => {
  const { id } = params;

  return (
    <div className="mx-auto max-w-[600px] h-screen overflow-y-scroll scrollbar-hide">
      <div className="h-full border-x border-gray-200">
        <Header home={false} label={'관리 페이지'} isScrolled={true} />
        <ManagementContents groupId={id} />
      </div>
    </div>
  );
};

export default ManagementPage;
