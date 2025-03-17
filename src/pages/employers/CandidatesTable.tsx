import { ArrowLeft, Eye, MoreVertical, RotateCcw, Settings, View } from "lucide-react";
import { useEffect, useState } from "react";
import { FiCheck, FiEdit3 } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../lib/authInstances";
// import Image from "next/image"

interface Candidate {
  id: number;
  name: string;
  gender: string;
  mobile: string;
  dob: string;
  nric: string;
  startTime: string;
  endTime: string;
  clockedIn: string;
  clockedOut: string;
  completedJobs: number;
  status: string;
  jobStatus: string;
  wage: number;
  image: string;
}

// const candidates: Candidate[] = [
//   {
//     id: 1,
//     name: "Ethan Carter",
//     gender: "Male",
//     mobile: "+65 9123 4567",
//     dob: "04 Oct, 1999",
//     nric: "XXXXXX4575",
//     startTime: "11:00 AM",
//     endTime: "03:00 PM",
//     clockedIn: "11:05 AM",
//     clockedOut: "03:00 PM",
//     completedJobs: 122,
//     status: "Confirmed",
//     jobStatus: "Completed",
//     wage: 72,
//     image: "/assets/teamm1.svg",
//   },
//   {
//     id: 2,
//     name: "Liam Bennett",
//     gender: "Male",
//     mobile: "+65 9123 4567",
//     dob: "04 Oct, 1999",
//     nric: "XXXXXX4575",
//     startTime: "11:00 AM",
//     endTime: "03:00 PM",
//     clockedIn: "11:10 AM",
//     clockedOut: "02:50 PM",
//     completedJobs: 122,
//     status: "Confirmed",
//     jobStatus: "Completed",
//     wage: 69,
//     image: "/assets/teamm2.svg",
//   },
//   {
//     id: 3,
//     name: "Ava Sullivan",
//     gender: "Female",
//     mobile: "+65 9123 4567",
//     dob: "04 Oct, 1999",
//     nric: "XXXXXX4575",
//     startTime: "11:00 AM",
//     endTime: "03:00 PM",
//     clockedIn: "11:06 AM",
//     clockedOut: "03:00 PM",
//     completedJobs: 122,
//     status: "Standby",
//     jobStatus: "Completed",
//     wage: 73,
//     image: "/assets/teamm3.svg",
//   },
// ];

