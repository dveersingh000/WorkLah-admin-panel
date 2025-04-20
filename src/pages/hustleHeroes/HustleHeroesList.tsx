
import React, { useState, useEffect } from "react"
import { Ban, ChevronDown, Edit, Eye, Filter, MoreHorizontal, Plus } from 'lucide-react'
import { CustomScrollbar } from "../../components/layout/CustomScrollbar"
import { useNavigate } from "react-router-dom"
import { axiosInstance } from "../../lib/authInstances";


export interface Employee {
    id: string
    fullName: string
    avatarUrl: string
    gender: string
    mobile: string
    nric: string
    icNumber: string
    dob: string
    registrationDate: string
    turnUpRate: string
    workingHours: string
    avgAttendRate: string
    workPassStatus: "Verified" | "Approved" | "Pending" | "Rejected"
  } 
  

export default function HustleHeroesList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [isPopupOpen, setIsPopupOpen] = useState<number | null>(null);
const scrollContainerRef = React.useRef<HTMLDivElement>(null);

useEffect(() => {
  // Fetch employees from API
  axiosInstance.get('/admin/candidates')
      .then(response => {
        console.log("response", response.data.candidates)
          setEmployees(response.data.candidates);
      })
      .catch(error => {
          console.error("Error fetching employees:", error);
      });
}, []);
  const toggleSelectAll = () => {
    if (selectedRows.length === employees.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(employees.map((emp) => emp.id))
    }
  }

  const formatDob = (dob) => {
    const date = new Date(dob);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
  
    // Get ordinal suffix for the day
    const getOrdinal = (n) => {
      if (n > 3 && n < 21) return "th";
      switch (n % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };
  
    return `${day}${getOrdinal(day)} ${month} ${year}`;
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
  
    // Adjust if birthday hasn't occurred yet this year
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return `${age} yrs`;
  };
  
  

  const toggleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  const navigate = useNavigate()

  const handlePopupToggle = (index: number) => {
    setIsPopupOpen(isPopupOpen === index ? null : index);
  };

  const handleActionClick = (action: string, id: number) => {
    if(action==="View"){
      navigate(`/jobs/:jobId/candidates/${id}`)
    }
    if(action==="Edit"){
      navigate(`/edit-candidate-profile/${id}`)
    }
    setIsPopupOpen(null);
  };


  const getStatusColor = (status: Employee["workPassStatus"]) => {
    switch (status) {
      case "Verified":
        return "bg-green-50 text-green-600"
      case "Approved":
        return "bg-blue-50 text-blue-600"
      case "Pending":
        return "bg-orange-50 text-orange-600"
      case "Rejected":
        return "bg-red-50 text-red-600"
      default:
        return "bg-gray-50 text-gray-600"
    }
  }

  return (
    <div className="p-4 flex flex-col justify-between min-h-screen">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="text-[36px] font-[500] text-[#1F2937]">Hustle Heroes</h1>

          <div className="flex items-center gap-4 ">
            {/* <button className="p-[14px] rounded-[26px] shadow-lg bg-[#FFFFFF] hover:bg-gray-50 ">
              <Plus className="w-[24px] h-[24px]" />
            </button> */}
            <button className="p-[14px] rounded-[26px] shadow-lg bg-dark hover:bg-slate-950 ">
              <Filter
                className="w-[20px] h-[20px]"
                color="#FFFFFF"
                fill="#ffffff"
              />
            </button>
          </div>
        </div>
    <div  ref={scrollContainerRef} className="w-full overflow-x-auto no-scrollbar">
      <table className="table-auto w-full border-collapse relative">
        <thead>
          <tr className="bg-[#EDF8FF] ">
            <th className="p-4 text-center truncate border rounded-l-full">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                checked={selectedRows.length === employees.length}
                onChange={toggleSelectAll}
              />
            </th>
            <th className="p-4 truncate text-center border">Id</th>
            <th className="p-4 truncate text-center border">Full Name</th>
            <th className="p-4 truncate text-center border">Gender</th>
            <th className="p-4 truncate text-center border">Mobile</th>
            <th className="p-4 truncate text-center border">IC Number</th>
            <th className="p-4 truncate text-center border">DOB</th>
            <th className="p-4 truncate text-center border">Age</th>
            <th className="p-4 truncate text-center border">Registration Date</th>
            {/* <th className="p-4 truncate text-center border">Turn Up Rate</th> */}
            {/* <th className="p-4 truncate text-center border">Working Hours</th> */}
            {/* <th className="p-4 truncate text-center border">Avg. Attend Rate</th> */}
            <th className="p-4 truncate text-center border">Work Pass Status</th>
            <th className="p-4 truncate text-center border">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id} className="border-b relative">
              <td className="p-4 truncate text-center border">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={selectedRows.includes(employee.id)}
                  onChange={() => toggleSelectRow(employee.id)}
                />
              </td>
              <td className="p-4 truncate text-center border">{employee.id}</td>
              <td className="px-12 py-4  truncate text-center border">
                <div className="flex items-center gap-2">
                  <img
                    src={employee.profilePicture}
                    alt=""
                    className="h-8 w-8 rounded-full bg-gray-200"
                  />
                  <span>{employee.fullName}</span>
                </div>
              </td>
              <td className="p-4 truncate text-center border">
                {employee.gender === "Male" ? "M" : employee.gender === "Female" ? "F" : "N/A"}
              </td>
              <td className="p-4 truncate text-center border">{employee.mobile}</td>
              <td className="p-4 truncate text-center border">{employee.nric}</td>
              <td className="p-4 truncate text-center border">
              {employee.dob ? formatDob(employee.dob) : "N/A"}
            </td>

            <td className="p-4 truncate text-center border">
            {employee.dob ? calculateAge(employee.dob) : "N/A"}
          </td>


              <td className="p-4 truncate text-center border">{employee.registrationDate}</td>
              {/* <td className="p-4 truncate text-center border">{employee.turnUpRate}</td> */}
              {/* <td className="p-4 truncate text-center border">{employee.workingHours}</td> */}
              {/* <td className="p-4 truncate text-center border">{employee.avgAttendRate}</td> */}
              <td className="p-4 truncate text-center border">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                      employee.workPassStatus
                    )}`}
                  >
                    {employee.workPassStatus}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </span>
                </div>
              </td>
              <td className="p-4 truncate text-center border ">
                <button className="inline-flex items-center rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-200">
                  Action
                  <MoreHorizontal className="ml-1 h-4 w-4" onClick={() => handlePopupToggle(index)} />
                </button>
                {isPopupOpen === index && (
                      <div className="absolute top-[30%] right-12 mt-1 w-32 bg-white shadow-md border border-gray-300 rounded-md z-10">
                        <button
                          className="flex items-center gap-2 p-2 w-full text-left text-gray-700 hover:bg-gray-100"
                          onClick={() => handleActionClick("View", employee.id)}
                        >
                          <Eye size={16} />
                          View
                        </button>
                        <button
                          className="flex items-center gap-2 p-2 w-full text-left text-gray-700 hover:bg-gray-100"
                          onClick={() =>
                            handleActionClick("Edit", employee.id)
                          }
                        >
                          <Edit size={16} />
                          Edit
                        </button>
                        <button
                          className="flex items-center gap-2 p-2 w-full text-left text-[#E34E30] hover:bg-gray-100"
                          onClick={() => handleActionClick("Block", index)}
                        >
                          <Ban size={16} color="#E34E30" />
                          Block
                        </button>
                        
                      </div>
                    )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
    <CustomScrollbar
                scrollContainerRef={scrollContainerRef}
                totalSteps={3}
              />
              {/* Pagination */}
              <div className="flex justify-center items-center gap-2 mt-20">
                <button className="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
                  ←
                </button>
                <div className="flex gap-1">
                  <button className="px-3 py-1 border border-blue-500 rounded-md bg-blue-500 text-white">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
                    4
                  </button>
                  <span className="px-3 py-1">...</span>
                  <button className="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
                    55
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
                    56
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
                    57
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
                    58
                  </button>
                </div>
                <button className="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
                  →
                </button>
              </div>
    </div>
  )
}

