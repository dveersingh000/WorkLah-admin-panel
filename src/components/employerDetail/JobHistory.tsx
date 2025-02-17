import { CalendarCheck, CalendarX2, Clock } from 'lucide-react';
import React from 'react'
import { GoChecklist } from 'react-icons/go';
import { MdOutlineVerifiedUser } from 'react-icons/md';


interface ProfileStats {
  attendanceRate: number;
  totalCompletedJobs: number;
  cancellationWithProof: number;
  moreThan15hrsCancellation: number;
  neverTurnUp: number;
  lessThan15hrsCancellation: number;
  workingHours: number;
}

const stats: ProfileStats = {
    attendanceRate: 95,
    totalCompletedJobs: 149,
    cancellationWithProof: 1,
    moreThan15hrsCancellation: 4,
    neverTurnUp: 1,
    lessThan15hrsCancellation: 6,
    workingHours: 234,
  };

const JobHistory = () => {
  return (
    <div className="grid grid-cols-3 gap-8 py-4">
                <StatItem
                  icon={CalendarCheck}
                  label="Attendance Rate"
                  value={`${stats.attendanceRate}%`}
                />
                <StatItem
                  icon={MdOutlineVerifiedUser}
                  label="Cancellation with Proof"
                  value={stats.cancellationWithProof}
                />
                <StatItem
                  icon={Clock}
                  label="Never Turn Up"
                  value={stats.neverTurnUp}
                />
                <StatItem
                  icon={Clock}
                  label="Working Hours"
                  value={stats.workingHours}
                />
             
                <StatItem
                  icon={GoChecklist}
                  label="Total Completed Job"
                  value={stats.totalCompletedJobs}
                />
                <StatItem
                  icon={CalendarX2}
                  label="More than 15hrs Cancellation"
                  value={stats.moreThan15hrsCancellation}
                />
                <StatItem
                  icon={CalendarX2}
                  label="Less than 15hrs Cancellation"
                  value={stats.lessThan15hrsCancellation}
                />
            </div>
  )
}

interface StatItemProps {
    icon: React.ElementType;
    label: string;
    value: number | string;
  }

const StatItem: React.FC<StatItemProps> = ({ icon: Icon, label, value }) => (
    <div className="py-4">
      <div className="flex items-center gap-2 text-gray-600 mb-4">
        <Icon className="w-170px] h-[19px]" color="#4c4c4c" />
        <span className="text-[16px] leading-[20px] text-[#4c4c4c] font-medium">
          {label}
        </span>
      </div>
      <p className="text-[24px] font-normal leading-[30px] text-[#000000]">
        {value}
      </p>
    </div>
  );

export default JobHistory
