import React from "react";
import EmployeeStatCard from "../../components/employerDetail/EmployeeStatCard";
import AttendanceChart from "../../components/employerDetail/AttendanceChart";
import {
  ArrowLeft,
  InstagramIcon,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Plus,
  Settings,
} from "lucide-react";
import JobTable from "../../components/employerDetail/JobTable";
import { useNavigate } from "react-router-dom";

const getColor = (value: number): string => {
  if (value < 20) return "red";
  if (value >= 20 && value < 89) return "green";
  return "orange";
};

const EmployerDetailPage: React.FC = () => {

  const navigate = useNavigate()
  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex gap-4 mb-6 items-center">
            <ArrowLeft className="rounded-full p-2 shadow-lg w-10 h-10 cursor-pointer" onClick={() => navigate(-1)} />
            <img src="/assets/ecompany.png" className="w-10 h-10" alt="" />
            <h1 className="text-4xl font-bold">Dominos</h1>
          </div>
        </div>
        <div>
          <button className="text-gray-500 hover:text-black mx-2">
            <Plus className="rounded-full p-2 shadow-lg w-10 h-10" />
          </button>
          <button className="text-gray-500 hover:text-black mx-2">
            <Settings className="rounded-full p-2 shadow-lg w-10 h-10" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex gap-2 items-center">
          <MapPin className='w-4 h-4'/>
          <p className="text-[16px] leading-[20px] font-normal text-[#000000]">123 Orchard Road, Singapore</p>
          <a className="text-[12px] text-[#0099FF] leading-[18px] cursor-pointer underline ">View on map</a>
        </div>
        <div className=" flex gap-2 text-base font-normal items-center">
          <Phone className='w-4 h-4'/> <p className="text-[14px] leading-[18px] font-normal text-[#000000]"> (+65) 123 434 543 </p>
        </div>
        <div className=" flex gap-2 text-base font-normal items-center">
          <Mail className='w-4 h-4'/> <p className="text-[14px] leading-[18px] font-normal text-[#000000]">dominos@gmail.com</p>
        </div>
      </div>
      <div className="flex justify-between border-b-2 border-b-[#D9D9D9] pb-4">
        <div className="flex items-center gap-4 mt-2">
          <button className="bg-gray-100 rounded-full p-2 hover:bg-gray-200">
            <img className="w-6 h-6" src="/assets/icons/skype.svg" alt="" />
          </button>
          <button className="bg-gray-100 rounded-full p-2 hover:bg-gray-200">
            <Linkedin className="w-6 h-6" color="gray" fill="gray" />
          </button>
          <button className="bg-gray-100 rounded-full p-2 hover:bg-gray-200">
            <InstagramIcon className="w-6 h-6" color="white" fill="gray" />
          </button>
          <button className="bg-gray-100 rounded-full p-2 hover:bg-gray-200">
            <MessageSquare className="w-6 h-6" color="gray" fill="gray" />
          </button>
        </div>
        <div className="flex flex-col items-end">
          <h2 className="text-base font-semibold text-left">Employer:</h2>
          <div className="flex gap-1">
            <img src="/assets/company.png" alt="" />
            <p className="uppercase text-base">Right service pte.ltd</p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-4 gap-6 mt-6 border-b-2 border-b-[#D9D9D9] pb-4">
        {/* Card 1: Total Jobs Posted */}
        <div className="flex flex-col items-center p-8 ">
          <p className="text-5xl font-normal mb-2">10</p>
          <p className="text-[#4C4C4C] text-xl font-medium text-center">Total Jobs Posted</p>
        </div>

        {/* Card 2: Shifts Fully Attended */}
        <div className="flex flex-col items-center p-8 ">
          <p className="text-5xl font-normal mb-2">80%</p>
          <p className="text-[#4C4C4C] text-xl font-medium text-center">
            Shifts Fully Attended
          </p>
        </div>

        {/* Card 3: Shifts Partially Attended */}
        <div className="flex flex-col items-center p-8 ">
          <p className="text-5xl font-normal mb-2">15%</p>
          <p className="text-[#4C4C4C] text-xl font-medium text-center">
            Shifts Partially Attended (&lt;50% absentees)
          </p>
        </div>

        {/* Card 4: Shifts Least Attended */}
        <div className="flex flex-col items-center p-8 ">
          <p className="text-5xl font-normal mb-2">5%</p>
          <p className="text-[#4C4C4C] text-xl font-medium text-center">
            Shifts Least Attended (&gt;50% absentees)
          </p>
        </div>
      </div>

      {/* Circle Stats */}
      <div className="grid grid-cols-3 gap-6 mt-6 border-b-2 border-b-[#D9D9D9] pb-4">
        <EmployeeStatCard
          value={85}
          label="Overall Attendance Rate"
          color={getColor(85)}
        />
        <EmployeeStatCard value={5} label="No Show Rate" color={getColor(5)} />
        <EmployeeStatCard
          value={95}
          label="Standby Effectiveness"
          color={getColor(95)}
        />
      </div>

      {/* Attendance Chart */}
      <div className="mt-8">
        <AttendanceChart />
      </div>
      <div className="mt-2">
        <JobTable />
      </div>
    </div>
  );
};

export default EmployerDetailPage;
