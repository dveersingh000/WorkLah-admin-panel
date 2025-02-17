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
import { useNavigate } from "react-router-dom";
import { CustomScrollbar } from "../../components/layout/CustomScrollbar";

// interface Employer {
//   employerId: string;
//   companyLogo: string;
//   companyLegalName: string;
//   mainContactPerson: string;
//   jobPosition: string;
//   mainContactNumber: string;
//   companyEmail: string;
//   companyNumber: string;
//   accountManager: string;
//   industry: string;
//   outlets: number;
//   contractStartDate: string;
//   contractEndDate: string;
//   serviceAgreement: string;
// }
interface Employer {
  employerId: string;
  companyLegalName: string;
  companyLogo: string;
  mainContactPerson: string;
  jobPosition: string;
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

const employer: Employer[] = [
  {
    employerId: "EMP001",
    companyLogo: "/assets/company.png",
    companyLegalName: "Tech Innovations Ltd",
    mainContactPerson: "John Doe",
    jobPosition: "CEO",
    mainContactNumber: "+1 123-456-7890",
    companyEmail: "contact@techinnovations.com",
    companyNumber: "123456789",
    accountManager: "Alice Smith",
    industry: "Software",
    outlets: 5,
    contractStartDate: "2024-01-01",
    contractEndDate: "2025-01-01",
    serviceAgreement: "In Discussion",
  },
  {
    employerId: "EMP002",
    companyLogo: "/assets/company.png",
    companyLegalName: "Green Energy Corp",
    mainContactPerson: "Jane Doe",
    jobPosition: "Managing Director",
    mainContactNumber: "+1 234-567-8901",
    companyEmail: "info@greenenergy.com",
    companyNumber: "987654321",
    accountManager: "Bob Johnson",
    industry: "Renewable Energy",
    outlets: 8,
    contractStartDate: "2023-05-15",
    contractEndDate: "2026-05-15",
    serviceAgreement: "Completed",
  },
  {
    employerId: "EMP003",
    companyLogo: "/assets/company.png",
    companyLegalName: "Global Retailers Inc",
    mainContactPerson: "Michael Smith",
    jobPosition: "Operations Head",
    mainContactNumber: "+1 345-678-9012",
    companyEmail: "support@globalretail.com",
    companyNumber: "1122334455",
    accountManager: "Charlie Davis",
    industry: "Retail",
    outlets: 12,
    contractStartDate: "2022-09-10",
    contractEndDate: "2024-09-10",
    serviceAgreement: "Expired",
  },
];

// const employer: Employer[] = Array(5).fill({
//   companyName: [
//     "/public/assets/company.png",
//     "RIGHT SERVICE PTE. LTD.",
//     "SengKang, Singapore",
//   ],
//   companyEmail: "rightservice123@gmail.com",
//   activeJobPostings: 20,
//   outlets: 5,
//   contractStartDate: "03/05/2003",
//   contractEndDate: "04/10/2026",
//   verificationStatus: "Verified",
// });


const EmployerTable: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/employers?page=${currentPage}&limit=10`);
        const employerData = response.data.data.map((employer: any) => ({
          employerId: `#${employer._id.slice(-4)}`, // Fix: Map Employer ID
          companyLogo: employer.companyLogo || "/assets/company.png",
          companyLegalName: employer.companyName, // Fix: Map Company Legal Name
          mainContactPerson: employer.mainContactPerson,
          jobPosition: employer.jobPosition,
          mainContactNumber: employer.contactNumber, // Fix: Map Main Contact Number
          companyEmail: employer.companyEmail,
          companyNumber: employer.companyNumber,
          accountManager: employer.accountManager,
          industry: employer.industry,
          outlets: employer.outletCount || 0, // Fix: Ensure Outlets Count is Shown
          contractStartDate: employer.contractStartDate.substring(0, 10),
          contractEndDate: employer.contractEndDate.substring(0, 10),
          serviceAgreement: employer.serviceAgreement,
        }));

        setEmployers(employerData);
        setTotalPages(response.data.totalPages);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage("Failed to fetch employers. Please try again later.");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePopupToggle = (index: number) => {
    setIsPopupOpen(isPopupOpen === index ? null : index);
  };

  const handleActionClick = (action: string, id: number) => {
    if(action==="View"){
      navigate(`/employers/${id}`)
    }
    setIsPopupOpen(null);
  };

  return (
    <div className="p-4 flex flex-col justify-between min-h-screen">
      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="text-[36px] font-[500] text-[#1F2937]">Employers</h1>

          <div className="flex items-center gap-4 ">
            <button className="p-[14px] rounded-[26px] shadow-lg bg-[#FFFFFF] hover:bg-gray-50 ">
              <Plus className="w-[24px] h-[24px]" />
            </button>
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
                    {employer.jobPosition}
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
                    <p className={`rounded-full text-center w-full ${
                      
                        employer.serviceAgreement === "Completed"
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
                          onClick={() => handleActionClick("View", index)}
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
                          onClick={() => handleActionClick("Remove", index)}
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
