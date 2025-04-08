import {
  Ban,
  CalendarDays,
  Edit,
  Eye,
  FileX2,
  Filter,
  Info,
  PhoneCall,
  Plus,
  Trash2,
  UserCheck,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import DatePicker from "react-datepicker";
import { FaCaretDown } from "react-icons/fa";
import { CustomScrollbar } from "../components/layout/CustomScrollbar";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/authInstances";
import { BiDuplicate } from "react-icons/bi";
import JobFilter from "../components/Filter/JobFilter";
import JobEmployerFilter from "../components/Filter/JobEmployerFilter";
import { convertIdToFourDigits, formatDate } from "../lib/utils";

interface Break {
  duration: string;
  status: "paid" | "unpaid";
}

interface Time {
  startTime: string;
  endTime: string;
}

interface Shift {
  id: string;
  time: Time[];
  breaks: Break[];
}

interface JobRow {
  role: string;
  jobId: string;
  date: string;
  numberOfShifts: number;
  shifts: Shift[];
  employer: string;
  outlet: {
    name: string;
    location: string;
  };
  vacancyUsers: string;
  standbyUsers: string;
  totalWage: number;
  status: "Active" | "Upcoming" | "Cancelled" | "Completed";
}

const JobManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [queryParams, setQueryParams] = useState({
    search: "",
    status: "",
    location: "",
    page: 1,
    limit: 5,
    sortOrder: "desc"
  });
  const [isPopupOpen, setIsPopupOpen] = useState<number | null>(null);
  const [jobsData, setJobsData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  console.log("jobsData", jobsData);
  const [startDate, setStartDate] = useState(new Date("2024-01-01"));
  const [endDate, setEndDate] = useState(new Date("2024-12-31"));
  const [isLimitPopupOpen, setIsLimitPopupOpen] = useState(false);
  const [isEmployerPopupOpen, setIsEmployerPopupOpen] = useState(false);
  const [activeJobs, setActiveJobs] = useState(0);
  const [upcomingJobs, setUpcomingJobs] = useState(0);
  const [cancelledJobs, setCancelledJobs] = useState(0);
  const [attendanceRate, setAttendanceRate] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("desc")
  const [selectedEmployers, setSelectedEmployers] = useState<Employer[]>([])
  console.log("selectedEmployers", selectedEmployers)


  const options = [
    { label: "Most Recent Required", value: "mostRecent" },
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ];

  const handleSelect = (value: string) => {
    let sortOrder = value === "mostRecent" ? "desc" : value;
  
    setSelectedOption(value);
    setQueryParams((prev) => ({
      ...prev,
      sortOrder,
      page: 1,
    }));
    setIsOpen(false);
  };

  const getLabel = (value: string) => {
    if (value === "asc") return "Ascending";
    if (value === "desc") return "Descending";
    return "Most Recent Required";
  };

  const popupRef = useRef<HTMLDivElement>(null);

  const companyImage = "https://worklah.onrender.com";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsLimitPopupOpen(false);
        setIsEmployerPopupOpen(false);
      }
    };

    if (isLimitPopupOpen || isEmployerPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLimitPopupOpen, isEmployerPopupOpen]);

  const CustomInput = React.forwardRef(({ value, onClick, label }, ref) => (
    <div
      className="flex items-center gap-2 px-4 py-2 border border-[#d9d9d9] rounded-xl bg-white cursor-pointer "
      onClick={onClick}
      ref={ref}
    >
      <CalendarDays className="text-[#048be1]" />
      <span className="text-sm text-[#000000] font-normal">
        {value || label}
      </span>
    </div>
  ));

  const navigate = useNavigate();

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-[#E5FFF6] text-green-600";
      case "Ongoing":
        return "bg-[#FFF4E8] text-[#D37700]";
      case "Cancelled":
        return "bg-[#FFF0ED] text-[#E34E30]";
      case "Completed":
        return "bg-[#E0F0FF] text-[#0099FF]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getBorderColor = (status: string) => {
    switch (status) {
      case "Active":
        return "border-l-4 border-l-green-500";
      case "Ongoing":
        return "border-l-4 border-l-[#D37700]";
        case "Upcoming":
          return "border-l-4 border-l-orange-500";        
      case "Cancelled":
        return "border-l-4 border-l-[#E34E30]";
      case "Completed":
        return "border-l-4 border-l-[#0099FF]";
      default:
        return "border-l-4 border-l-transparent";
    }
  };

  const getBreakColor = (status: string) => {
    return status === "Paid"
      ? "bg-[#E5FFF6] text-[#049609]"
      : "bg-[#FFF0ED] text-[#E34E30]";
  };

  const fetchJobDetails = async (params) => {
    const selectedEmployerId = selectedEmployers?.[0]?.id;

    const updatedParams = {
      ...params,
      ...(selectedEmployerId && { employerId: selectedEmployerId })
    };
  
    const queryString = new URLSearchParams(updatedParams).toString();
  
  

    try {
      const response = await axiosInstance.get(`/admin/jobs?${queryString}`);

      // console.log("API Response:", response.data); // ✅ Check if data is fetched

      if (response.data?.jobs) {
        // console.log("Setting Jobs Data:", response.data.jobs); // ✅ Verify before updating state
        setJobsData(response.data.jobs); // ✅ Set the job data
        setTotalData(response.data);
      } else {
        console.warn("No jobs found in response");
        setJobsData([]); // Set empty array to prevent UI crash
      }
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setQueryParams((prev) => ({
      ...prev,
      page: pageNumber,
    }));
  };
  

  const totalPages = Math.ceil((totalData?.totalCount || 0) / queryParams.limit);


  const updateJobStatus = async (jobId, status) => {
    try {
      await axiosInstance.put(`/jobs/${jobId}`, { status });
      // console.log(`Job ${jobId} status updated to ${status}`);
    } catch (error) {
      console.error(`Failed to update job ${jobId} status:`, error);
    }
  };

  // console.log(jobsData);
  useEffect(() => {
    fetchJobDetails(queryParams);
  }, [queryParams, selectedEmployers]);

  const handlePopupToggle = (index: number) => {
    setIsPopupOpen(isPopupOpen === index ? null : index);
  };

  const handleActionClick = (action: string, id: number) => {
    // alert(`Action: ${action}, Row: ${index}`);
    if (action === "View") {
      navigate(`/jobs/${id}`);
    }
    if(action==="Modify"){
      navigate(`/jobs/${id}/modify`)
    }
    if (action === "Cancel Job") {
      axiosInstance
        .put(`/admin/jobs/cancel/${id}`)
        .then((response) => {
          console.log("Job deleted");

          fetchJobDetails(queryParams);
          // Assign the jobs array or an empty array
        })
        .catch((error) => {
          console.error("Error fetching job details:", error);
        });
    }
    setIsPopupOpen(null);
  };

  useEffect(() => {
    const calculateStats = () => {
      if (jobsData && jobsData.length > 0) {
        const active = jobsData.filter((job) => job.status === "Active").length;
        const upcoming = jobsData.filter(
          (job) => job.status === "Ongoing"
        ).length;

        setActiveJobs(active);
        setUpcomingJobs(upcoming);

        // Calculate average attendance rate
        const totalAttendance = jobsData.reduce(
          (acc, job) => acc + (job.attendanceRate || 0),
          0
        );
        const avgAttendance =
          jobsData.length > 0 ? totalAttendance / jobsData.length : 0;
        setAttendanceRate(avgAttendance.toFixed(2)); // Round to 2 decimal places
      }
    };

    calculateStats();
  }, [jobsData]);

  return (
    <div className="p-5 max-w-7xl mx-auto font-sans">
      {/* Jobs Section */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="text-[36px] font-[500] text-[#1F2937]">Jobs</h1>

          <div className="flex items-center gap-6 ">
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-[#636363] mb-1">
                  Start Date
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="d MMMM, yyyy"
                  customInput={<CustomInput label="Select Start Date" />}
                />
              </div>
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-[#636363] mb-1">
                  End Date
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="d MMMM, yyyy"
                  customInput={<CustomInput label="Select End Date" />}
                />
              </div>
            </div>
            <button
  onClick={() => {
    const formattedStart = startDate.toISOString().split("T")[0];
    const formattedEnd = endDate.toISOString().split("T")[0];

    setQueryParams((prev) => ({
      ...prev,
      startDate: formattedStart,
      endDate: formattedEnd,
      page: 1,
    }));
  }}
  className="mt-6 px-4 py-2 rounded-xl bg-[#048be1] text-white text-sm font-medium"
>
  Apply Filter
</button>

            <Link to="/jobs/create-job">
              <button className="p-[14px] rounded-[26px] shadow-lg bg-[#FFFFFF] hover:bg-gray-50 ">
                <Plus className="w-[24px] h-[24px]" />
              </button>
            </Link>
            <div>
              <div className="flex items-center justify-end gap-4">
                <button
                  className="p-[14px] rounded-[26px] shadow-lg bg-dark hover:bg-slate-950 "
                  onClick={() => setIsLimitPopupOpen(!isLimitPopupOpen)}
                >
                  <Filter
                    className="w-[20px] h-[20px]"
                    color="#FFFFFF"
                    fill="#ffffff"
                  />
                </button>

                {isLimitPopupOpen && (
  <div
    ref={popupRef}
    className="absolute right-[16%] top-[12%] mt-2 bg-white border rounded-[20px] shadow-lg z-50"
  >
    <JobFilter
      onApplyFilter={(newFilters) => {
        setQueryParams((prev) => ({
          ...prev,
          status: newFilters.status?.[0] || "",
          location: newFilters.city?.[0] || "",
          // You can include shift range here too
          page: 1,
        }));
      }}
      onClose={() => setIsLimitPopupOpen(false)} // 👈 Close the filter modal
    />
  </div>
)}

              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div
          className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 rounded-[30px] bg-white py-12 px-4"
          style={{ boxShadow: "0px 9px 20px 9px rgba(0, 0, 0, 0.09)" }}
        >
          <div className="rounded-lg flex flex-col items-center">
            <h2 className="text-[48px] leading-[60px] font-medium text-[#049609]">
              {totalData.totalActiveJobs}
            </h2>
            <p className="text-[20px] leading-[25px] font-medium text-[#4c4c4c]">
              Active Jobs
            </p>
          </div>
          <div className="rounded-lg flex flex-col items-center">
            <h2 className="text-[48px] leading-[60px] font-medium text-[#e39127]">
              {totalData.totalUpcomingJobs}
            </h2>
            <p className="text-[20px] leading-[25px] font-medium text-[#4c4c4c]">
              Upcoming Jobs
            </p>
          </div>
          <div className="rounded-lg flex flex-col items-center">
            <h2 className="text-[48px] leading-[60px] font-medium text-[#fd5426]">
              {totalData.totalCancelledJobs}
            </h2>
            <p className="text-[20px] leading-[25px] font-medium text-[#4c4c4c]">
              Cancelled Jobs
            </p>
          </div>
          <div className="rounded-lg flex flex-col items-center">
            <h2 className="text-[48px] leading-[60px] font-medium text-[#0099ff]">
              {totalData.averageAttendanceRate}
            </h2>
            <p className="text-[20px] leading-[25px] font-medium text-[#4c4c4c]">
              Average Attendance Rate
            </p>
          </div>
        </div>

        {/* Job Types Filter */}
        <div className="flex gap-6 mb-6 text-sm bg-[#f3f3f3] justify-between items-center rounded-2xl py-4 px-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4">
              <p className="w-[6px] h-8  bg-green-500 "></p>
              <p className="text-[20px] leading-[24px] font-medium ">
                High Demand Jobs
              </p>
            </div>
            <Info className="w- h-8 cursor-pointer" />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4">
              <p className="w-[6px] h-8  bg-orange-500 "></p>
              <p className="text-[20px] leading-[24px] font-medium ">
              Soon-to-Start Jobs
              </p>
            </div>
            <Info className="w- h-8 cursor-pointer" />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4">
              <p className="w-[6px] h-8 bg-red-500 "></p>
              <p className="text-[20px] leading-[24px] font-medium ">
                High No Show Jobs
              </p>
            </div>
            <Info className="w- h-8 cursor-pointer" />
          </div>
        </div>

        {/*Filter */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-4 bg-black text-white px-4 py-2 rounded-xl cursor-pointer">
              <p>Select Employer</p>
              <div>
                <div className="flex items-center justify-end gap-4">
                  <button
                    className="rounded-[26px] shadow-lg bg-dark hover:bg-slate-950 "
                    onClick={() => setIsEmployerPopupOpen(!isEmployerPopupOpen)}
                  >
                    <FaCaretDown />
                  </button>

                  {isEmployerPopupOpen && (
  <div
    ref={popupRef}
    className="absolute left-[1%] top-[18%] mt-2 bg-white border rounded-[20px] shadow-lg z-50"
  >
    <JobEmployerFilter
      onClose={() => setIsEmployerPopupOpen(false)}
      onSelect={(selected) => {
        setSelectedEmployers(selected)
        // Do something with selected if needed
      }}
    />
  </div>
)}

                </div>
              </div>
            </div>
            <div className="relative inline-block text-left">
            <div
        className="flex items-center gap-4 bg-white text-black border border-black px-4 py-2 rounded-xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)} // toggle dropdown
      >
        <p>{getLabel(selectedOption)}</p>
        <FaCaretDown />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-black rounded-xl shadow-lg">
          <ul className="py-1">
          {options.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
            
          </div>
          {/* <div className="flex items-center gap-4 bg-white text-black border border-black px-4 py-2 rounded-xl cursor-pointer">
            <p>All</p>
            <FaCaretDown />
          </div> */}
        </div>

        {/* Jobs Table */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto no-scrollbar"
        >
          <table className="table-auto w-full border-collapse relative h-48">
            <thead>
              <tr className="bg-[#EDF8FF] ">
                <th className="p-4 text-center text-sm truncate font-medium text-gray-500 whitespace-nowrap rounded-l-full">
                  Job Roles
                </th>
                <th className="p-4 text-center text-sm truncate font-medium text-gray-500">
                  Date
                </th>
                <th className="p-4 text-center text-sm truncate font-medium text-gray-500">
                  Number of shifts
                </th>
                <th className="p-4 text-center text-sm truncate font-medium text-gray-500">
                  Shift Timings
                </th>
                <th className="p-4 text-center text-sm truncate font-medium text-gray-500">
                  Shift ID
                </th>
                <th className="p-4 text-center text-sm truncate font-medium text-gray-500">
                  Employer
                </th>
                <th className="p-4 text-center text-sm truncate font-medium text-gray-500">
                  Outlet
                </th>
                <th className="p-4 text-center text-sm truncate font-medium text-gray-500">
                  Breaks
                </th>
                <th className="p-4 text-center text-sm truncate font-medium text-gray-500">
                  Total Duration
                </th>
                <th className="p-4 text-center text-sm truncate font-medium text-gray-500">
                  Vacancy Users
                </th>
                <th className="p-4 text-center text-sm truncate font-medium text-gray-500">
                  Standby Users
                </th>
                <th className="p-4 text-center text-sm truncate font-medium text-gray-500">
                  Total wage
                </th>
                <th className="p-4 text-center text-sm truncate font-medium text-gray-500">
                  Job Status
                </th>
                <th className="p-4 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {jobsData.length > 0 ? (
                jobsData.map((row, index) => (
                  <tr
                    key={row._id || index}
                    className="border-b border-gray-300"
                  >
                    {/* Job Name & ID */}
                    <td className="p-4 text-left truncate border-l border-gray-300">
                      <div className={`${getBorderColor(row.jobStatus)} pl-2`}>
                        <div className="font-medium">
                          {row.jobName || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                          Job Id: #{convertIdToFourDigits(row._id)}
                        </div>
                      </div>
                    </td>
                    {/* Job Date */}
                    <td className="p-4 text-center truncate border-l border-gray-300">
                      {row.date ? formatDate(row.date) : "N/A"}
                    </td>
                    {/* Number of Shifts */}
                    <td className="p-4 text-center truncate border-l border-gray-300">
                      {row.shifts?.length || "0"}
                    </td>
                    {/* Shift Timings */}
                    <td className="p-4 text-center truncate border-l border-gray-300">
                      <div className="flex flex-col gap-2">
                        {row.shifts?.length > 0
                          ? row.shifts.map((shift, i) => (
                              <div
                                key={i}
                                className="bg-[#048BE1] px-2.5 py-1 rounded-full font-medium text-white"
                              >
                                {`${shift.startTime} - ${shift.endTime}`}
                              </div>
                            ))
                          : "N/A"}
                      </div>
                    </td>
                    {/* Shift ID */}
                    <td className="p-4 text-center truncate border-l border-gray-300">
                      {row.shifts?.length > 0
                        ? row.shifts.map((shift, i) => (
                            <div key={i}>
                              {convertIdToFourDigits(shift.shiftId)}
                              <br />
                            </div>
                          ))
                        : "N/A"}
                    </td>

                    {/* Employer */}
                    <td className="p-4 text-left truncate border-l border-gray-300">
                      <img
                        className="w-8 h-8 inline-block mr-2"
                        src={`${companyImage}${
                          row.employer?.logo || "/static/company.png"
                        }`}
                        alt="Company Logo"
                      />
                      {row.employer?.name || "N/A"}
                    </td>
                    {/* Outlet */}
                    <td className="p-4 text-left truncate border-l border-gray-300">
                      <img
                        className="w-8 h-8 inline-block mr-2"
                        src={`${companyImage}${
                          row.outlet?.logo || "/static/company.png"
                        }`}
                        alt="Company Logo"
                      />
                      {row.outlet?.name || "N/A"}
                      <br />
                      <span className="text-xs">
                        {row.outlet?.location || "N/A"}
                      </span>
                    </td>
                    {/* Breaks */}
                    {/* Breaks */}
                    <td className="p-4 text-center truncate border-l border-gray-300">
                      <div className="flex flex-col gap-2">
                        {row.shifts?.length > 0
                          ? row.shifts.map((shift, i) => {
                              const breakParts = shift.breakIncluded.split(" "); // Splitting "1 Hrs Paid" into ["1", "Hrs", "Paid"]
                              const breakType = breakParts[2] || ""; // Extracting "Paid" or "Unpaid"

                              return (
                                <div key={i} className="font-medium">
                                  <span className="text-black">{`${breakParts[0]} ${breakParts[1]} `}</span>
                                  <span
                                    className={
                                      breakType === "Paid"
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }
                                  >
                                    {breakType}
                                  </span>
                                </div>
                              );
                            })
                          : "N/A"}
                      </div>
                    </td>

                    {/* Total Duration */}
                    <td className="p-4 text-center truncate border-l border-gray-300">
                      {row.shifts?.[0]?.duration || "N/A"}
                    </td>
                    {/* Vacancy Users */}
                    <td className="p-4 text-center truncate border-l border-gray-300">
                      {row.vacancyUsers || "0"}
                    </td>
                    {/* Standby Users */}
                    <td className="p-4 text-center truncate border-l border-gray-300">
                      {row.standbyUsers || "0"}
                    </td>
                    {/* Total Wage */}
                    <td className="p-4 text-center truncate border-l border-gray-300">
                      {row.totalWage || "N/A"}
                    </td>
                    {/* Job Status */}
                    <td className="p-4 text-center truncate border-l border-gray-300">
                      <span
                        className={`px-2.5 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          row.jobStatus
                        )}`}
                      >
                        {row.jobStatus || "N/A"}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="p-4 text-center truncate border-l border-gray-300">
                      <button
                        className="p-2 hover:bg-gray-100 rounded-full"
                        onClick={() => handlePopupToggle(index)}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {isPopupOpen === index && (
                        <div className="absolute top-[30%] right-14 mt-1 w-32 bg-white shadow-md border border-gray-300 rounded-md z-10">
                          <button
                            className="flex items-center gap-2 p-2 w-full text-left text-gray-700 hover:bg-gray-100"
                            onClick={() => handleActionClick("View", row._id)}
                          >
                            <Eye size={16} /> View
                          </button>
                          <button
                            className="flex items-center gap-2 p-2 w-full text-left text-gray-700 hover:bg-gray-100"
                            onClick={() => handleActionClick("Modify", row._id)}
                          >
                            <Edit size={16} /> Modify
                          </button>
                          <button
                            className="flex items-center gap-2 p-2 w-full text-left text-[#E34E30] hover:bg-gray-100"
                            onClick={() =>
                              handleActionClick("Cancel Job", row._id)
                            }
                          >
                            <Ban size={16} color="#E34E30" /> Cancel Job
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="14" className="text-center py-4">
                    No jobs available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <CustomScrollbar
          scrollContainerRef={scrollContainerRef}
          totalSteps={3}
        />
        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-6">
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50"
  >
    ←
  </button>

  {/* Dynamic page buttons */}
  {[...Array(totalPages)].map((_, index) => {
    const pageNumber = index + 1;
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`px-3 py-1 border rounded-md ${
          pageNumber === currentPage
            ? "border-blue-500 bg-blue-500 text-white"
            : "border-gray-300 bg-white hover:bg-gray-50"
        }`}
      >
        {pageNumber}
      </button>
    );
  })}

  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50"
  >
    →
  </button>
</div>

      </div>
    </div>
  );
};

export default JobManagement;
