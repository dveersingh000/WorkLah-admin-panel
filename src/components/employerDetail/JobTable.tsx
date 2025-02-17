import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const mockData = [
  {
    date: "1",
    groups: [
      {
        job: "Cleaner",
        jobStatus: ["Completed", "Completed"],
        shifts: ["11:00 AM", "02:00 PM"],
        vacancyFilled: ["4/5", "4/5"],
        standbyVacancy: ["2", "2"],
        onStandby: ["2", "2"],
        confirmed: ["2", "2"],
        standbyAbsentees: ["1", "1"],
      },
      {
        job: "Tray Collector",
        jobStatus: ["Completed", "Completed"],
        shifts: ["11:00 AM", "02:00 PM"],
        vacancyFilled: ["3/5", "3/5"],
        standbyVacancy: ["1", "1"],
        onStandby: ["1", "1"],
        confirmed: ["1", "1"],
        standbyAbsentees: ["0", "0"],
      },
    ],
  },
  {
    date: "2",
    groups: [
      {
        job: "Cleaner",
        jobStatus: ["Cancelled", "Active"],
        shifts: ["10:00 AM", "01:00 PM"],
        vacancyFilled: ["5/6", "5/6"],
        standbyVacancy: ["2", "2"],
        onStandby: ["2", "2"],
        confirmed: ["2", "2"],
        standbyAbsentees: ["1", "1"],
      },
      {
        job: "Tray Collector",
        jobStatus: ["Upcoming", "Upcoming"],
        shifts: ["10:00 AM", "01:00 PM"],
        vacancyFilled: ["4/6", "4/6"],
        standbyVacancy: ["2", "2"],
        onStandby: ["2", "2"],
        confirmed: ["2", "2"],
        standbyAbsentees: ["0", "0"],
      },
    ],
  },
  {
    date: "3",
    groups: [
      {
        job: "Cleaner",
        jobStatus: ["Cancelled", "Active"],
        shifts: ["10:00 AM", "01:00 PM"],
        vacancyFilled: ["5/6", "5/6"],
        standbyVacancy: ["2", "2"],
        onStandby: ["2", "2"],
        confirmed: ["2", "2"],
        standbyAbsentees: ["1", "1"],
      },
      {
        job: "Tray Collector",
        jobStatus: ["Upcoming", "Upcoming"],
        shifts: ["10:00 AM", "01:00 PM"],
        vacancyFilled: ["4/6", "4/6"],
        standbyVacancy: ["2", "2"],
        onStandby: ["2", "2"],
        confirmed: ["2", "2"],
        standbyAbsentees: ["0", "0"],
      },
    ],
  },
];

