import Image from 'next/image';
import useUser from '@hooks/common/useUser';

const UserDetails = () => {
  const { user, isPending } = useUser();

  if (isPending) return null;

  return (
    <>
      <div className="w-14 h-14 mr-5">
        <Image
          src={user?.user_metadata.profile_image}
          width={56}
          height={56}
          alt="profile image"
          className="w-14 h-14 rounded-full object-cover"
          priority={true}
        />
      </div>
      <span className="leading-[140%] font-semibold text-lg">{user?.user_metadata.nickname}</span>
    </>
  );
};

export default UserDetails;
