'use client';

import { useParams, useRouter } from 'next/navigation';

import { Logo, Notification, PrevArrow, Setting } from '@components/icons';

import useHeaderStore from '@stores/useHeaderStore';

interface HeaderProps {
  home: boolean;
  label?: string;
  hasSetting?: boolean;
  isScrolled?: boolean;
}

const Header = ({ home = false, label, hasSetting, isScrolled }: HeaderProps) => {
  const router = useRouter();

  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const { groupName } = useHeaderStore();

  const handleNavigation = () => router.back();

  const handleGroupManagement = (groupId: string) => {
    router.push(`/groups/${groupId}/management`);
  };

  return (
    <header
      className={`m-auto max-w-[600px] w-full sticky top-0 left-0 right-0 z-10 transition-colors ${isScrolled ? 'bg-white' : 'bg-primary-10'} `}
    >
      <div className="px-5 h-12 flex items-center justify-between">
        {home ? (
          <Logo className="w-20 h-10" />
        ) : (
          <div className={`${!hasSetting ? 'w-10' : 'w-20'} flex items-center justify-start`}>
            <PrevArrow onClick={handleNavigation} className="w-6 h-6" />
          </div>
        )}

        {label && <h3 className="text-xl font-semibold leading-[140%] text-gray-900">{label}</h3>}
        {isScrolled && groupName && (
          <h3 className="text-xl font-semibold leading-[140%] text-gray-900 overflow-hidden whitespace-nowrap text-ellipsis break-all">
            {groupName}
          </h3>
        )}

        <div className="flex items-center justify-between">
          <div className="w-10 p-2">
            <Notification className="cursor-pointer" />
          </div>
          {hasSetting && (
            <div className="w-10 p-2" onClick={() => handleGroupManagement(groupId)}>
              <Setting className="cursor-pointer" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
