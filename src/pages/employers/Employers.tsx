import React, { useEffect, useState } from "react";
import {
  MoreVertical,
  PhoneCall,
  Edit,
  Trash2,
  UserCheck,
  Plus,
  Filter,
  Eye,
  Ban,
} from "lucide-react";
import Pagination from "../../components/Pagination";
import { axiosInstance } from "../../lib/authInstances";
import { Link, useNavigate } from "react-router-dom";
import { CustomScrollbar } from "../../components/layout/CustomScrollbar";

interface Employer {
  employerId: string;
  companyLegalName: string;
  companyLogo: string;
  mainContactPerson: string;
  mainContactPersonPosition: string;
  mainContactNumber: string;
  companyEmail: string;
  companyNumber: string;
  accountManager: string;
  industry: string;
  outlets: number;
  contractStartDate: string;
  contractEndDate: string;
  serviceAgreement: string;
}

const EmployerTable: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const navigate = useNavigate()
  const images = "http://localhost:3000"

  // useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/employers?page=${currentPage}&limit=10`);
  
  
        if (!response.data || !Array.isArray(response.data.employers)) {
          throw new Error("Invalid API response format");
        }
  
        const employerData = response.data.employers.map((employer: any) => ({
          employerId: `#${employer._id.slice(-4)}`,
          companyLogo: employer.companyLogo ? `${images}${employer.companyLogo}`: "/assets/company.png",

          companyLegalName: employer.companyLegalName || employer.companyName,
          hqAddress: employer.hqAddress,
          mainContactPerson: employer.mainContactPersonName || "N/A", // Fix Key
          mainContactPersonPosition: employer.mainContactPersonPosition || "N/A",
          mainContactNumber: employer.mainContactPersonNumber || "N/A", // Fix Key
          companyEmail: employer.companyEmail || "N/A",
          companyNumber: employer.companyNumber || "N/A",
          accountManager: employer.accountManager || "N/A",
          industry: employer.industry || "N/A",
          // outlets: employer.outlets || 0,
          outlets: Array.isArray(employer.outlets) ? employer.outlets.length : 0, 
          contractStartDate: employer.contractStartDate?.substring(0, 10) || "N/A",
          contractEndDate: employer.contractEndDate?.substring(0, 10) || "N/A",
          serviceAgreement: employer.serviceAgreement || "N/A",
          employerOriginalId: employer._id
        }));
  
  
        setEmployers(employerData);
        setTotalPages(response.data.totalPages || 1); // Ensure total pages updates correctly
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage("Failed to fetch employers. Please try again later.");
        console.error("Error fetching employer data:", error);
      }
    };
  
  //   fetchData();
  // }, [currentPage]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);
  
  

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePopupToggle = (index: number) => {
    setIsPopupOpen(isPopupOpen === index ? null : index);
  };

  const handleActionClick = (action: string, id: number) => {
    if (action === "View") {
      navigate(`/employers/${id}`)
    }
    setIsPopupOpen(null);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employer?");
    if (!confirmDelete) return;
  
    try {
      await axiosInstance.delete(`/employers/${id}`);
      
      setEmployers((prevEmployers) => prevEmployers.filter(emp => emp.employerId !== id));
  
      alert("Employer deleted successfully!");

      fetchData();
    } catch (error) {
      console.error("Error deleting employer:", error);
      alert("Failed to delete employer. Please try again.");
    }
  };
  

  return (
    <div className="p-4 flex flex-col justify-between min-h-screen">
      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="text-[36px] font-[500] text-[#1F2937]">Employers</h1>

          <div className="flex items-center gap-4 ">
            <Link to="/employers/add-employer">
            <button className="p-[14px] rounded-[26px] shadow-lg bg-[#FFFFFF] hover:bg-gray-50 ">
              <Plus className="w-[24px] h-[24px]" />
            </button>
            </Link>
            <button className="p-[14px] rounded-[26px] shadow-lg bg-dark hover:bg-slate-950 ">
              <Filter
                className="w-[20px] h-[20px]"
                color="#FFFFFF"
                fill="#ffffff"
              />
            </button>
          </div>
        </div>
        <div className="w-full overflow-x-auto no-scrollbar" ref={scrollContainerRef}>
          <table className="table-auto w-full border-collapse relative">
            <thead>
              <tr className="bg-[#EDF8FF]">
                <th className="py-2 px-4 border-x border-gray-300 text-center whitespace-nowrap rounded-l-full">
                  Employer Id
                </th>
                <th className="py-2 px-4 border-x border-gray-300 text-center whitespace-nowrap">
                  Company Logo
                </th>
                <th className="py-2 px-4 border-x border-gray-300 text-center whitespace-nowrap">
                  Company Legal Name
                </th>
                <th className="py-2 px-4 border-x border-gray-300 text-center whitespace-nowrap">
                  Main Contact Person
                </th>
                <th className="py-2 px-4 border-x border-gray-300 text-center whitespace-nowrap">
                  Job Position
                </th>
                <th className="py-2 px-4 border-x border-gray-300 text-center whitespace-nowrap">
                  Main Conatct Number
                </th>
                <th className="py-2 px-4 border-x border-gray-300 text-center whitespace-nowrap">
                  Company Email Address
                </th>
                <th className="py-2 px-4 border-x border-gray-300 text-center whitespace-nowrap">
                  Company Number
                </th>
                <th className="py-2 px-4 border-x border-gray-300 text-center whitespace-nowrap">
                  Account Manager
                </th>
                <th className="py-2 px-4 border-x border-gray-300 text-center whitespace-nowrap">
                  Industry
                </th>
                <th className="py-2 px-4 border-x border-gray-300 text-center whitespace-nowrap">
                  Outlets
                </th>
                <th className="py-2 px-4 border-x border-gray-300 text-center whitespace-nowrap">
                  Contract Start Date
                </th>
                <th className="py-2 px-4 border-x border-gray-300 text-center whitespace-nowrap">
                  Contract end Date
                </th>
                <th className="py-2 px-4 border-x border-gray-300 text-center whitespace-nowrap">
                  Service Agreement
                </th>
                <th className="py-2 px-4 border-x border-gray-300 text-center whitespace-nowrap rounded-r-full"></th>
              </tr>
            </thead>
            <tbody>
              {employers.map((employer, index) => (
                <tr key={index} className="text-center">

                  <td className="border border-t-0 border-gray-300 py-2 px-4 text-center whitespace-nowrap w-max overflow-hidden text-ellipsis truncate-2">
                    {employer.employerId}
                  </td>
                  <td className="border border-t-0 flex justify-center border-gray-300 py-2 px-4 text-center whitespace-nowrap w-full overflow-hidden text-ellipsis truncate-2">
                    <img
                      src={employer.companyLogo}
                      alt="Company Logo"
                      className="w-12 h-12 rounded"
                    />
                  </td>
                  <td className="border border-t-0 border-gray-300 py-2 px-4 text-center whitespace-nowrap w-max overflow-hidden text-ellipsis truncate-2">
                    {employer.companyLegalName}
                  </td>
                  <td className="border border-gray-300 py-2 px-4 text-center border-t-0 whitespace-nowrap w-max overflow-hidden text-ellipsis truncate-2">
                    {employer.mainContactPerson}
                  </td>
                  <td className="border border-gray-300 py-2 px-4 text-center border-t-0 whitespace-nowrap w-max overflow-hidden text-ellipsis truncate-2">
                    {employer.mainContactPersonPosition}
                  </td>
                  <td className="border border-gray-300 py-2 px-4 text-center border-t-0 whitespace-nowrap w-max overflow-hidden text-ellipsis truncate-2">
                    {employer.mainContactNumber}
                  </td>
                  <td className="border border-gray-300 py-2 px-4 text-center border-t-0 whitespace-nowrap w-max overflow-hidden text-ellipsis truncate-2">
                    {employer.companyEmail}
                  </td>
                  <td className="border border-gray-300 py-2 px-4 text-center border-t-0 whitespace-nowrap w-max overflow-hidden text-ellipsis truncate-2">
                    {employer.companyNumber}
                  </td>
                  <td className="border border-gray-300 py-2 px-4 text-center border-t-0 whitespace-nowrap w-max overflow-hidden text-ellipsis truncate-2">
                    {employer.accountManager}
                  </td>
                  <td className="border border-gray-300 py-2 px-4 text-center border-t-0 whitespace-nowrap w-max overflow-hidden text-ellipsis truncate-2">
                    {employer.industry}
                  </td>
                  <td className="border border-gray-300 py-2 px-4 text-center border-t-0 whitespace-nowrap w-max overflow-hidden text-ellipsis truncate-2">
                    {employer.outlets}
                  </td>
                  <td className="border border-gray-300 py-2 px-4 text-center border-t-0 whitespace-nowrap w-max overflow-hidden text-ellipsis truncate-2">
                    {employer.contractStartDate}
                  </td>
                  <td className="border border-gray-300 py-2 px-4 text-center border-t-0 whitespace-nowrap w-max overflow-hidden text-ellipsis truncate-2">
                    {employer.contractEndDate}
                  </td>
                  <td
                    className="border border-gray-300 py-2 px-4 text-center border-t-0 whitespace-nowrap w-max overflow-hidden text-ellipsis truncate-2"
                  >
                    <p className={`rounded-full text-center w-full ${employer.serviceAgreement === "Completed"
                        ? "bg-[#DBF1FF] text-[#048BE1]"
                        : employer.serviceAgreement === "In Discussion"
                          ? "bg-[#DEFFDF] text-[#049609]"
                          : employer.serviceAgreement === "Expired"
                            ? "bg-[#FFECE8] text-[#E34E30]"
                            : "text-black"
                      }`}>{employer.serviceAgreement}</p>
                  </td>

                  {/* <td className="border border-gray-300 py-2 px-4 text-center border-t-0"> */}

                  <td className="border border-gray-300 p-2">

                    <button
                      className="p-2 text-gray-600 hover:text-black"
                      onClick={() => handlePopupToggle(index)}
                    >
                      <MoreVertical />
                    </button>
                    {isPopupOpen === index && (
                      <div className="absolute top-[30%] right-12 mt-1 w-32 bg-white shadow-md border border-gray-300 rounded-md z-10">
                        <button
                          className="flex items-center gap-2 p-2 w-full text-left text-gray-700 hover:bg-gray-100"
                          onClick={() => handleActionClick("View", employers[index].employerOriginalId)}
                        >
                          <Eye size={16} />
                          View
                        </button>
                        <button
                          className="flex items-center gap-2 p-2 w-full text-left text-gray-700 hover:bg-gray-100"
                          onClick={() =>
                            handleActionClick("Edit", index)
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
                        <button
                          className="flex items-center gap-2 p-2 w-full text-left text-[#E34E30] hover:bg-gray-100"
                          onClick={() => handleDelete(employers[index].employerOriginalId)}
                        >
                          <Trash2 size={16} color="#E34E30" />
                          Remove
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
      <div className="flex flex-col items-center justify-center bg-gray-50">
        <Pagination
          totalPages={totalPages} // Adjust the total pages
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default EmployerTable;
