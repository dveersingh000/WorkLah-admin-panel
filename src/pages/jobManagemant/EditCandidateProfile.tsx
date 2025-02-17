"use client";

import {
  ArrowLeft,
  Settings,
  MessagesSquare,
  Clock,
  MessageSquare,
  Camera,
  History,
  CalendarClock,
  CalendarCheck,
  CalendarX2,
  Ban,
  Image,
  RotateCcw,
  Wallet2,
  User,
  MapPin,
  Flag,
  ImageIcon,
  PencilIcon,
  CalendarIcon,
} from "lucide-react";
import { useState } from "react";
import { FaRegIdCard } from "react-icons/fa";
import {
  MdOutlineDateRange,
  MdOutlineOutlinedFlag,
  MdOutlineVerifiedUser,
} from "react-icons/md";
import { TbGenderGenderfluid } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { GoChecklist } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";
import { FaHandHoldingWater } from "react-icons/fa";
import { TbUserHexagon } from "react-icons/tb";

import { Link, useNavigate } from "react-router-dom";
import JobHistory from "../../components/employerDetail/JobHistory";
import WorkHistory from "../../components/employerDetail/WorkHistory";

interface PersonalDetails {
  EWalletAmount: string;
  Race: string;
  NRIC: string;
  PostalCode: string;
  FoodHygineCert: string;
  Photo: string;
  Nationality: string;
}

interface ActiveJobs {
  job: string;
  ongoingShift: string;
  clockedIn: string;
  employer: string;
  duration: string;
  clockedOut: string;
  date: string;
  totalWage: string;
  wageGenerated: string;
  rateType: string;
}

