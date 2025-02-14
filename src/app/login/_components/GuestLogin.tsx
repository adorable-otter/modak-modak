'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Button from '@components/common/Button';
import { ModakIcon } from '@components/icons';
import { loginAsGuest } from '@queries/users/users';

const GuestLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleGuestButtonClick = async () => {
    await loginAsGuest();
    queryClient.invalidateQueries({ queryKey: ['user'] });
    router.push('/');
  };

  return (
    <>
      <div className="flex items-center h-14">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-5 text-gray-300 text-xs">또는</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <Button className="guest-login" label="로그인 없이 둘러보기" type="button" onClick={handleGuestButtonClick}>
        <ModakIcon />
      </Button>
    </>
  );
};

export default GuestLogin;
