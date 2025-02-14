'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

import { useGroupSchedules } from '@hooks/schedule/useGroupSchedules';

import { PrevArrow } from '@components/icons';
import SpinnerContainer from '@components/common/SpinnerContainer';
import ScheduleCard from '@components/common/scheduleCard/ScheduleCard';

import CountBar from '@app/groups/[id]/_components/CountBar';
import NoSchedule from '@app/groups/[id]/_components/NoSchedule';
import SearchBar from '@app/groups/[id]/_components/SearchBar';
import NoSearchSchedule from '@app/groups/[id]/_components/NoSearchSchedule';
import ScheduleBottomBanner from '@app/groups/[id]/_components/ScheduleBottomBanner';

export interface Schedule {
  id: string;
  name: string;
  memo: string | null;
  start_date: string;
  end_date: string;
  start_time: string | null;
}

interface ScheduleSelectProps {
  setIsScheduleModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSchedule: Schedule | null;
  setSelectedSchedule: React.Dispatch<React.SetStateAction<Schedule | null>>;
}

const ScheduleSelectSection = ({
  setIsScheduleModalOpen,
  selectedSchedule,
  setSelectedSchedule,
}: ScheduleSelectProps) => {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const searchQuery = searchTerm ? searchTerm : undefined;

  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const { scheduleData, isPending } = useGroupSchedules(groupId, searchQuery);

  const handleSelectSchedule = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setIsScheduleModalOpen(false); // 선택 후 모달 닫기
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-30">
        <div className="w-full max-w-[600px] h-full bg-white border border-gray-200 flex flex-col">
          <header className="flex-none">
            <div className="relative w-full max-w-[600px] mx-auto h-12 flex items-center justify-center bg-white">
              <div
                className="absolute top-[50%] transform translate-y-[-50%] left-5 cursor-pointer w-10 h-10 flex items-center justify-center"
                onClick={() => setIsScheduleModalOpen(false)}
              >
                <PrevArrow className="w-6 h-6" />
              </div>
              <h3 className="text-center text-xl font-semibold leading-[140%]">일정 선택하기</h3>
            </div>
          </header>

          <section className="px-5 flex-1 overflow-y-scroll scrollbar-hide pb-[90px]">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="mt-6 mb-5">
              <CountBar value={scheduleData ? scheduleData.length : 0} />
            </div>
            {isPending ? (
              <SpinnerContainer />
            ) : scheduleData && scheduleData.length > 0 ? (
              scheduleData.map((schedule, index) => (
                <div className="mb-5" key={index} onClick={() => handleSelectSchedule(schedule)}>
                  <ScheduleCard
                    name={schedule.name}
                    memo={schedule.memo}
                    start_date={schedule.start_date}
                    end_date={schedule.end_date}
                    start_time={schedule.start_time}
                    isSelected={selectedSchedule?.id === schedule.id}
                  />
                </div>
              ))
            ) : searchTerm ? (
              <NoSearchSchedule />
            ) : (
              <NoSchedule />
            )}
          </section>
        </div>
        <ScheduleBottomBanner />
      </div>
    </>
  );
};
export default ScheduleSelectSection;