export default function EditCandidateProfile() {
  const [formData, setFormData] = useState({
    name: 'Ethan Carter',
    gender: 'Male',
    workPassStatus: 'Verified',
    dob: { day: '1', month: 'January', year: '2024' },
    mobile: '+658547349',
    email: 'ethancarter@gmail.com',
    postalCode: '506604',
    country: 'Singapore',
    city: 'Yishun',
    street: 'Chong Pang',
    fullAddress: '121/23, lorem epsilum'
  })

  const [activeTab, setActiveTab] = useState("jobHistory");

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const tabs = [
    { id: "jobHistory", label: "Job History", icon: History },
    { id: "workHistory", label: "Work History", icon: CalendarClock },
  ];

  const personalDetails: PersonalDetails = {
    EWalletAmount: "$ 2,450",
    Race: "Korean",
    NRIC: "XXXXXX4575",
    PostalCode: "245621",
    FoodHygineCert: "11212225",
    Photo: "111225225",
    Nationality: "Singapore",
  };

  const activeJobs: ActiveJobs = {
    job: "Tray Collecter",
    ongoingShift: "07:00 PM ---- 11:00 PM",
    clockedIn: "07:06 AM",
    employer: "Right Service PTE. LTD.",
    duration: "4 Hrs",
    clockedOut: " -- ",
    date: "10 Sep, 24",
    totalWage: " $72",
    wageGenerated: "$--",
    rateType: "Flat Rate",
  };

  const customLabels: Record<string, string> = {
    EWalletAmount: "E-Wallet Amount",
    Race: "Race",
    NRIC: "NRIC",
    PostalCode: "Postal Code",
    FoodHygineCert: "Food & Hygiene Cert",
    Photo: "Photo",
    Nationality: "Nationality",
  };

  const navigate = useNavigate()

  const customLablesActiveJobs: Record<string, string> = {
    job: "Job",
    ongoingShift: "Ongoing shift",
    clockedIn: "Clocked In Time",
    employer: "Employer",
    duration: "Duration",
    clockedOut: "Clcoked Out time ",
    date: "Date",
    totalWage: "Total Wage",
    wageGenerated: "Wage Generated",
    rateType: "Rate Type",
  };

  const getIcon = (key: string) => {
    switch (key) {
      case "EWalletAmount":
        return <Wallet2 className="w-5 h-5 text-[#048BE1]" />;
      case "Race":
        return <User className="w-5 h-5 text-[#048BE1]" />;
      case "NRIC":
        return <FaRegIdCard className="w-5 h-5 text-[#048BE1]" />;
      case "PostalCode":
        return <MapPin className="w-5 h-5 text-[#048BE1]" />;
      case "FoodHygineCert":
        return <FaHandHoldingWater className="w-5 h-5 text-[#048BE1]" />;
      case "Photo":
        return <ImageIcon className="w-5 h-5 text-[#048BE1]" />;
      case "Nationality":
        return <MdOutlineOutlinedFlag className="w-5 h-5 text-[#048BE1]" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.shutterstock.com/image-photo/project-manager-working-ai-management-260nw-2424036963.jpg')",
        }}
      >
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          
          <button onClick={() => navigate(-1)} className="p-2 rounded-full shadow-custom bg-white">
            <ArrowLeft className="w-4 h-4 " color="#000000" />
          </button>
          <div className="flex gap-4">
            <button className="px-4 py-3 rounded-[10px] bg-white flex items-center text-black gap-3">
              <Camera className="w-6 h-6" />
              Change cover
            </button>
            <button onClick={toggleMenu} className="p-4 rounded-full bg-white">
              <Settings className="w-6 h-6" />
            </button>
          </div>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 top-14 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
              <ul className="py-2">
                {/* Block Candidate */}
                <li>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-[#941F15] hover:bg-red-100">
                    <Ban className="w-4 h-4 mr-2 text-red-500" />
                    Block Candidate
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-14">
        <div className="gap-6 flex flex-col">
          {/* Profile Card */}
          <div className=" p-6  z-10">
            <div className="flex justify-between items-start pb-2">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src="./assets/teamm1.svg"
                    alt="Profile"
                    width={100}
                    height={100}
                    className="rounded-full "
                  />
                </div>
                <div className="flex flex-col items-start gap-1">
                  <p className="text-[16px] leading-[24px] font-medium text-[#4c4c4c]">
                    ID:{" "}
                    <span className="text-[#000000] text-[16px] leading-[24px] font-medium ml-2">
                      {" "}
                      24575
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className=" flex justify-between pb-6 border-b border-[#DDDDDD]">
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center">
                  <h1 className=" text-[24px] leading-[30px] font-medium">
                    Ethan Carter <i className="text-xs">(Male)</i>
                  </h1>
                  <span className="text-[#049609] bg-[#CEFFCF] rounded-full px-3 py-0.5 mt-2 text-[16px] leading-[24px] font-medium ml-2">
                    {" "}
                    Verified
                  </span>
                </div>

                <p className="text-[16px] leading-[24px] font-medium text-[#4c4c4c]">
                  Age:{" "}
                  <span className="text-[#000] text-[16px] leading-[24px] font-medium ml-2">
                    {" "}
                    35
                  </span>
                </p>

                <p className="text-[16px] leading-[24px] font-medium text-[#4c4c4c]">
                  DOB:{" "}
                  <span className="text-[#000] text-[16px] leading-[24px] font-medium ml-2">
                    {" "}
                    05/10/1888
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#4C4C4C] font-medium mt-2">
                  <p className="text-[16px] leading-[24px] font-medium text-[#4c4c4c]">
                    Registered at:{" "}
                    <span className="text-[#000000] text-[16px] leading-[24px] font-medium ml-2">
                      21/09/2008, 09:30AM
                    </span>
                  </p>
                </p>
                <p className="text-sm text-[#4C4C4C] font-medium mt-2">
                  <p className="text-[16px] leading-[24px] font-medium text-[#4c4c4c]">
                    Contact Number:{" "}
                    <span className="text-[#000000] text-[16px] leading-[24px] font-medium ml-2">
                      +658847349
                    </span>
                  </p>
                </p>
                <p className="text-sm text-[#4C4C4C] font-medium mt-2">
                  <p className="text-[16px] leading-[24px] font-medium text-[#4c4c4c]">
                    Email Address:{" "}
                    <span className="text-[#000000] text-[16px] leading-[24px] font-medium ml-2">
                      ethancarter@gmail.com
                    </span>
                  </p>
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="font-semibold mb-4 text-[16px] leading-[24px] text-[#000000]">
                Personal Details
              </h2>
              <div className=" mt-8 grid grid-cols-4 gap-6">
                {Object.entries(personalDetails).map(([key, value]) => (
                  <div className="flex flex-col">
                    <div key={key} className="flex items-start gap-3 my-3">
                      {/* Icon */}
                      <div className="w-5 h-5 mt-0.5">{getIcon(key)}</div>

                      {/* Label and Value */}
                      <div>
                        <p className="text-[16px] font-medium leading-[24px] text-[#048BE1]">
                          {customLabels[key] ||
                            key.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                      </div>
                    </div>
                    {key !== "foodHygineCert" && (
                      <p className="text-[16px] leading-[24px] font-normal text-[#000000]">
                        {value}
                      </p>
                    )}
                    {key === "foodHygineCert" && (
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-[#FFF4E5] w-fit">
                        <Image className="w-6 h-6" />
                        <p className="text-[16px] leading-[24px] font-normal text-[#000000]">
                          {value}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-3xl py-8 px-12 shadow-sm border border-gray-200 z-10">
            <div className="flex gap-6 py-8 border-b">
              {tabs.map((tab) => {
                const Icon = tab.icon; // Get the icon for the current tab
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)} // Set the active tab on click
                    className={`px-[38px] py-[18px] flex items-center gap-4 rounded-[10px] text-[16px] leading-[20px] font-medium 
              ${
                activeTab === tab.id
                  ? "bg-[#048BE1] text-white " // Active styles
                  : "bg-[#EBEBEB] text-black" // Inactive styles
              }`}
                  >
                    <Icon
                      className={activeTab === tab.id ? "h-7 w-7" : "h-6 w-6"}
                      color={activeTab === tab.id ? "#ffffff" : "#000000"}
                    />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {activeTab === "jobHistory" ? <JobHistory /> : <WorkHistory />}
          </div>

          {/* form */}
          <div className="p-6 pt-6 border-t border-[#DDDDDD]">
            <div className="flex items-center gap-2 mb-6">
              <PencilIcon className="w-4 h-4" />
              <h1 className="text-lg font-medium">Edit Candidate Details</h1>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Candidate Name */}
              <div>
                <label className="block text-sm mb-2">Candidate Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    className="w-full px-3 py-2 border rounded-lg pr-10"
                  />
                  <PencilIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm mb-2">Gender</label>
                <select className="w-full px-3 py-2 border rounded-lg appearance-none bg-white">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Work Pass Status */}
              <div>
                <label className="block text-sm mb-2">Work Pass Status</label>
                <select className="w-full px-3 py-2 border rounded-lg appearance-none bg-white">
                  <option>Verified</option>
                  <option>Pending</option>
                  <option>Rejected</option>
                </select>
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm mb-2">DOB</label>
                <div className="flex gap-2">
                  <select className="px-3 py-2 border rounded-lg appearance-none bg-white">
                    <option>1</option>
                    {/* Add more days */}
                  </select>
                  <select className="px-3 py-2 border rounded-lg appearance-none bg-white">
                    <option>January</option>
                    {/* Add more months */}
                  </select>
                  <select className="px-3 py-2 border rounded-lg appearance-none bg-white">
                    <option>2024</option>
                    {/* Add more years */}
                  </select>
                  <button
                    type="button"
                    className="px-3 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    <CalendarIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm mb-2">Mobile Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.mobile}
                    className="w-full px-3 py-2 border rounded-lg pr-10"
                  />
                  <PencilIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm mb-2">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    className="w-full px-3 py-2 border rounded-lg pr-10"
                  />
                  <PencilIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Postal code */}
              <div>
                <label className="block text-sm mb-2">Postal code</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.postalCode}
                    className="w-full px-3 py-2 border rounded-lg pr-10"
                  />
                  <PencilIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm mb-2">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  className="w-full px-3 py-2 bg-gray-100 rounded-lg"
                  disabled
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm mb-2">City</label>
                <input
                  type="text"
                  value={formData.city}
                  className="w-full px-3 py-2 bg-gray-100 rounded-lg"
                  disabled
                />
              </div>

              {/* Street/Town */}
              <div>
                <label className="block text-sm mb-2">Street/Town</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.street}
                    className="w-full px-3 py-2 border rounded-lg pr-10"
                  />
                  <PencilIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Full Address */}
              <div className="">
                <label className="block text-sm mb-2">Full Address</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.fullAddress}
                    className="w-full px-3 py-2 border rounded-lg pr-10"
                  />
                  <PencilIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Buttons */}
             
            </form>
            <div className="flex w-1/2 items-start mx-[25%] gap-4 mt-20">
                <button
                  type="button"
                  className="flex-1 px-14 py-4 border border-[#0099FF] text-[#0099FF] rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-14 py-4 bg-[#0099FF] text-white rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
