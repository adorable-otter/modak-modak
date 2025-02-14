import { useQuery } from '@tanstack/react-query';
import useUser from '@hooks/common/useUser';
import { getMySchedules, MyScheduleData } from '@queries/schedule/ScheduleActions';

interface MySchedule {
  schedules: MyScheduleData[];
  isPending: boolean;
  isError: boolean;
}

const useMySchedule = (): MySchedule => {
  const { user, isPending: isUserPending, isError: isUserError } = useUser();
  const {
    data: schedules,
    isPending: isSchedulePending,
    isError: isScheduleError,
  } = useQuery({
    queryKey: ['mySchedule', user?.id],
    queryFn: () => getMySchedules(user!.id),
    enabled: !!user,
  });

  return {
    schedules,
    isPending: isUserPending || isSchedulePending,
    isError: isUserError || isScheduleError,
  } as MySchedule;
};

export default useMySchedule;
