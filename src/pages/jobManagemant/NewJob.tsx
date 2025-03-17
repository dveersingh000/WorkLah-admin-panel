"use client";

import {
  ArrowLeft,
  Briefcase,
  CalendarIcon,
  Pencil,
  Rows2,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { TiDocumentText } from "react-icons/ti";
import { axiosInstance } from "../../lib/authInstances";
import { useNavigate } from "react-router-dom";
import { convertToDate, getTodayDate } from "../../lib/utils";

interface JobFormData {
  jobName: string;
  jobLogo: string;
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
  id: number;
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

export default function NewJob() {
  const [selectedCompanyOption, setSelectedCompanyOption] = useState("hotel");
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [companies, setCompanies] = useState<
    { value: string; label: string; image: string }[]
  >([]);

  const [outlets, setOutlets] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [isOutletDropdownOpen, setIsOutletDropdownOpen] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const Images = "http://localhost:3000";
  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: 1,
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
    },
  ]);

  const [formData, setFormData] = useState<JobFormData>({
    jobName: "",
    jobLogo: "/assets/icons/plus-emoji.png",
    company: {
      name: "Right Service PTE LTD",
      agreementEndDate: new Date(),
    },
    outletName: "",
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

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/employers");

        console.log("API Response:", response.data);

        // Access the "employers" array inside response.data
        const employerList = response.data.employers;

        if (!Array.isArray(employerList)) {
          throw new Error("Invalid response format");
        }

        // Map API response to expected format
        const formattedEmployers = employerList.map((employer: any) => ({
          value: employer._id, // Employer ID
          label: employer.companyLegalName, // Company Name
          image: `${Images}${employer.companyLogo}` || "/assets/company.png", // Default if no logo
        }));

        setCompanies(formattedEmployers);
      } catch (err) {
        console.error("Error fetching employers:", err);
        setError("Failed to load employers");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployers();
  }, []);

  useEffect(() => {
    const fetchOutlets = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/outlets");
        const outletsData = response.data.data;

        // Map API data to dropdown format
        const formattedOutlets = outletsData.map((outlet) => ({
          value: outlet._id,
          label: outlet.outletName,
          // image: outlet.outletImage || "/assets/outlet-placeholder.png",
          image:
            `${Images}${outlet.outletImage}` ||
            "/static/outletImage.png",
        }));

        setOutlets(formattedOutlets);
      } catch (err) {
        setError("Failed to load outlets");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOutlets();
  }, []);

  // const companies = [
  //   {
  //     value: "hotel",
  //     label: "RIGHT SERVICE PTE. LTD.",
  //     image: "/assets/company.png",
  //   },
  //   {
  //     value: "restaurant",
  //     label: "Tech Solutions Pvt. Ltd.",
  //     image: "/assets/company.png",
  //   },
  //   { value: "retail", label: "Company 2", image: "/assets/company.png" },
  //   { value: "healthcare", label: "Company 3", image: "/assets/company.png" },
  // ];

  const handleCompanyOptionSelect = (value: string) => {
    const selectedCompany = companies.find((option) => option.value === value);
    if (selectedCompany) {
      setSelectedCompanyOption(value);

      setFormData((prevData) => ({
        ...prevData,
        company: { ...prevData.company, name: selectedCompany.label },
        employerId: value, // Update employerId
      }));
    }
    setIsCompanyDropdownOpen(false);
  };

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

  const addShift = () => {
    const newShift: Shift = {
      id: formData.shifts.length + 1,
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
    setFormData((prevData) => ({
      ...prevData,
      shifts: [...prevData.shifts, newShift],
    }));
  };

  const deleteShift = (id: number) => {
    setFormData((prevData) => ({
      ...prevData,
      shifts: prevData.shifts.filter((shift) => shift.id !== id),
    }));
  };

  const updateShift = (id: number, field: keyof Shift, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      shifts: prevData.shifts.map((shift) => {
        if (shift.id === id) {
          const updatedShift = { ...shift, [field]: value };
          // Recalculate totalWage if payRate or duration is updated
          if (field === "payRate" || field === "duration") {
            updatedShift.totalWage =
              updatedShift.payRate * updatedShift.duration;
          }
          return updatedShift;
        }
        return shift;
      }),
    }));
  };

  const updateTime = (
    id: number,
    timeType: "startTime" | "endTime",
    field: keyof Shift["startTime"],
    value: string
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      shifts: prevData.shifts.map((shift) => {
        if (shift.id === id) {
          return {
            ...shift,
            [timeType]: { ...shift[timeType], [field]: value },
          };
        }
        return shift;
      }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Convert date from object to "YYYY-MM-DD"
      const formattedDate = `${formData.date.year}-${String(
        formData.date.month
      ).padStart(2, "0")}-${String(formData.date.day).padStart(2, "0")}`;

      // Map shifts to match API format
      const formattedShifts = formData.shifts.map((shift) => ({
        startTime: `${shift.startTime.hours}:${shift.startTime.minutes}`,
        startMeridian: shift.startTime.period,
        endTime: `${shift.endTime.hours}:${shift.endTime.minutes}`,
        endMeridian: shift.endTime.period,
        vacancy: shift.vacancy,
        standbyVacancy: shift.standbyVacancy,
        duration: shift.duration,
        breakHours: shift.breakHours,
        breakType: shift.breakType,
        rateType: shift.rateType,
        payRate: shift.payRate,
        totalWage:
          shift.rateType === "Hourly rate"
            ? shift.payRate * shift.duration
            : shift.payRate,
      }));

      // Construct request payload
      const requestData = {
        jobName: formData.jobName,
        employerId: selectedCompanyOption,
        outletId: selectedOutlet,
        date: formattedDate,
        location: formData.location,
        industry: formData.industry || "Hotel",
        jobScope: formData.requirements.jobScopeDescription.split(", "),
        jobRequirements: formData.requirements.jobRequirements.split(", "),
        shifts: formattedShifts,
      };

      console.log("Submitting Job Data:", requestData);
      const response = await axiosInstance.post("/admin/jobs/", requestData);

      console.log("Job created successfully:", response.data);
      navigate("/jobs/job-management");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
        dates: isDuplicate ? prevData.dates : [updatedDate], // Add unique date to the array
      };
    });
  };

  const handleJobLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            jobLogo: reader.result as string, // Update jobLogo with the image data
          }));
        }
      };
      reader.readAsDataURL(file); // Convert file to Base64 URL
    }
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
        <h1 className="text-lg font-medium">Add new job</h1>
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
                <div className="flex-1 flex items-center gap-2 px-3 py-2 border rounded-lg ">
                  <div className="border-r px-2 border-dashed cursor-pointer">
                    <label htmlFor="jobLogoUpload">
                      <img
                        src={formData.jobLogo}
                        alt="Job Logo"
                        width={38}
                        height={38}
                        className="cursor-pointer rounded-full p-1"
                      />
                    </label>
                    <input
                      id="jobLogoUpload"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleJobLogoChange}
                    />
                  </div>

                  <input
                    type="text"
                    className="flex-1 border-none p-0 focus:outline-none"
                    name="jobName"
                    value={formData.jobName}
                    onChange={handleInputChange}
                    required
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
                <div className="text-sm text-gray-500 text-right">
                  Agreement end on:{" "}
                  <span className="text-orange-500">26 July, 25</span>
                </div>
              </div>

              <div className="relative">
                {isLoading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <div
                    className="flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer"
                    onClick={() =>
                      setIsCompanyDropdownOpen(!isCompanyDropdownOpen)
                    }
                  >
                    {/* Company Logo */}
                    <img
                      src={
                        companies.find(
                          (option) => option.value === selectedCompanyOption
                        )?.image || "/assets/company.png"
                      }
                      alt="Company logo"
                      width={24}
                      height={24}
                      className="rounded"
                    />

                    {/* Selected Company Name */}
                    <p className="flex-1">
                      {companies.find(
                        (option) => option.value === selectedCompanyOption
                      )?.label || "Select Employer"}
                    </p>

                    {/* Edit Button Inside the Box */}
                    <button
                      className="p-1 rounded-lg hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent dropdown from opening when clicking edit
                        console.log("Edit button clicked");
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Dropdown List */}
                {isCompanyDropdownOpen && (
                  <div className="absolute mt-2 bg-white border rounded-lg shadow-lg w-full z-10">
                    {companies.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          handleCompanyOptionSelect(option.value);
                          setIsCompanyDropdownOpen(false);
                        }}
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
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Outlet</label>
              <div className="relative">
                <div
                  className="flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer"
                  onClick={() => setIsOutletDropdownOpen(!isOutletDropdownOpen)}
                >
                  <img
                    src={
                      outlets.find((option) => option.value === selectedOutlet)?.image
                        ? `${outlets.find((option) => option.value === selectedOutlet)?.image}`
                        : "http://localhost:3000/static/outletImage.png"
                    }
                    alt="Outlet logo"
                    width={24}
                    height={24}
                    className="rounded"
                  />
                  <p className="flex-1">
                    {outlets.find((option) => option.value === selectedOutlet)
                      ?.label || "Select Outlet"}
                  </p>
                  <button
                    className="p-1 rounded-lg hover:bg-gray-100"
                    onClick={(e) => e.stopPropagation()} // Prevent dropdown toggle
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>

                {/* Dropdown List */}
                {isOutletDropdownOpen && (
                  <div className="absolute mt-2 bg-white border rounded-lg shadow-lg w-full z-10">
                    {outlets.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setSelectedOutlet(option.value);
                          setIsOutletDropdownOpen(false);
                        }}
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
                {/* Day Selector */}
                <select
                  id="day"
                  name="day"
                  value={formData.date.day} // day
                  onChange={(e) =>
                    handleDateChange("day", parseInt(e.target.value))
                  }
                  className="w-20 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i}>
                      {i}
                    </option>
                  ))}
                </select>

                {/* Month Selector */}
                <select
                  id="month"
                  name="month"
                  value={formData.date.month} // month
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
                    <option key={index} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>

                {/* Year Selector */}
                <select
                  id="year"
                  name="year"
                  value={formData.date.year} // year
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
                  value={formData.location}
                  onChange={handleInputChange}
                  className="flex-1 border-none p-0 focus:outline-none"
                  required
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
                  defaultValue="Hotel"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="flex-1 border-none p-0 focus:outline-none"
                >
                  <option value="Hotel">Hotel</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Retail">Retail</option>
                  <option value="Healthcare">Healthcare</option>
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

            {formData.shifts.map((shift, index) => (
              <div key={shift.id} className="mb-6 bg-white rounded-2xl border">
                <div className="flex justify-between items-center p-6 pb-4">
                  <h3 className="text-lg">{index + 1}st Shift</h3>
                  <button
                    onClick={() => deleteShift(shift.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start time</label>
                    <div className="flex items-center gap-2 p-3 border rounded-xl bg-white h-12">
                      <input
                        type="text"
                        value={shift.startTime.hours}
                        onChange={(e) =>
                          updateTime(
                            shift.id,
                            "startTime",
                            "hours",
                            e.target.value
                          )
                        }
                        className="w-12 text-center focus:outline-none"
                        maxLength={2}
                      />
                      <span>:</span>
                      <input
                        type="text"
                        value={shift.startTime.minutes}
                        onChange={(e) =>
                          updateTime(
                            shift.id,
                            "startTime",
                            "minutes",
                            e.target.value
                          )
                        }
                        className="w-12 text-center focus:outline-none"
                        maxLength={2}
                      />
                      <select
                        className="ml-6 bg-blue-50 rounded-lg px-2 py-1 focus:outline-none text-sm"
                        value={shift.startTime.period}
                        onChange={(e) =>
                          updateTime(
                            shift.id,
                            "startTime",
                            "period",
                            e.target.value
                          )
                        }
                      >
                        <option>AM</option>
                        <option>PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">End time</label>
                    <div className="flex items-center gap-2 p-3 border rounded-xl bg-white h-12">
                      <input
                        type="text"
                        value={shift.endTime.hours}
                        onChange={(e) =>
                          updateTime(
                            shift.id,
                            "endTime",
                            "hours",
                            e.target.value
                          )
                        }
                        className="w-12 text-center focus:outline-none"
                        maxLength={2}
                      />
                      <span>:</span>
                      <input
                        type="text"
                        value={shift.endTime.minutes}
                        onChange={(e) =>
                          updateTime(
                            shift.id,
                            "endTime",
                            "minutes",
                            e.target.value
                          )
                        }
                        className="w-12 text-center focus:outline-none"
                        maxLength={2}
                      />
                      <select
                        className="ml-6 bg-blue-50 rounded px-2 py-1 focus:outline-none text-sm"
                        value={shift.endTime.period}
                        onChange={(e) =>
                          updateTime(
                            shift.id,
                            "endTime",
                            "period",
                            e.target.value
                          )
                        }
                      >
                        <option>AM</option>
                        <option>PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vacancy</label>
                    <div className="flex justify-between items-center gap-2 p-3 border rounded-xl bg-white h-12">
                      <button
                        className=" bg-blue-50 rounded-lg px-2 py-1 focus:outline-none text-sm"
                        onClick={() =>
                          updateShift(
                            shift.id,
                            "vacancy",
                            Math.max(0, shift.vacancy - 1)
                          )
                        }
                      >
                        −
                      </button>
                      <input
                        type="text"
                        value={shift.vacancy}
                        onChange={(e) =>
                          updateShift(
                            shift.id,
                            "vacancy",
                            Number(e.target.value)
                          )
                        }
                        className="w-12 text-center focus:outline-none"
                      />
                      <button
                        className=" bg-blue-50 rounded-lg px-2 py-1 focus:outline-none text-sm"
                        onClick={() =>
                          updateShift(shift.id, "vacancy", shift.vacancy + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Standby vacancy
                    </label>
                    <div className="flex justify-between items-center gap-2 p-3 border rounded-xl bg-white h-12">
                      <button
                        className=" bg-blue-50 rounded-lg px-2 py-1 focus:outline-none text-sm"
                        onClick={() =>
                          updateShift(
                            shift.id,
                            "standbyVacancy",
                            Math.max(0, shift.standbyVacancy - 1)
                          )
                        }
                      >
                        −
                      </button>
                      <input
                        type="text"
                        value={shift.standbyVacancy}
                        onChange={(e) =>
                          updateShift(
                            shift.id,
                            "standbyVacancy",
                            Number(e.target.value)
                          )
                        }
                        className="w-12 text-center focus:outline-none"
                      />
                      <button
                        className=" bg-blue-50 rounded-lg px-2 py-1 focus:outline-none text-sm"
                        onClick={() =>
                          updateShift(
                            shift.id,
                            "standbyVacancy",
                            shift.standbyVacancy + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duration</label>
                    <div className="flex items-center gap-2 p-3 border rounded-xl bg-white h-12">
                      <input
                        type="text"
                        value={shift.duration}
                        onChange={(e) =>
                          updateShift(
                            shift.id,
                            "duration",
                            Number(e.target.value)
                          )
                        }
                        className="w-full text-center focus:outline-none"
                      />
                      <span className="text-gray-500">Hrs</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Break Hours</label>
                    <div className="flex justify-between items-center gap-2 p-3 border rounded-xl bg-white h-12">
                      <button
                        className=" bg-blue-50 rounded-lg px-2 py-1 focus:outline-none text-sm"
                        onClick={() =>
                          updateShift(
                            shift.id,
                            "breakHours",
                            Math.max(0, shift.breakHours - 1)
                          )
                        }
                      >
                        −
                      </button>
                      <input
                        type="text"
                        value={shift.breakHours}
                        onChange={(e) =>
                          updateShift(
                            shift.id,
                            "breakHours",
                            Number(e.target.value)
                          )
                        }
                        className="w-12 text-center focus:outline-none"
                      />
                      <button
                        className=" bg-blue-50 rounded-lg px-2 py-1 focus:outline-none text-sm"
                        onClick={() =>
                          updateShift(
                            shift.id,
                            "breakHours",
                            shift.breakHours + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Break Type</label>
                    <select
                      className="w-full h-12 px-3 border rounded-xl bg-white focus:outline-none appearance-none"
                      value={shift.breakType}
                      onChange={(e) =>
                        updateShift(shift.id, "breakType", e.target.value)
                      }
                    >
                      <option>Paid</option>
                      <option>Unpaid</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Rate type</label>
                    <select
                      className="w-full h-12 px-3 border rounded-xl bg-white focus:outline-none appearance-none"
                      value={shift.rateType}
                      onChange={(e) =>
                        updateShift(shift.id, "rateType", e.target.value)
                      }
                    >
                      <option>Flat rate</option>
                      <option>Hourly rate</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pay rate/Hr</label>
                    <div className="flex items-center gap-2 p-3 border rounded-xl bg-white h-12">
                      <span className="text-gray-500">$</span>
                      <input
                        type="text"
                        value={shift.payRate}
                        onChange={(e) =>
                          updateShift(
                            shift.id,
                            "payRate",
                            Number(e.target.value)
                          )
                        }
                        className="w-full focus:outline-none"
                      />
                      <span className="text-gray-500">/Hr</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Total Wage{" "}
                      <span className="text-xs text-gray-400">
                        (Rate x Duration = Total wage)
                      </span>
                    </label>
                    <div className="flex items-center gap-2 p-3 border rounded-xl bg-white h-12">
                      <span className="text-gray-500">$</span>
                      <input
                        type="text"
                        value={shift.totalWage || 0}
                        className="w-full focus:outline-none"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={addShift}
              type="button"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Add Shift
            </button>
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
                  // defaultValue={formData.requirements.jobScopeDescription}
                  value={formData.requirements.jobScopeDescription}
                  onChange={handleInputChange}
                  className="w-full min-h-[150px] p-2 border-0 focus:ring-0"
                  placeholder="Type your job description here"
                  required
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
                  //  defaultValue={formData.requirements.jobRequirements}
                  value={formData.requirements.jobRequirements}
                  onChange={handleInputChange}
                  className="w-full min-h-[150px] p-2 border-0 focus:ring-0"
                  placeholder="Type your job requirements here"
                  required
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
