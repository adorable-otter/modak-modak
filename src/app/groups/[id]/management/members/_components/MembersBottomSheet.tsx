'use client';

import useBottomSheetStore from '@stores/useBottomSheetStore';
import useModalStore from '@stores/useModalStore';
import BottomSheet from '@components/common/BottomSheet';
import Button from '@components/common/Button';
import { Leader } from '@components/icons';

const MembersBottomSheet = () => {
  const { openModal } = useModalStore();
  const { isActionModalOpen, setActionModalOpen } = useBottomSheetStore();

  const onCloseBottomSheet = () => {
    setActionModalOpen(false);
  };

  const onModalOpen = () => {
    setActionModalOpen(false);
    openModal();
  };

  return (
      <BottomSheet isOpen={isActionModalOpen} onClose={onCloseBottomSheet} className="management mx-auto max-w-[600px]">
        <div className="my-5 w-full rounded-xl overflow-hidden divide-y divide-gray-200">
          <div className="bg-gray-100">
            <Button
              type={'button'}
              label="대표 양도하기"
              className={'w-full px-3 py-4 flex justify-start items-center gap-4'}
              onClick={onModalOpen}
            >
              <Leader />
            </Button>
          </div>
        </div>
      </BottomSheet>
  );
};

export default MembersBottomSheet;
