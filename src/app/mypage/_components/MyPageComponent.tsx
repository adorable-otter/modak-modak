'use client';

import { useState } from 'react';
import ProfileSection from '@app/mypage/_components/ProfileSection';
import UserManagement from '@app/mypage/_components/UserManagementSection';
import LogoutModalContent from '@app/mypage/_components/modalContents/LogoutModalContent';
import UserDeleteModalContent from '@app/mypage/_components/modalContents/deleteGroup/UserDeleteModalContent';
import Modal from '@components/common/Modal';
import ProfileUpdateModalContent from '@app/mypage/_components/modalContents/ProfileUpdateModalContent';
import MySchedule from '@app/mypage/_components/MySchedule';
import Header from '@components/common/Header';

export type ModalStatus = 'logout' | 'delete' | 'profileUpdate';

const MyPageComponent = () => {
  const [modalStatus, setModalStatus] = useState<ModalStatus>('logout');
  const modalContents = {
    logout: <LogoutModalContent />,
    delete: <UserDeleteModalContent />,
    profileUpdate: <ProfileUpdateModalContent />,
  };

  return (
    <div className="reactive min-h-dvh">
      <Header label="마이 페이지" home={false} isScrolled={true} />
      <ProfileSection setModalStatus={setModalStatus} />
      <MySchedule />
      <UserManagement setModalStatus={setModalStatus} />
      <Modal>{modalContents[modalStatus]}</Modal>
    </div>
  );
};

export default MyPageComponent;
