import React, { useEffect, useState } from "react";
import JobPostChart from "../components/dashboard/JobPostChart";
import RevenueChart from "../components/dashboard/RevenueChart";
import DashboardCard from "../components/dashboard/DashboardCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/authInstances";

type totalJobPostedTyep = {
  month: String;
  jobsPosted: Number;
}

const Dashboard = () => {
  const [selectedCard, setSelectedCard] = useState(null); // State to track the selected card
  const [dashboardData, setDashboardData] = useState(0);
  const [postedJobs, setPostedJobs] = useState(0)
  const [queryParams, setQueryParams] = useState({
    search: "",
    status: "",
    location: "",
    page: 1,
    limit: 1000,
  });
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const [startDate, setStartDate] = useState(firstDayOfMonth);
  const [endDate, setEndDate] = useState(today);

  const handleCardClick = (index) => {
    setSelectedCard(index); // Set the clicked card as selected
  };

  const fetchJobDetails = async () => {
    try {
      const response = await axiosInstance.get(`/dashboard/overview`);
      console.log("API Response:", response.data);

      setDashboardData({
        totalJobs: response.data.totalJobs || 0,
        activatedHeroes: response.data.activatedHeroes || 0,
        vacancies: response.data.vacancies || 0,
        vacanciesFilled: response.data.vacanciesFilled || 0,
        pendingVerifications: response.data.pendingVerifications || 0,
        pendingPayments: response.data.pendingPayments || 0,
        totalAmountPaid: response.data.totalAmountPaid || 0,
        noShows: response.data.noShows || 0,
        verifiedHeroes: response.data.verifiedHeroes || 0
      });
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };


  useEffect(() => {
    fetchJobDetails();
  }, []);



  const cards = [
    {
      title: "No. of Active Job now",
      value: dashboardData.totalJobs,
      chartData: [0, 0, 0, 0, 0, 0, 0, 0],
      chartColor: ["#797979", "#FFFFFF"],
      icon: "/assets/icons/group1.svg",
    },
    {
      title: "Activated Hustle Heroes",
      value: dashboardData.activatedHeroes,
      chartData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      chartColor: ["#11FF00", "#FFFFFF"],
      icon: "/assets/icons/group2.svg",
    },
    {
      title: "Current Headcount Fulfilment",
      value: dashboardData.vacancies,
      chartData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      chartColor: ["#4D5578", "#FFFFFF"],
      icon: "/assets/icons/group3.svg",
    },
    {
      title: "Pending Verifications",
      value: dashboardData.pendingVerifications,
      chartData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      chartColor: ["#0FA5C2", "#FFFFFF"],
      icon: "/assets/icons/group4.svg",
    },
    {
      title: "Pending Wages Transfer",
      value: dashboardData.pendingPayments,
      chartData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      chartColor: ["#FFDD1C", "#FFFFFF"],
      icon: "/assets/icons/group5.svg",
    },
    {
      title: "Outstanding Payment",
      value: dashboardData.totalAmountPaid,
      chartData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      chartColor: ["#178628", "#FFFFFF"],
      icon: "/assets/icons/group6.svg",
    },
    {
      title: "No Show",
      value: dashboardData.noShows,
      chartData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      chartColor: ["#797979", "#FFFFFF"],
      icon: "/assets/icons/group7.svg",
    },
    {
      title: "Verified Hustle Heroes",
      value: dashboardData.verifiedHeroes,
      chartData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      chartColor: ["#007BE5", "#FFFFFF"],
      icon: "/assets/icons/group2.svg",
    },
  ];


  const CustomInput = React.forwardRef(({ value, onClick, label }, ref) => (
    <div
      className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white cursor-pointer"
      onClick={onClick}
      ref={ref}
    >
      <CalendarDays className="text-[#048be1]" />
      <span className="text-[14px] leading-[20px] font-normal text-black">{value || label}</span>
    </div>
  ));

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-[24px] font-medium leading-[30px] text-[#1f2937] pl-2 border-l-[12px] border-[#FED408]">Dashboard Overview</h1>
        {/* <div className="flex items-center gap-4">
          <Link to='/jobs/create-job'>
            <button className=" px-8 py-2 text-white bg-[#048be1] cursor-pointer mt-4 rounded-lg">
              Add New Job
            </button>
          </Link>
          <div>
            <label className="block text-[14px] font-medium text-[#636363]">
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
            <label className="block text-[14px] font-medium text-[#636363]">
              End Date
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="d MMMM, yyyy"
              customInput={<CustomInput label="Select End Date" />}
            />
          </div>
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className={`cursor-pointer rounded-lg ${selectedCard === index
                ? "border-2 border-black"
                : "border border-gray-200"
              }`}
          >
            <DashboardCard
              title={card.title}
              value={card.value}
              chartData={card.chartData}
              chartColor={card.chartColor}
              icon={<img src={card.icon} className="text-blue-500 w-8 h-8" />}
            />
          </div>
        ))}
      </div>

      <JobPostChart />
      <RevenueChart />
    </div>
  );
};

export default Dashboard;
