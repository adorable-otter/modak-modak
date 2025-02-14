'use client';

import { useState } from 'react';
import { DownArrow, UpArrow } from '@components/icons';
import { formatDate, formatTime } from '@utils/dateUtils';
import { ScheduleType } from '@ts/scheduleType';

type PostScheduleCardProps = {
  name: ScheduleType['name'];
  memo: ScheduleType['memo'];
  start_date: ScheduleType['start_date'];
  end_date: ScheduleType['end_date'];
  start_time: ScheduleType['start_time'];
};
const PostScheduleCard = ({ name, memo, start_date, end_date, start_time }: PostScheduleCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const labelClass = 'text-gray-500 whitespace-nowrap';
  const detailClass = 'flex items-center gap-3';

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };
  const isSingleDay = end_date === start_date;
  return (
    <div
      onClick={toggleDetails}
      className="box-border border border-gray-300 rounded-xl pl-[1.25rem] pr-[0.5rem] py-[0.5rem] gap-[0.5rem] cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold leading-[140%]">{name}</p>

        <div className="min-w-6">{showDetails ? <UpArrow /> : <DownArrow />}</div>
      </div>
      <div className={` ${showDetails ? 'block animate-fade-down animate-duration-200 text-xs' : 'hidden'} mt-1`}>
        {memo && (
          <div className={detailClass}>
            <span className={labelClass}>메모</span>
            <span className="truncate w-full">{memo}</span>
          </div>
        )}

        <div className="flex items-center whitespace-nowrap">
          <span className={`${labelClass} pr-3`}>일자</span>
          <span>{formatDate(start_date)}</span>
          {!isSingleDay && (
            <>
              <span className="px-1">⁓</span>
              <span className="truncate">{formatDate(end_date)}</span>
            </>
          )}
        </div>
        {start_time !== null && (
          <div className={detailClass}>
            <span className={labelClass}>시간</span>
            <span>{formatTime(start_time)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostScheduleCard;
