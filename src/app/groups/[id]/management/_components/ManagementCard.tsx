'use client';

import Link from 'next/link';

interface ManagementCardProps {
  children?: React.ReactNode;
  label: string;
  link?: string | null;
  handleClick?: () => void;
  className?: string;
}
const ManagementCard = ({ children, label, link = null, handleClick = () => {}, className }: ManagementCardProps) => {
  return (
    <>
      {link ? (
        <div>
          <Link href={link}>
            <div className={`w-full ${className}`} onClick={handleClick}>
              <div className="px-5 h-14 flex items-center justify-between">
                <span>{label}</span> {children}
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <div className={`w-full cursor-pointer ${className}`} onClick={handleClick}>
          <div className="px-5 h-14 flex items-center justify-between">
            <span>{label}</span> {children}
          </div>
        </div>
      )}
    </>
  );
};

export default ManagementCard;
