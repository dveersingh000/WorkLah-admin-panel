import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
import { AgCharts } from "ag-charts-react";

const jobData = [
  { month: "Jan", value: 100000 },
  { month: "Feb", value: 20000 },
  { month: "Mar", value: 30000 },
  { month: "Apr", value: 150000 },
  { month: "May", value: 120000 },
  { month: "Jun", value: 70000 },
  { month: "Jul", value: 80000 },
  { month: "Aug", value: 60000 },
  { month: "Sep", value: 70000 },
  { month: "Oct", value: 90000 },
  { month: "Nov", value: 50000 },
  { month: "Dec", value: 132000 },
];
const JobsBarChart = () => {
  const [options, setOptions] = useState({
    // Data: Data to be displayed in the chart
    data: [
      { month: "Jan", jobsPosted: 0 },
      { month: "Feb", jobsPosted: 0 },
      { month: "Mar", jobsPosted: 0 },
      { month: "Apr", jobsPosted: 0 },
      { month: "May", jobsPosted: 0 },
      { month: "Jun", jobsPosted: 0 },
      { month: "Jul", jobsPosted: 0 },
      { month: "Aug", jobsPosted: 0 },
      { month: "Sep", jobsPosted: 0 },
      { month: "Oct", jobsPosted: 0 },
      { month: "Nov", jobsPosted: 0 },
      { month: "Dec", jobsPosted: 0 },
    ],
    // Series: Defines which chart type and data to use
    series: [{ 
      type: "bar", xKey: "month", yKey: "jobsPosted", 
      fill: "#003D64", 
      
      // Add cornerRadius to the bars
      barStyle: {
        radius: 10, // Adjust the value to control the corner radius
      },
    
    }],
    // Axes: Customizing the Y-axis to show labels in 'k' format
    axes: [
      {
        type: "category",
        position: "bottom",
      },
      {
        type: "number",
        position: "left",
        label: {
          formatter: (params) => {
            const value = params.value;
            return `${value / 1000}k`; // Convert to 'k' format
          },
        },
        // Dashed grid line style
        gridStyle: [
          {
            stroke: "gray", // Grid line color
            lineDash: [10, 3], // Dashed line pattern (6px dash, 3px gap)
          },
        ],
      },
    ],
  });

  return <AgCharts options={options} />;
};


const jobs = [
  { title: "General Cleaner", applicants: 345,icon:"/assets/icons/post_job1.svg" },
  { title: "Care Taker", applicants: 267,icon:"/assets/icons/post_job2.svg" },
  { title: "Tray Collector", applicants: 345,icon:"/assets/icons/post_job3.svg" },
];

const JobPostChart = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {/* Left: Total Job Posted */}
      <div className="col-span-2 bg-white border rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Total Job Posted
          </h2>
          <button className="text-sm flex items-center gap-1"><p>Detail statistics</p> <ArrowRight className="w-4 h-4"/></button>
        </div>
        <div className="h-64">
        <JobsBarChart />
        </div>
        <div className="flex justify-center items-center mt-4">
          <p className="text-sm text-gray-600 bg-gray-100 rounded-full px-3 py-1">
            132k job posted
          </p>
        </div>
      </div>

      {/* Right: Posted Jobs */}
      <div className="col-span-1 w-full max-w-sm bg-white border border-gray-200 rounded-lg p-4 shadow">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b-2 border-gray-300">
          <h3 className="text-lg font-semibold text-gray-800">Posted Jobs</h3>
          <a
            href="#view-list"
            className="text-sm text-blue-600 hover:underline"
          >
            view list
          </a>
        </div>

        {/* Job Cards */}
        {jobs.map((job, index) => (
          <div
            key={index}
            className="flex justify-between items-center my-4 py-2 border-b last:border-b-0"
          >
            {/* Job Info */}
            <div>
              <h4 className="text-md font-medium text-gray-900 flex gap-2"><img className="w-8 h-8" src={job.icon} alt=""/><p>{job.title}</p></h4>
              <p className="text-sm text-gray-600">
                Applicants: {job.applicants}
              </p>
            </div>

            {/* Posted By */}
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">Posted by:</p>
              <div className="flex">
                <div>
                  <span className="text-sm text-gray-600">+32</span>
                </div>
                <div className="flex -space-x-4 items-center">
                  <a href="#profile1" className="relative z-30">
                    <img
                      src="/assets/teamm1.svg"
                      alt="Profile 1"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  </a>
                  <a href="#profile2" className="relative z-20">
                    <img
                      src="/assets/teamm2.svg"
                      alt="Profile 2"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  </a>
                  <a href="#profile3" className="relative z-10">
                    <img
                      src="/assets/teamm3.svg"
                      alt="Profile 3"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  </a>
                  <a href="#profile3" className="relative z-19">
                    <img
                      src="/assets/teamm4.svg"
                      alt="Profile 4"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPostChart;