export default function CandidateManagement() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [data, setData] = useState(null)
  console.log("candidates", candidates)
  const [activeTime, setActiveTime] = useState("11:00 AM");
  const [isPopupOpen, setIsPopupOpen] = useState<number | null>(null);
  const [isEditTime, setIsEditTime] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()
  const {jobId} = useParams()
  console.log(jobId)

  useEffect(()=> {
    const fetchCandidates = async () => {
      try {
        const response = await axiosInstance.get(`/admin/jobs/candidates/${jobId}`);
        console.log(response)
        setCandidates(response.data.candidates)
        setData(response.data)
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };
    if (jobId) {
      fetchCandidates();
    }
  }, [jobId]);

  if (loading) {
    return <div className="text-center py-10">Loading candidates...</div>;
  }

  

  const handleActionClick = (action: string, id: number) => {
    // alert(`Action: ${action}, Row: ${index}`);
    if (action === "View Candidate") {
      navigate(`/jobs/${jobId}/candidates/${id}`);
    }
    setIsPopupOpen(null);
  };
  const handlePopupToggle = (index: number) => {
    setIsPopupOpen(isPopupOpen === index ? null : index);
  };
  return (
    <div className="p-4 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button className="rounded-full hover:bg-gray-100 cursor-pointer" onClick={() => navigate(-1)}>
            <ArrowLeft className="rounded-full p-2 shadow-lg w-10 h-10" />
          </button>
          <h1 className="text-xl font-semibold">Candidates</h1>
        </div>

        <div>
          <button className="text-gray-500 hover:text-black mx-2">
            <Settings className="rounded-full p-2 shadow-lg w-10 h-10" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex gap-1">
              <span className="text-base font-semibold text-[#4C4C4C]">
                Job:
              </span>
              <span className="text-base font-semibold">{data.job?.jobName}</span>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                Active
              </span>
            </div>
            <div className="flex gap-1">
              <span className="text-base font-semibold text-[#4C4C4C]">
                Employer:
              </span>
              <span className="text-base font-semibold">
              {data.job?.employer}
              </span>
            </div>
            <div className="flex gap-1">
              <span className="text-base font-semibold text-[#4C4C4C]">
                Date:
              </span>
              <span className="text-base font-semibold ">{data.job?.date}</span>
            </div>
          </div>
        </div>
        <div>
          <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-black/90">
            Export
          </button>
        </div>
      </div>

      <div className="flex mb-6 gap-2">
        <button className="px-4 py-2 text-base font-medium rounded-full bg-black text-white">
          All Candidates ({data.totalCandidates})
        </button>
        <button className="px-4 py-2 text-base font-medium rounded-full bg-[#F4F4F4]">
          Vacancy Candidates (6)
        </button>
        <button className="px-4 py-2 text-base font-medium rounded-full bg-[#F4F4F4]">
          Standby Candidates ({data.standbyCount})
        </button>
      </div>

      <div className="flex gap-2 mb-6">
  {Array.from(new Set(candidates.map((c) => c.shift?.startTime).filter(Boolean))).map((time) => (
    <button
      key={time}
      className={`px-4 py-1 text-base font-medium border rounded-full 
      ${
        time === activeTime
          ? "bg-[#048BE1] text-white border-[#048BE1]"
          : "text-black border-[#048BE1] hover:bg-gray-50"
      }`}
      onClick={() => setActiveTime(time)} // Update activeTime on click
    >
      {time}
    </button>
  ))}
</div>


      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 truncate capitalize tracking-wider text-center text-sm font-medium border text-gray-500"></th>
              <th className="px-4 py-3 truncate capitalize tracking-wider text-center text-sm font-medium border text-gray-500">
                Full Name
              </th>
              <th className="px-4 py-3 truncate capitalize tracking-wider text-center text-sm font-medium border text-gray-500">
                Gender
              </th>
              <th className="px-4 py-3 truncate capitalize tracking-wider text-center text-sm font-medium border text-gray-500">
                Mobile
              </th>
              <th className="px-4 py-3 truncate capitalize tracking-wider text-center text-sm font-medium border text-gray-500">
                DOB
              </th>
              <th className="px-4 py-3 truncate capitalize tracking-wider text-center text-sm font-medium border text-gray-500">
                NRIC
              </th>
              <th className="px-4 py-3 truncate capitalize tracking-wider text-center text-sm font-medium border text-gray-500">
                Start Time
              </th>
              <th className="px-4 py-3 truncate capitalize tracking-wider text-center text-sm font-medium border text-gray-500">
                End Time
              </th>
              <th className="px-4 py-3 truncate capitalize tracking-wider text-center text-sm font-medium border text-gray-500">
                Clocked In
              </th>
              <th className="px-4 py-3 truncate capitalize tracking-wider text-center text-sm font-medium border text-gray-500">
                Clocked Out
              </th>
              <th className="px-4 py-3 truncate capitalize tracking-wider text-center text-sm font-medium border text-gray-500">
                Completed Jobs
              </th>
              <th className="px-4 py-3 truncate capitalize tracking-wider text-center text-sm font-medium border text-gray-500">
                From Confirmed/Standby
              </th>
              <th className="px-4 py-3 truncate capitalize tracking-wider text-center text-sm font-medium border text-gray-500">
                Job Status
              </th>
              <th className="px-4 py-3 truncate capitalize tracking-wider text-center text-sm font-medium border text-gray-500">
                Wage Generated
              </th>
              <th className="px-4 py-3 truncate capitalize tracking-wider"></th>
            </tr>
          </thead>

          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="border-b last:border-b-0 relative">
                <td className="px-4 py-4 text-center truncate border text-[16px] leading-[20px] text-[#000000] font-medium">
                  <img
                    src={candidate.profilePicture || "/fallback-image.jpg"} // Example of a fallback image path
                    alt={candidate.name || "Candidate Image"}
                    className="rounded-full max-w-none"
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td className="px-4 py-3 text-center truncate border capitalize text-[16px] leading-[20px] text-[#000000] font-medium">
                  {candidate.fullName || "N/A"}
                </td>
                <td className="px-4 py-3 text-center truncate border capitalize text-[16px] leading-[20px] text-[#000000] font-medium">
                  {candidate.gender || "N/A"}
                </td>
                <td className="px-4 py-3 text-center truncate border capitalize text-[16px] leading-[20px] text-[#000000] font-medium">
                  {candidate.mobile || "N/A"}
                </td>
                <td className="px-4 py-3 text-center truncate border capitalize text-[16px] leading-[20px] text-[#000000] font-medium">
                  {candidate.dob || "N/A"}
                </td>
                <td className="px-4 py-3 text-center truncate border capitalize text-[16px] leading-[20px] text-[#000000] font-medium">
                  {candidate.nric || "N/A"}
                </td>
                <td className="px-4 py-3 text-center truncate border capitalize text-[16px] leading-[20px] text-[#000000] font-medium">
                  <span className="px-2 py-1 bg-[#048BE1] text-white rounded-full ">
                  {candidate.shift?.startTime || "N/A"}

                  </span>
                </td>
                <td className="px-4 py-3 text-center truncate border capitalize text-[16px] leading-[20px] text-[#000000] font-medium">
                  <span className="px-2 py-1 bg-[#048BE1] text-white rounded-full ">
                    {candidate.shift?.endTime || "N/A"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center truncate border capitalize text-[16px] leading-[20px] text-[#000000] font-medium">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1 py-1 px-3 rounded-full border border-[#048BE1] w-fit">
                      <RotateCcw
                        className={`text-white p-1 rounded-full ${
                          isEditTime ? "bg-black" : "bg-[#CDCDCD]"
                        } w-7 h-7`}
                      />
                      {isEditTime ? (
                        <>
                          <input
                            type="text"
                            className="text-[16px] leading-[24px] font-medium bg-[#EBEBEB] rounded-lg text-[#000000] w-[70px] text-center"
                            defaultValue={candidate.shift?.clockedIn}
                          />
                          <FiCheck
                            className="text-white p-1 rounded-full bg-[#049609] w-7 h-7 cursor-pointer"
                            onClick={() => setIsEditTime(false)} // Set back to false
                          />
                        </>
                      ) : (
                        <>
                          <p className="text-[16px] leading-[24px] font-medium text-[#000000] w-[70px] text-center">
                            {candidate.shift?.clockedIn}
                          </p>
                          <FiEdit3
                            className="text-white p-1 rounded-full bg-[#0099FF] w-7 h-7 cursor-pointer"
                            onClick={() => setIsEditTime(true)} // Set to true
                          />
                        </>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center truncate border capitalize text-[16px] leading-[20px] text-[#000000] font-medium">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1 py-1 px-3 rounded-full border border-[#048BE1] w-fit">
                      <RotateCcw className="text-white p-1 rounded-full bg-[#CDCDCD] w-7 h-7" />
                      <p className="text-[16px] leading-[24px] font-medium text-[#000000] w-[70px] text-center">
                        {candidate.shift?.clockedOut}
                      </p>
                      <FiEdit3 className="text-white p-1 rounded-full bg-[#0099FF] w-7 h-7" />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center truncate border capitalize text-[16px] leading-[20px] text-[#000000] font-medium">
                  {candidate.completedJobs}
                </td>
                <td className="px-4 py-3 text-center truncate border capitalize text-[16px] leading-[20px] text-[#000000] font-medium">
                  <span
                    className={`py-0.5 px-3 rounded-full ${
                      candidate.status === "Confirmed"
                        ? "bg-[#DEFFDF] text-[#049609]"
                        : "bg-[#FFF7DC] text-[#D37700]"
                    }`}
                  >
                    {candidate.confirmedOrStandby}
                  </span>
                </td>
                <td className="px-4 py-3 text-center truncate border capitalize text-[16px] leading-[20px] text-[#000000] font-medium">
                  <span className="bg-[#E0F3FF] text-[#0099FF] px-3 py-0.5 rounded-full">
                  {data.job?.jobStatus}
                  </span>
                </td>
                <td className="px-4 py-3 text-center truncate border capitalize text-[16px] leading-[20px] text-[#000000] font-medium relative">
                  <div className="flex flex-col">
                    <span>{candidate.shift?.wageGenerated}</span>
                    <span className="text-xs text-gray-500">
                    {candidate.shift?.totalDuration} ({candidate.shift?.breakType} Break)
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center truncate border capitalize text-[16px] leading-[20px] text-[#000000] font-medium ">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => handlePopupToggle(candidate.id)}>
                      <MoreVertical className="h-4 w-4" />
                    </button>
                    {isPopupOpen === candidate.id && (
                    <div className="absolute top-[40%] right-12 mt-1 w-40 bg-white shadow-md border border-gray-300 rounded-md z-10">
                      <button
                        className="flex items-center gap-2 p-2 w-full text-left text-gray-700 hover:bg-gray-100"
                        onClick={() => handleActionClick("View Candidate", candidate.id)}
                      >
                        <Eye size={16} />
                        View Candidate
                      </button>
                    </div>
                  )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