const JobTable: React.FC = () => {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selectedMonth, setSelectedMonth] = React.useState(
    new Date().getMonth()
  );
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="p-4">
      {/* Month Tabs */}
      <div className="relative flex items-center">
        <button className="absolute left-0 z-999" onClick={scrollLeft}>
          <ChevronLeft className="rounded-full p-2 shadow-lg w-10 h-10" />
        </button>
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-x-hidden scrollbar-hide mx-8 z-0"
        >
          <div className="flex gap-2 px-4">
            {months.map((month, index) => (
              <button
                key={month}
                className="px-6 py-3 m-1 border border-blue-300 rounded-full text-sm hover:bg-blue-100"
                onClick={() => setSelectedMonth(index)}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
        <button className="absolute right-0 z-999" onClick={scrollRight}>
          <ChevronRight className="rounded-full p-2 shadow-lg w-10 h-10" />
        </button>
      </div>

      {/* Summary Section */}
      <div className="mt-4 p-4 text-sm">
        <table className="table-auto w-full border-separate border-spacing-y-4">
          {/* Header Section */}

          <tr className="bg-[#EDF8FF] table-row-group mb-2 border-b-2 border-gray-300">
            <th className="px-6 py-4 text-center rounded-l-full">
              Jobs Posted:
            </th>
            <th className="px-6 py-4 text-center ">Filled Vacancy:</th>
            <th className="px-6 py-4 text-center ">Filled Standby:</th>
            <th className="px-6 py-4 text-center ">Standby Absentees:</th>
            <th className="px-6 py-4 text-center rounded-r-full">
              Avg. Monthly Att.:
            </th>
          </tr>

          {/* Body Section */}

          <tr
            className="rounded-b-lg first-letter:bg-gray-50 rounded-lg shadow-md divide-y divide-gray-200"
            style={{ boxShadow: "2px 2px 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            <td className="px-6 py-6 text-center ">62</td>
            <td className="px-6 py-6 text-center ">500/540</td>
            <td className="px-6 py-6 text-center ">2</td>
            <td className="px-6 py-6 text-center ">38/162</td>
            <td className="px-6 py-6 text-center ">96%</td>
          </tr>
        </table>
      </div>

      {/* Scrollable Table */}
      <div className="mt-4 overflow-auto bg-white rounded-md shadow-md overflow-y-scroll max-h-[704px] border border-gray-300 ">
        <div className="p-4 bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="table-auto w-full text-sm">
            {/* Header */}
            <thead className="bg-gray-300 ">
              <tr>
                <th className="px-8 py-4 text-center text-gray-700 rounded-l-lg">
                  Date
                </th>
                <th className="px-8 py-4 text-center text-gray-700 ">Jobs</th>
                <th className="px-8 py-4 text-center text-gray-700 ">
                  Job Status
                </th>
                <th className="px-8 py-4 text-center text-gray-700 ">Shifts</th>
                <th className="px-8 py-4 text-center text-gray-700 ">
                  Vacancy Filled
                </th>
                <th className="px-8 py-4 text-center text-gray-700 ">
                  Standby Filled
                </th>
                <th className="px-8 py-4 text-center text-gray-700 rounded-r-lg">
                  Total Applied
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 border border-gray-300">
              {mockData.map((data, index) => (
                <React.Fragment key={index}>
                  {data.groups.map((group, groupIndex) => (
                    <tr
                      key={groupIndex}
                      className={
                        groupIndex === 0
                          ? "bg-gray-50"
                          : "border-b border-gray-300 border-spacing-y-4"
                      }
                    >
                      {/* Date in the first column for the first group only */}
                      {groupIndex === 0 && (
                        <td
                          className="px-2 py-2 text-center border-r text-[16px] leading-[20px]  font-normal "
                          rowSpan={data.groups.length}
                        >
                          {data.date}
                        </td>
                      )}
                      <td className="px-2 py-2 border-r  text-[16px] leading-[20px]  font-normal ">{group.job}</td>
                      <td className="px-2 py-2 border-r text-[16px] leading-[20px]  font-normal ">
                        <div className="flex flex-col gap-2">
                          {group.jobStatus.map((status, statusIndex) => {
                            // Determine the styles based on the status
                            const statusStyles = {
                              Completed: "bg-[#E0F3FF] text-[#0099FF]",
                              Cancelled: "bg-[#FFEDEA] text-[#E34E30]",
                              Upcoming: "bg-[#FFF4E8] text-[#D37700]",
                              Active: "bg-[#ECFFEA] text-[#049609]",
                            };

                            const appliedStyles =
                              statusStyles[status] ||
                              "bg-gray-100 text-gray-700";
                            // Fallback if the status doesn't match any of the predefined cases

                            return (
                              <span
                                key={statusIndex}
                                className={`px-2 py-2 text-center rounded-full ${appliedStyles}`}
                              >
                                {status}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      <td className="px-2 py-2 border-r text-[16px] leading-[20px]  font-normal ">
                        <div className="flex flex-col gap-2">
                          {group.shifts.map((shift, shiftIndex) => (
                            <span
                              key={shiftIndex}
                              className="bg-[#048BE1] text-white px-2 py-2 text-center rounded-full"
                            >
                              {shift}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="px-2 py-2 border-r text-[16px] leading-[20px]  font-normal ">
                        <div className="flex flex-col gap-1">
                          {group.vacancyFilled.map((shift, shiftIndex) => (
                            <span key={shiftIndex} className="text-center">
                              {shift}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="px-2 py-2 border-r text-[16px] leading-[20px]  font-normal ">
                        <div className="flex flex-col gap-1">
                          {group.standbyVacancy.map((shift, shiftIndex) => (
                            <span key={shiftIndex} className="text-center">
                              {shift}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="px-2 py-2 border-r text-[16px] leading-[20px]  font-normal ">
                        <div className="flex flex-col gap-1">
                          {group.onStandby.map((shift, shiftIndex) => (
                            <span key={shiftIndex} className="text-center">
                              {shift}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* Add an empty row after each data.groups section */}
                  <tr className="h-4">
                    <td colSpan={7} className="border-none"></td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobTable;
