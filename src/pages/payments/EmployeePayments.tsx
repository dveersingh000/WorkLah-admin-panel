"use client";

import { useEffect, useRef, useState } from "react";
import { Filter } from "lucide-react";
import Payments from "../../components/payments/Payments";
import WithDrawals from "../../components/payments/WithDrawals";
import axios from "axios";
import PaymentFilters from "../../components/Filter/PaymentFilters";
import Servicereport from "../../components/payments/sevicereport";
import SalesReport from "../../components/payments/salesreport";
import Invoicereport from "../../components/payments/invoice";

export default function EmployeePayments() {
  const [activeTab, setActiveTab] = useState("payments");
  const [workerClientTab, setWorkerClientTab] = useState("workers")
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLimitPopupOpen, setIsLimitPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const [activeClientTab, setActiveClientTab] = useState("serviceReport")

  console.log(activeClientTab)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsLimitPopupOpen(false);
      }
    };

    if (isLimitPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLimitPopupOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors

        // Determine the API endpoint based on the active tab
        const url =
          activeTab === "payments"
            ? "https://worklah.onrender.com/api/payments/"
            : "https://worklah.onrender.com/api/withdrawals/";

        // Fetch data from the determined endpoint
        const response = await axios.get(url);
        setData(response.data); // Store the fetched data
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <div className="w-full bg-[#F8F8F8]">
      <div className="flex flex-col space-y-4 p-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-[#333333]">
            Payments & Transactions
          </h2>
        </div>





        <div className="flex justify-between items-center mb-4 border-b border-gray-300">
          {/* Tab Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setWorkerClientTab("workers")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${workerClientTab === "workers"
                ? "bg-[#0070F3] text-white"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Workers
            </button>
            <button
              onClick={() => setWorkerClientTab("clients")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${workerClientTab === "clients"
                ? "bg-[#0070F3] text-white"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Clients
            </button>
          </div>

          {/* Filter Button */}
          <div className="relative">
            <button
              className="p-3 rounded-full bg-gray-700 hover:bg-gray-900 shadow-md transition-transform hover:scale-105"
              onClick={() => setIsLimitPopupOpen(!isLimitPopupOpen)}
            >
              <Filter size={20} color="#FFFFFF" />
            </button>
            {isLimitPopupOpen && (
              <div
                ref={popupRef}
                className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-md z-50"
              >
                <PaymentFilters />
              </div>
            )}
          </div>
        </div>


        {
          workerClientTab === "workers" ? <>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "payments"
                  ? "bg-[#0070F3] text-white"
                  : "text-[#666666] hover:text-[#333333]"
                  }`}
                onClick={() => setActiveTab("payments")}
              >
                Payments
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "withdrawals"
                  ? "bg-[#0070F3] text-white"
                  : "text-[#666666] hover:text-[#333333]"
                  }`}
                onClick={() => setActiveTab("withdrawals")}
              >
                Withdrawals
              </button>
            </div>
            <div className="mt-4">
              {activeTab === "payments" && <Payments />}
              {activeTab === "withdrawals" && <WithDrawals />}
            </div>
          </> : <>

            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md ${activeClientTab === "serviceReport"
                  ? "bg-[#0070F3] text-white"
                  : "text-[#666666] hover:text-[#333333]"
                  }`}
                onClick={() => setActiveClientTab("serviceReport")}
              >
                Service Reports
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md ${activeClientTab === "salesReport"
                  ? "bg-[#0070F3] text-white"
                  : "text-[#666666] hover:text-[#333333]"
                  }`}
                onClick={() => setActiveClientTab("salesReport")}
              >
                Sales Report
              </button>

              <button
                className={`px-4 py-2 text-sm font-medium rounded-md ${activeClientTab === "invoice"
                  ? "bg-[#0070F3] text-white"
                  : "text-[#666666] hover:text-[#333333]"
                  }`}
                onClick={() => setActiveClientTab("invoice")}
              >
                Invoice
              </button>
            </div>

            <div className="mt-4">
              {activeClientTab === "serviceReport" && <Servicereport />}
              {activeClientTab === "salesReport" && <SalesReport />}
              {activeClientTab === "invoice" && <Invoicereport />}

            </div>
          </>
        }



      </div>
    </div>
  );
}
