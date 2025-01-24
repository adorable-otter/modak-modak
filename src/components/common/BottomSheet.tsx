import { Sheet } from 'react-modal-sheet';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  snapPoint?: number[];
  className?: string;
  children: React.ReactNode;
}

const BottomSheet = ({ children, isOpen, onClose, snapPoint, className }: BottomSheetProps) => {
  return (
    <Sheet isOpen={isOpen} onClose={onClose} snapPoints={snapPoint} className="mx-auto max-w-[600px]">
      <Sheet.Container className={className ? className : 'bottom-sheet'}>
        <Sheet.Header className="mb-[21px]">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3" />
        </Sheet.Header>
        <Sheet.Content>
          <div className="w-full h-full p-5 flex items-center justify-center">{children}</div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} className="modal-back-drop modal-sheet-back-drop" />
    </Sheet>
  );
};

export default BottomSheet;
