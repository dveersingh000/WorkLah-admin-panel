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
} from "lucide-react";
import { useEffect, useState } from "react";
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

import { Link, useNavigate, useParams } from "react-router-dom";
import JobHistory from "../../components/employerDetail/JobHistory";
import WorkHistory from "../../components/employerDetail/WorkHistory";
import { axiosInstance } from "../../lib/authInstances";

interface PersonalDetails {
  candidateId: string;
  contactNumber: string;
  dob: string;
  gender: string;
  nric: string;
  nationality: string;
  race: string;
  paynowNum: string;
  foodHygineCert: string;
  icNumber: string;
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

export default function ProfileDashboard() {
  const { id } = useParams()
  const [userData, setUserData] = useState<any>(null);
  console.log("userData", userData)

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navigate = useNavigate()

  const personalDetails: PersonalDetails = {
    candidateId: userData?.candidateProfile?.candidateId || "N/A",
    contactNumber: userData?.candidateProfile?.personalDetails?.contactNumber || "N/A",
    dob: userData?.candidateProfile?.personalDetails?.dob || "N/A",
    gender: userData?.candidateProfile?.personalDetails?.gender || "N/A",
    nric: userData?.candidateProfile?.personalDetails?.nric || "N/A",
    nationality: userData?.candidateProfile?.personalDetails?.nationality || "N/A",
    paynowNum: userData?.candidateProfile?.personalDetails?.paynowNumber || "N/A",
    race: userData?.candidateProfile?.personalDetails?.race || "N/A",
    foodHygineCert: userData?.candidateProfile?.personalDetails?.foodHygieneCert || "N/A",
    icNumber: userData?.candidateProfile?.personalDetails?.icNumber || "N/A",
    image: userData?.candidateProfile?.personalDetails?.icNumber || "N/A",
  };


  const activeJobs: ActiveJobs = {
    job: userData?.activeJob?.jobName || "N/A",
    ongoingShift: `${userData?.activeJob?.shiftStartTime || "N/A"} ---- ${userData?.activeJob?.shiftEndTime || "N/A"}`,
    clockedIn: userData?.activeJob?.clockedIn || "N/A",
    employer: userData?.activeJob?.employer || "N/A",
    duration: userData?.activeJob?.duration || "N/A",
    clockedOut: userData?.activeJob?.clockedOut || "N/A",
    date: userData?.activeJob?.date || "N/A",
    totalWage: userData?.activeJob?.totalWage || "N/A",
    wageGenerated: userData?.activeJob?.wageGenerated || "N/A",
    rateType: userData?.activeJob?.rateType || "N/A",
  };


  const customLabels: Record<string, string> = {
    candidateId: "Candidate ID",
    contactNumber: "Contact Number",
    dob: "DOB",
    gender: "Gender",
    nric: "NRIC",
    nationality: "Nationality",
    paynowNum: "Paynow Number",
    race: "Race",
    foodHygineCert: "Food & Hygiene cert.",
    icNumber: "IC number",
    image: "Image",
  };

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

  useEffect(() => {
    // Fetch employees from API
    axiosInstance.get(`/admin/candidates/${id}`)
      .then(response => {
        // console.log("response", response.data)
        setUserData(response.data);
      })
      .catch(error => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const getIcon = (key: string) => {
    switch (key) {
      case "candidateId":
        return <FaRegIdCard className="w-5 h-5 text-[#048BE1]" />;
      case "contactNumber":
        return <MessageSquare className="w-5 h-5 text-[#048BE1]" />;
      case "dob":
        return <MdOutlineDateRange className="w-6 h-6 text-[#048BE1]" />;
      case "gender":
        return <TbGenderGenderfluid className="w-6 h-6 text-[#048BE1]" />;
      case "nric":
        return <FaRegIdCard className="w-5 h-5 text-[#048BE1]" />;
      case "nationality":
        return <MdOutlineOutlinedFlag className="w-7 h-7 text-[#048BE1]" />;
      case "race":
        return <CiUser className="w-6 h-6 text-[#048BE1]" />;
      case "paynowNum":
        return <CiUser className="w-6 h-6 text-[#048BE1]" />;
      case "foodHygineCert":
        return <FaHandHoldingWater className="w-6 h-6 text-[#048BE1] " />;
      case "icNumber":
        return <TbUserHexagon className="w-6 h-6 text-[#048BE1]" />;
        case "image":
        return <TbUserHexagon className="w-6 h-6 text-[#048BE1]" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Header */}
      <div
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.shutterstock.com/image-photo/project-manager-working-ai-management-260nw-2424036963.jpg')",
        }}
      >
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <button className="p-2 rounded-full shadow-custom bg-white" onClick={() => navigate(-1)}>
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
                {/* Edit Candidate */}
                <li>
                  <Link to={`/edit-candidate-profile/${id}`}>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-[#000000] hover:bg-gray-100">
                      <FiEdit3 className="w-4 h-4 mr-2 text-gray-500" />
                      Edit Candidate
                    </button>
                  </Link>
                </li>
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

      <div className="max-w-7xl mx-auto px-4 -mt-20">
        <div className="gap-6 flex flex-col">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 z-10">
            <div className="flex justify-between items-start  pb-6 border-b border-[#DDDDDD]">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={userData?.candidateProfile?.profilePicture || "/assets/teamm1.svg"}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-dotted border-black"
                  />
                </div>
                <div className="flex flex-col items-start gap-1">
                  <h1 className=" text-[24px] leading-[30px] font-medium">
                    {userData?.candidateProfile?.fullName || "N/A"}
                  </h1>
                  <p className="text-[16px] leading-[24px] font-medium text-[#4c4c4c]">
                    Work pass status:{" "}
                    <span className="text-[#049609] text-[16px] leading-[24px] font-medium ml-2">
                      {" "}
                      {userData?.candidateProfile?.workPassStatus || "N/A"}
                    </span>
                  </p>
                </div>
              </div>

              <p className="text-sm text-[#4C4C4C] font-medium mt-2">
                <p className="text-[16px] leading-[24px] font-medium text-[#4c4c4c]">
                  Registered at:{" "}
                  <span className="text-[#000000] text-[16px] leading-[24px] font-medium ml-2">
                    {userData?.candidateProfile?.registeredAt || "N/A"}
                  </span>
                </p>
              </p>
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
            {/* <div className="flex gap-6 py-8 border-b">
              {tabs.map((tab) => {
                const Icon = tab.icon; // Get the icon for the current tab
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)} // Set the active tab on click
                    className={`px-[38px] py-[18px] flex items-center gap-4 rounded-[10px] text-[16px] leading-[20px] font-medium 
              ${activeTab === tab.id
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
            </div> */}

            {/* <JobHistory jobHistory={userData?.workHistory || {}} />
            <WorkHistory workHistory={userData?.jobHistory || []} /> */}

              <h2 className="text-2xl font-semibold mb-6">Job Overview</h2>
            
              <div className="mb-12">
                <h3 className="text-xl font-medium mb-4 ">Work History</h3>
                {/* <WorkHistory /> */}
                <JobHistory jobHistory={userData?.workHistory || {}} />
              </div>
            
              {/* JobHistory Section */}
              <div className="">
                <h3 className="text-xl font-medium mb-4">Job History</h3>
                <WorkHistory workHistory={userData?.jobHistory || []} />
              </div>



            {/* {activeTab === "jobHistory" ? (
              <WorkHistory workHistory={userData?.jobHistory || []} />
            ) : activeTab === "workHistory" ? (
              <JobHistory jobHistory={userData?.workHistory || {}} />
            ) : (
              <div></div>
            )} */}

          </div>
          <div className=" bg-white rounded-3xl p-6 shadow-sm border border-gray-200 px-12">
            <h2 className="font-semibold mb-4 text-[16px] text-[#000000]">
              Active Jobs
            </h2>
            <div className=" mt-8 grid grid-cols-3 items-center gap-6">
              {Object.entries(activeJobs).map(([key, value]) => (
                <div className="flex flex-col">
                  <div>
                    <p className="text-[16px] font-medium leading-[20px] text-[#0099ff]">
                      {customLablesActiveJobs[key] ||
                        key.replace(/([A-Z])/g, " $1").trim()}
                      :
                    </p>
                  </div>
                  {key === "job" && (
                    <p className="text-[16px] leading-[24px] font-medium text-[#000000]">
                      {value}{" "}
                      <span className="ml-1 text-[#049609] text-[16px] font-normal leading-[20px] py-2 px-4 bg-[#ECFFEA] rounded-full">
                        Active
                      </span>
                    </p>
                  )}
                  {key !== "job" &&
                    key !== "clockedOut" &&
                    key !== "clockedIn" &&
                    key !== "wageGenerated" &&
                    key !== "totalWage" && (
                      <p className="text-[16px] leading-[24px] font-medium text-[#000000]">
                        {value}
                      </p>
                    )}
                  {(key === "clockedOut" || key === "clockedIn") && (
                    <div className="flex items-center gap-1 py-1 px-3 rounded-full border border-[#048BE1] w-fit">
                      <RotateCcw className="text-white p-1 rounded-full bg-[#CDCDCD] w-7 h-7" />
                      <p className="text-[16px] leading-[24px] font-medium text-[#000000] w-[70px] text-center">
                        {value}
                      </p>
                      <FiEdit3 className="text-white p-1 rounded-full bg-[#0099FF] w-7 h-7" />
                    </div>
                  )}
                  {(key === "wageGenerated" || key === "totalWage") && (
                    <>
                      <p className="text-[16px] leading-[24px] font-medium text-[#000000]">
                        {value}
                      </p>
                      <p className="text-[14px] leading-[17px] font-normal text-[#4c4c4c]">
                        1 Hrs (Unpaid Break)
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
