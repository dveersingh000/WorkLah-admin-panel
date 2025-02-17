"use client";

import {
  ArrowLeft,
  Briefcase,
  CalendarIcon,
  Clock,
  Delete,
  Edit2,
  Minus,
  MoreVertical,
  Pencil,
  Plus,
  Rows2,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { TiDocumentText } from "react-icons/ti";
import { axiosInstance } from "../../lib/authInstances";
import { useNavigate, useParams } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";
import { FaCaretDown } from "react-icons/fa";
import { getTodayDate } from "../../lib/utils";

interface JobFormData {
  jobName: string;
  company: {
    name: string;
    agreementEndDate: Date;
  };
  outletName: string;
  date: { day: number; month: number; year: number }; // Object format
  dates: { day: number; month: number; year: number }[];
  location: string;
  industry: string;
  shifts: any[]; // Update `any` with a more specific type if known
  requirements: {
    jobScopeDescription: string;
    jobRequirements: string;
  };
}

interface Shift {
  _id: string;
  startTime: { hours: string; minutes: string; period: string };
  endTime: { hours: string; minutes: string; period: string };
  vacancy: number;
  standbyVacancy: number;
  duration: number;
  breakHours: number;
  breakType: string;
  rateType: string;
  payRate: number;
  totalWage: number;
  
}

export default function ModifyJob() {
  const [jobsData, setJobsData] = useState({});
  const [formData, setFormData] = useState<JobFormData>({
    jobName: "",
    company: {
      name: "",
      agreementEndDate: new Date(),
    },
    outletName: "Domino's",
   date: getTodayDate(), // Default date object
   dates: [getTodayDate()], // Array of selected dates
    location: "",
    industry: "",
    shifts: [],
    requirements: {
      jobScopeDescription: "",
      jobRequirements: "",
    },
  });

  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [selectedCompanyOption, setSelectedCompanyOption] = useState(
    "RIGHT SERVICE PTE. LTD."
  );
  const [shifts, setShifts] = useState<Shift[]>( []);
  // const [shifts, setShifts] = useState<Shift[]>([
  //   {
  //     id: "1",
  //     startTime: { hours: "07", minutes: "00", period: "AM" },
  //     endTime: { hours: "11", minutes: "00", period: "AM" },
  //     vacancy: 3,
  //     standbyVacancy: 1,
  //     duration: 4,
  //     breakHours: 1,
  //     breakType: "Paid",
  //     rateType: "Flat rate",
  //     payRate: 20,
  //     totalWage: 80,
  //     status: "Active",
  //   },
  //   {
  //     id: "2",
  //     startTime: { hours: "11", minutes: "00", period: "AM" },
  //     endTime: { hours: "03", minutes: "00", period: "PM" },
  //     vacancy: 3,
  //     standbyVacancy: 1,
  //     duration: 4,
  //     breakHours: 1,
  //     breakType: "Paid",
  //     rateType: "Flat rate",
  //     payRate: 20,
  //     totalWage: 80,
  //     status: "Upcoming",
  //   },
  //   {
  //     id: "3",
  //     startTime: { hours: "00", minutes: "00", period: "AM" },
  //     endTime: { hours: "00", minutes: "00", period: "AM" },
  //     vacancy: 3,
  //     standbyVacancy: 1,
  //     duration: 4,
  //     breakHours: 1,
  //     breakType: "Paid",
  //     rateType: "Flat rate",
  //     payRate: 20,
  //     totalWage: 80,
  //     status: "Upcoming",
  //   },
  // ]);
  const companies = [
    {
      value: "RIGHT SERVICE PTE. LTD.",
      label: "RIGHT SERVICE PTE. LTD.",
      image: "/assets/company.png",
    },
    {
      value: "Tech Solutions Pvt. Ltd.",
      label: "Tech Solutions Pvt. Ltd.",
      image: "/assets/company.png",
    },
    { value: "Company 2", label: "Company 2", image: "/assets/company.png" },
    { value: "Company 3", label: "Company 3", image: "/assets/company.png" },
  ];
  const handleIncrease = (id, key, maxValue) => {
    setShifts((prevShifts) =>
      prevShifts.map((shift) =>
        shift._id === id
          ? { ...shift, [key]: Math.min(shift[key] + 1, maxValue) }
          : shift
      )
    );
  };

  const handleDecrease = (id, key) => {
    setShifts((prevShifts) =>
      prevShifts.map((shift) =>
        shift._id === id
          ? { ...shift, [key]: Math.max(shift[key] - 1, 0) }
          : shift
      )
    );
  };
  const handleCompanyOptionSelect = (value: string) => {
    const selectedCompany = companies.find((option) => option.value === value);

    // Update the selected company and formData
    if (selectedCompany) {
      setSelectedCompanyOption(value);
      setFormData((prevData) => ({
        ...prevData,
        company: {
          ...prevData.company,
          name: selectedCompany.label, // Update company name in formData
        },
      }));
    }

    setIsCompanyDropdownOpen(false); // Close the dropdown after selection
  };
  const deleteShift = (id: string) => {
    setShifts((prevShifts) => prevShifts.filter((shift) => shift.id !== id));
  };

  const addShift = () => {
    const newShift: Shift = {
      _id: Date.now().toString(),
      startTime: { hours: "00", minutes: "00", period: "AM" },
      endTime: { hours: "00", minutes: "00", period: "AM" },
      vacancy: 3,
      standbyVacancy: 1,
      duration: 4,
      breakHours: 1,
      breakType: "Paid",
      rateType: "Flat rate",
      payRate: 20,
      totalWage: 80,
      
    };
    setShifts((prevShifts) => [...prevShifts, newShift]);
  };
  console.log(shifts);

  const updateTime = (
    id: string,
    timeType: "startTime" | "endTime",
    value: string
  ) => {
    setShifts((prevShifts) =>
      prevShifts.map((shift) => {
        if (shift.id === id) {
          return {
            ...shift,
            [timeType]: value,
          };
        }
        return shift;
      })
    );
  };

  
  const maxStandby = 1;
  const maxVacancy = 3;

  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "company.name") {
      setFormData((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          name: value, // Ensure it's a string
        },
      }));
    } else if (name === "requirements.jobRequirements") {
      setFormData((prev) => ({
        ...prev,
        requirements: {
          ...prev.requirements,
          jobRequirements: value,
        },
      }));
    }

    // For updating jobScopeDescription
    else if (name === "requirements.jobScopeDescription") {
      setFormData((prev) => ({
        ...prev,
        requirements: {
          ...prev.requirements,
          jobScopeDescription: value,
        },
      }));
    } else {
      // Handle other top-level fields
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`jobs/${jobId}`, formData);
      console.log(response);
      navigate("/jobs/job-management");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const { jobId } = useParams();

  const fetchJobDetails = async () => {
    axiosInstance
      .get(`/jobs/${jobId}`)
      .then((response) => {
        setJobsData(response.data || {}); // Assign the jobs array or an empty array
        const formattedData = {
          ...response.data,
          company: {
            ...response.data.company,
            agreementEndDate: new Date(response.data.company.agreementEndDate),
          },
          requirements: {
            jobScopeDescription: response.data.jobScopeDescription,
            jobRequirements: response.data.jobRequirements,
          },
        };
        setSelectedCompanyOption(response.data.company.name);
        setShifts(response.data.shifts)
        setFormData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
      });
  };
  console.log(jobsData);
  console.log(jobId);
  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);
  const handleBreakTypeChange = (id: string, newBreakType: string) => {
    setShifts((prevShifts) =>
      prevShifts.map((shift) =>
        shift.id === id ? { ...shift, breakType: newBreakType } : shift
      )
    );
  };

  const handleDateChange = (field: "day" | "month" | "year", value: number) => {
    setFormData((prevData) => {
      const updatedDate = { ...prevData.date, [field]: value };

      // Check if the updated date already exists in dates
      const isDuplicate = prevData.dates.some(
        (d) =>
          d.day === updatedDate.day &&
          d.month === updatedDate.month &&
          d.year === updatedDate.year
      );

      return {
        ...prevData,
        date: updatedDate,
        dates: isDuplicate ? prevData.dates : [ updatedDate], // Add unique date to the array
      };
    });
  };

  return (
    <div className="mx-auto p-12">
      <div className="flex items-center gap-2 mb-6">
        <button className="p-2 rounded-full shadow-custom bg-white">
          <ArrowLeft
            className="w-4 h-4 "
            color="#000000"
            onClick={() => navigate(-1)}
          />
        </button>
        <h1 className="text-lg font-medium">Modify</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Job Info Section */}
        <div className="pb-4 border-b">
          <h2 className="flex items-center gap-2 text-blue-500 text-xl">
            <Briefcase className="w-6 h-6" />
            Job Info
          </h2>
        </div>
        <div className="grid gap-6 mt-6 mb-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Job name</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 border rounded-lg">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M8 14C8.5 15.5 10 16.5 12 16.5C14 16.5 15.5 15.5 16 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="9" cy="9" r="1" fill="currentColor" />
                    <circle cx="15" cy="9" r="1" fill="currentColor" />
                  </svg>
                  <input
                    type="text"
                    defaultValue="Tray Collector"
                    className="flex-1 border-none p-0 focus:outline-none"
                    name="jobName"
                    value={formData.jobName || jobsData.jobName}
                    onChange={handleInputChange}
                  />
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Company</label>
              </div>

              <div className="relative">
                {/* <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 px-3 py-2 border rounded-lg">
                    <img
                      src="/placeholder.svg"
                      alt="Company logo"
                      width={24}
                      height={24}
                      className="rounded"
                    />
                    <input
                      type="text"
                      name="company.name"
                      value={formData.company.name || jobsData.company?.name}
                      onChange={handleInputChange}
                      defaultValue="RIGHT SERVICE PTE. LTD."
                      className="flex-1 border-none p-0 focus:outline-none"
                    />
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                </div> */}
                <div className="flex-1 flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer z-10">
                  <div
                    className="flex-1 flex items-center gap-2 "
                    onClick={() =>
                      setIsCompanyDropdownOpen(!isCompanyDropdownOpen)
                    }
                  >
                    <img
                      src={
                        companies.find(
                          (option) => option.value === selectedCompanyOption
                        )?.image
                      }
                      alt="Company logo"
                      width={24}
                      height={24}
                      className="rounded"
                    />
                    <p>
                      {
                        companies.find(
                          (option) => option.value === selectedCompanyOption
                        )?.label
                      }
                    </p>
                  </div>

                  {isCompanyDropdownOpen && (
                    <div className="absolute mt-2 bg-white border rounded-lg shadow-lg w-full">
                      {companies.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() =>
                            handleCompanyOptionSelect(option.value)
                          }
                        >
                          <img
                            src={option.image}
                            alt={option.label}
                            width={24}
                            height={24}
                            className="rounded"
                          />
                          <p>{option.label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Outlet</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 border rounded-lg">
                  {/* <img
                    src="/placeholder.svg"
                    alt="Domino's logo"
                    width={24}
                    height={24}
                  /> */}
                  <input
                    type="text"
                    defaultValue="Domino's"
                    className="flex-1 border-none p-0 focus:outline-none"
                    name="outletName"
                    value={formData.outletName}
                    onChange={handleInputChange}
                  />
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <div className="flex items-center gap-2">
                <select
                  id="day"
                  name="day"
                  value={
                    formData.dates[0].day
                  }
                  onChange={(e) =>
                    handleDateChange("day", parseInt(e.target.value))
                  }
                  className="w-20 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  id="month"
                  name="month"
                  value={formData.dates[0].month} // month
                  onChange={(e) =>
                    handleDateChange("month", parseInt(e.target.value))
                  }
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[
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
                  ].map((month, index) => (
                    <option key={month.toLowerCase()} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  id="year"
                  name="year"
                  value={formData.dates[0].year} // year
                  onChange={(e) =>
                    handleDateChange("year", parseInt(e.target.value))
                  }
                  className="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={2024 + i} value={2024 + i}>
                      {2024 + i}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <CalendarIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <div className="flex-1 flex items-center gap-2 px-3 py-2 border rounded-lg">
                <input
                  type="text"
                  name="location"
                  value={formData.location || jobsData.location}
                  onChange={handleInputChange}
                  defaultValue="110/54, Anchorvale Link, Backer street"
                  className="flex-1 border-none p-0 focus:outline-none"
                />
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Industry</label>
              <div className="flex-1 flex items-center gap-2 px-3 py-2 border rounded-lg">
                <select
                  defaultValue="hotel"
                  name="industry"
                  value={formData.industry || jobsData.industry}
                  onChange={handleInputChange}
                  className="flex-1 border-none p-0 focus:outline-none"
                >
                  <option value="hotel">Hotel</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="retail">Retail</option>
                  <option value="healthcare">Healthcare</option>
                </select>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Shifts Info Section */}
        <div className="mb-6">
          <div className="w-full mx-auto">
            <div className="pb-4 border-b mb-6">
              <div className="flex items-center gap-2 text-blue-500 ">
                <Rows2 className="w-5 h-5" />
                <h2 className="text-xl">Shifts Info</h2>
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <div className="min-w-[1200px]">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-sm font-medium">
                      <th className="p-2 truncate px-8 text-center">
                        <Trash2
                          className="h-4 w-4 text-gray-400 cursor-pointer hover:text-red-500"
                          // onClick={() => deleteShift(shift.id)}
                        />
                      </th>
                      <th className="p-2 truncate px-8 text-center">
                        Start Time
                      </th>
                      <th className="p-2 truncate px-8 text-center">
                        End Time
                      </th>
                      <th className="p-2 truncate px-8 text-center">
                        Vacancy Filled
                      </th>
                      <th className="p-2 truncate px-8 text-center">
                        Standby Filled
                      </th>
                      <th className="p-2 truncate px-8 text-center">
                        Total Duration
                      </th>
                      <th className="p-2 truncate px-8 text-center">
                        Break Included
                      </th>
                      <th className="p-2 truncate px-8 text-center">
                        Paid/Unpaid break
                      </th>
                      <th className="p-2 truncate px-8 text-center">
                        Rate Type
                      </th>
                      <th className="p-2 truncate px-8 text-center">Rate</th>
                      <th className="p-2 truncate px-8 text-center">
                        Total Wage
                      </th>
                      <th className="p-2 truncate px-8 text-center">
                        Job Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shifts.map((shift) => (
                      <tr key={shift.id} className="border-b border-gray-200">
                        <td className="p-2 truncate px-8 text-center">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-gray-300"
                            />
                          </div>
                        </td>
                        <td className="p-2 truncate px-8 text-center">
                          <div className="flex items-center gap-2 bg-[#048be1] text-white rounded-full px-3 py-2 w-fit">
                            {shift.startTime.hours}:{shift.startTime.minutes}:
                            {shift.startTime.period}
                            <FiEdit3 className="h-5 w-5 p-1 rounded-full bg-white text-black cursor-pointer" />
                          </div>
                        </td>
                        <td className="p-2 truncate px-8 text-center">
                          <div className="flex items-center gap-1 bg-[#048be1] text-white rounded-full px-3 py-2 w-fit">
                            {shift.endTime.hours}:{shift.endTime.minutes}:
                            {shift.endTime.period}
                            <FiEdit3 className="h-5 w-5 p-1 rounded-full bg-white text-black cursor-pointer" />
                          </div>
                        </td>
                        <td className="p-2 truncate px-8 text-center">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="px-2 py-2 bg-[#F1F1F1] rounded-full hover:bg-gray-300"
                              onClick={() =>
                                handleDecrease(shift._id, "vacancy")
                              }
                            >
                              <Minus className="w-5 h-5" />
                            </button>
                            <p>
                              {shift.vacancy > 0 ? shift.vacancy : "_"}/
                              {maxVacancy}
                            </p>

                            <button
                              type="button"
                              className="px-2 py-2 bg-[#F1F1F1] rounded-full hover:bg-gray-300"
                              onClick={() =>
                                handleIncrease(shift._id, "vacancy", maxVacancy)
                              }
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                        <td className="p-2 truncate px-8 text-center">
                          <div className="flex items-center gap-2">
                            <button
                            type="button"
                              className="px-2 py-2 bg-[#F1F1F1] rounded-full hover:bg-gray-300"
                              onClick={() =>
                                handleDecrease(shift._id, "standbyVacancy")
                              }
                            >
                              <Minus className="w-5 h-5" />
                            </button>
                            <p>
                              {shift.standbyVacancy > 0
                                ? shift.standbyVacancy
                                : "_"}
                              /{maxStandby}
                            </p>

                            <button
                            type="button"
                              className="px-2 py-2 bg-[#F1F1F1] rounded-full hover:bg-gray-300"
                              onClick={() =>
                                handleIncrease(
                                  shift._id,
                                  "standbyVacancy",
                                  maxStandby
                                )
                              }
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                        <td className="p-2 truncate px-8 text-center ">
                          {shift.duration}
                        </td>
                        <td className="p-2 truncate px-8 text-center">
                          <div className="flex items-center gap-2">
                          <button
                          type="button"
                              className="px-2 py-2 bg-[#F1F1F1] rounded-full hover:bg-gray-300"
                              onClick={() =>
                                handleDecrease(shift._id, "breakHours")
                              }
                            >
                              <Minus className="w-5 h-5" />
                            </button>
                            <p>
                              {shift.breakHours > 0
                                ? shift.breakHours
                                : "0"}
                              
                            </p>

                            <button
                            type="button"
                              className="px-2 py-2 bg-[#F1F1F1] rounded-full hover:bg-gray-300"
                              onClick={() =>
                                handleIncrease(
                                  shift._id,
                                  "breakHours",
                                  shift.duration
                                )
                              }
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                        <td className="p-2 truncate px-8 text-left">
                          <div className="relative inline-block">
                            <select
                              className={`appearance-none px-8 py-1.5 rounded-full border text-left outline-none ${
                                shift.breakType === "Paid"
                                  ? "bg-green-50 text-green-600"
                                  : "bg-red-50 text-red-600"
                              }`}
                              defaultValue={shift.breakType}
                              onChange={(e) =>
                                handleBreakTypeChange(shift.id, e.target.value)
                              }
                            >
                              <option
                                value="Paid"
                                className="bg-green-50 text-green-600"
                              >
                                Paid
                              </option>
                              <option
                                value="Unpaid"
                                className="bg-red-50 text-red-600"
                              >
                                Unpaid
                              </option>
                            </select>
                            <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                              <FaCaretDown className="w-5 h-5" />
                            </span>
                          </div>
                        </td>
                        <td className="p-2 truncate px-8 text-center">
                          <select
                            className="px-3 py-1.5 rounded-lg border border-gray-200"
                            defaultValue={shift.rateType}
                          >
                            <option value="Flat Rate">Flat Rate</option>
                            <option value="Hourly">Hourly</option>
                          </select>
                        </td>
                        <td className="p-2 truncate px-8 text-center">
                          ${shift.payRate}
                        </td>
                        <td className="p-2 truncate px-8 text-center">
                          <div className="flex items-center gap-1">
                            <span>$</span>
                            <div className="bg-blue-50 px-3 py-1 rounded-lg">
                              {shift.totalWage}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 truncate px-8 text-center r">
                          <span
                            className={`px-3 py-1.5 rounded-full  ${
                              shift.status === "Active"
                                ? "bg-green-50 text-green-600"
                                : "bg-orange-50 text-orange-700"
                            }`}
                          >
                            {" "}
                            {jobsData.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button
                  onClick={addShift}
                  type="button"
                  className="px-6 py-2 my-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  Add Shift
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements Section */}
        <div className="mb-6">
          <div className="pb-4 border-b mb-6">
            <div className="flex items-center gap-2 text-blue-500 ">
              <TiDocumentText className="w-5 h-5" />
              <h2 className="text-xl">Requirements</h2>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">
                Job Scope Description
              </label>
              <div className="border rounded-lg p-2">
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 7V4h16v3" />
                      <path d="M9 20h6" />
                      <path d="M12 4v16" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="8" x2="21" y1="6" y2="6" />
                      <line x1="8" x2="21" y1="12" y2="12" />
                      <line x1="8" x2="21" y1="18" y2="18" />
                      <line x1="3" x2="3.01" y1="6" y2="6" />
                      <line x1="3" x2="3.01" y1="12" y2="12" />
                      <line x1="3" x2="3.01" y1="18" y2="18" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
                    </svg>
                  </button>
                </div>
                <textarea
                  name="requirements.jobScopeDescription"
                  value={
                    formData.requirements.jobScopeDescription ||
                    jobsData.jobScopeDescription
                  }
                  defaultValue={
                    formData.requirements.jobScopeDescription ||
                    jobsData.jobScopeDescription
                  }
                  onChange={handleInputChange}
                  className="w-full min-h-[150px] p-2 border-0 focus:ring-0"
                  placeholder="Type your job description here"
                ></textarea>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Job Requirements</label>
              <div className="border rounded-lg p-2">
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 7V4h16v3" />
                      <path d="M9 20h6" />
                      <path d="M12 4v16" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="8" x2="21" y1="6" y2="6" />
                      <line x1="8" x2="21" y1="12" y2="12" />
                      <line x1="8" x2="21" y1="18" y2="18" />
                      <line x1="3" x2="3.01" y1="6" y2="6" />
                      <line x1="3" x2="3.01" y1="12" y2="12" />
                      <line x1="3" x2="3.01" y1="18" y2="18" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
                    </svg>
                  </button>
                </div>
                <textarea
                  name="requirements.jobRequirements"
                  value={
                    formData.requirements.jobRequirements ||
                    jobsData.jobRequirements
                  }
                  defaultValue={
                    formData.requirements.jobRequirements ||
                    jobsData.jobRequirements
                  }
                  onChange={handleInputChange}
                  className="w-full min-h-[150px] p-2 border-0 focus:ring-0"
                  placeholder="Type your job requirements here"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            type="button"
            className="px-4 py-2 h-16 w-64 text-xl border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 h-16 w-64 bg-blue-500 text-xl text-white rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
