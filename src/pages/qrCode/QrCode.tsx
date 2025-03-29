import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeManagement: React.FC = () => {
  const employees = [
    {
      id: "3432",
      qrStatus: "Generated",
      name: "RIGHT SERVICE PTE. LTD.",
      industry: "Hotel",
      outlet: "Domino's",
      shifts: 3,
      jobDate: "11 Sept, 24",
      firstShift: "07:00 AM - 11:00 AM",
      jobStatus: "Upcoming",
    },
    {
      id: "3433",
      qrStatus: "Sent",
      name: "XYZ SERVICE LTD.",
      industry: "Retail",
      outlet: "McDonald's",
      shifts: 2,
      jobDate: "12 Sept, 24",
      firstShift: "08:00 AM - 12:00 PM",
      jobStatus: "Active",
    },
  ];

  // State to track selected employee
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);
  
  // Ref for the QR Code
  const qrRef = useRef<HTMLDivElement>(null);

  // Function to download the QR Code as an image
  const downloadQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        const url = canvas.toDataURL("image/png"); // Convert canvas to image URL
        const a = document.createElement("a");
        a.href = url;
        a.download = `QR_${selectedEmployee.id}.png`; // Set filename
        a.click();
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">QR Code Management</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Employer Id</th>
              <th className="border p-2">QR Code Status</th>
              <th className="border p-2">QR Code</th>
              <th className="border p-2">Employer Name</th>
              <th className="border p-2">Industry</th>
              <th className="border p-2">Job Date</th>
              <th className="border p-2">First Shift</th>
              <th className="border p-2">Job Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              const qrData = JSON.stringify(employee); // Store all details in QR code

              return (
                <tr
                  key={employee.id}
                  className={`text-center cursor-pointer ${
                    selectedEmployee.id === employee.id ? "bg-gray-200" : ""
                  }`}
                  onClick={() => setSelectedEmployee(employee)}
                >
                  <td className="border p-2">#{employee.id}</td>
                  <td className="border p-2 text-blue-500">{employee.qrStatus}</td>
                  <td className="border p-2">
                    <QRCodeCanvas value={qrData} size={50} />
                  </td>
                  <td className="border p-2">{employee.name}</td>
                  <td className="border p-2">{employee.industry}</td>
                  <td className="border p-2">{employee.jobDate}</td>
                  <td className="border p-2">{employee.firstShift}</td>
                  <td
                    className={`border p-2 ${
                      employee.jobStatus === "Active" ? "text-green-500" : "text-orange-500"
                    }`}
                  >
                    {employee.jobStatus}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* QR Code Details Card (Updates When Row is Clicked) */}
      <div className="mt-6 bg-white p-4 shadow-md rounded-lg w-96 mx-auto">
        <div className="flex justify-center mb-4" ref={qrRef}>
          <QRCodeCanvas value={JSON.stringify(selectedEmployee)} size={150} />
        </div>
        <p className="text-center font-semibold">{selectedEmployee.name}</p>
        <p className="text-center text-gray-600">Industry: {selectedEmployee.industry}</p>
        <p className="text-center text-gray-600">Date: {selectedEmployee.jobDate}</p>
        <p className="text-center text-gray-600">Shifts: {selectedEmployee.shifts}</p>
        <p className="text-center text-gray-600">First Shift: {selectedEmployee.firstShift}</p>
        <p className="text-center text-gray-600">Job Status: {selectedEmployee.jobStatus}</p>
        
        {/* Button to download QR code */}
        <button
          className="mt-4 bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
          onClick={downloadQRCode}
        >
          Download QR
        </button>
      </div>
    </div>
  );
};

export default QRCodeManagement;
