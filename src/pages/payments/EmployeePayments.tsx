"use client";

import { useEffect, useRef, useState } from "react";
import { Filter } from "lucide-react";
import Payments from "../../components/payments/Payments";
import WithDrawals from "../../components/payments/WithDrawals";
import axios from "axios";
import PaymentFilters from "../../components/Filter/PaymentFilters";

export default function EmployeePayments() {
  const [activeTab, setActiveTab] = useState("payments");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLimitPopupOpen, setIsLimitPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
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
        <div className="flex justify-between border-b border-gray-400">
          <div className="flex items-center space-x-4">
            <button className="h-auto px-5 py-1 text-sm font-medium bg-black rounded-md text-[#fff] hover:text-[#fff] border-b-2 border-transparent hover:border-[#333333]">
              Workers
            </button>
            <button className="h-auto px-5 py-1 text-sm font-medium bg-gray-300 rounded-md text-[black] hover:text-[black] border-b-2 border-transparent hover:border-[#333333]">
              Clients
            </button>
          </div>
          <div className="p-4">
            <div>
              <div className="flex items-center justify-end gap-4">
                <button className="p-[14px] rounded-[26px] shadow-lg bg-dark hover:bg-slate-950" onClick={() => setIsLimitPopupOpen(!isLimitPopupOpen)}>
                  <Filter
                    className="w-[20px] h-[20px]"
                    color="#FFFFFF"
                    fill="#ffffff"
                  />
                </button>

                {isLimitPopupOpen && (
                  <div
                    ref={popupRef}
                    className="absolute right-[10%] top-[12%] mt-2 w-[25%] bg-white border rounded-[20px] shadow-lg  z-50"
                  >
                    <PaymentFilters />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "payments"
                ? "bg-[#0070F3] text-white"
                : "text-[#666666] hover:text-[#333333]"
            }`}
            onClick={() => setActiveTab("payments")}
          >
            Payments
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "withdrawals"
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
      </div>
    </div>
  );
}
