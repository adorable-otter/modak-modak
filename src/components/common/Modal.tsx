'use client';

import { useRef } from 'react';
import useModalStore from 'stores/useModalStore';

interface ModalProps {
  children: React.ReactNode;
  onClickOutSide?: () => void;
}
const Modal = ({ children, onClickOutSide }: ModalProps) => {
  const { isOpen, closeModal } = useModalStore();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      if (onClickOutSide) onClickOutSide();
      closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="w-full modal-back-drop fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
      onClick={handleClickOutside} // 배경 클릭 시 닫기
    >
      <div
        ref={modalRef}
        className="bg-[#FFF] rounded-[12px] min-w-[19.438rem] px-5 py-7 flex flex-col items-center justify-center"
      >
        {children} {/* 내부 요소 렌더링 */}
      </div>
    </div>
  );
};

export default Modal;
