"use client";

interface Payment {
    id: string;
    worker: {
        name: string;
        avatar: string;
        nric: string;
    };
    employer: {
        name: string;
        logo: string;
    };
    jobId: string;
    day: string;
    shiftDate: string;
    shiftId: string;
    timeIn: string;
    timeOut: string;
    clockedIn: string;
    clockedOut: string;
    breakTime: string;
    breakType: string;
    duration: string;
    totalWorkHour: string;
    rateType: string;
    payRate: string;
    penaltyAmount: string;
    totalAmount: string;
    status: "Rejected" | "Pending" | "Approved";
}

export default function Invoicereport() {
    const payments: Payment[] = [
        {
            id: "23244",
            worker: {
                name: "Tim Kimbor",
                avatar: "/assets/teamm1.svg",
                nric: "XXXXXX8575",
            },
            employer: {
                name: "RIGHT SERVICES PTE LTD",
                logo: "/assets/company.png",
            },
            jobId: "#1234",
            day: "Monday",
            shiftDate: "1 Jan, 2024",
            shiftId: "#12341",
            timeIn: "07:00 AM",
            timeOut: "11:00 AM",
            clockedIn: "07:00 AM",
            clockedOut: "11:00 AM",
            breakTime: "1 Hr",
            breakType: "Unpaid",
            duration: "4 Hrs",
            totalWorkHour: "3 Hrs",
            rateType: "Flat Rate",
            payRate: "$20/Hr",
            penaltyAmount: "-$5",
            totalAmount: "$55",
            status: "Rejected",
        },
        {
            id: "23224",
            worker: {
                name: "Sarina Jyne",
                avatar: "/assets/teamm2.svg",
                nric: "XXXXXX4565",
            },
            employer: {
                name: "RIGHT SERVICES PTE LTD",
                logo: "/assets/company.png",
            },
            jobId: "#1234",
            day: "Monday",
            shiftDate: "1 Jan, 2024",
            shiftId: "#12341",
            timeIn: "07:00 AM",
            timeOut: "11:00 AM",
            clockedIn: "07:00 AM",
            clockedOut: "11:00 AM",
            breakTime: "1 Hr",
            breakType: "Unpaid",
            duration: "4 Hrs",
            totalWorkHour: "3 Hrs",
            rateType: "Flat Rate",
            payRate: "$20/Hr",
            penaltyAmount: "-$4.8",
            totalAmount: "$55.2",
            status: "Pending",
        },
        {
            id: "23214",
            worker: {
                name: "John Tyler",
                avatar: "/assets/teamm3.svg",
                nric: "XXXXXX4595",
            },
            employer: {
                name: "RIGHT SERVICES PTE LTD",
                logo: "/assets/company.png",
            },
            jobId: "#1234",
            day: "Monday",
            shiftDate: "1 Jan, 2024",
            shiftId: "#12341",
            timeIn: "07:00 AM",
            timeOut: "11:00 AM",
            clockedIn: "07:15 AM",
            clockedOut: "11:00 AM",
            breakTime: "1 Hr",
            breakType: "Unpaid",
            duration: "4 Hrs",
            totalWorkHour: "3 Hrs",
            rateType: "Flat Rate",
            payRate: "$20/Hr",
            penaltyAmount: "-$8",
            totalAmount: "$52",
            status: "Approved",
        },
    ];

    return (
        <div className="overflow-x-auto border rounded-lg bg-white">
            <table className="min-w-full divide-y divide-[#E5E5E5]">
                <thead className="bg-[#F9FAFB]">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-[#D1D5DB] text-[#0070F3] focus:ring-[#0070F3]"
                            />
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center truncate text-xs font-medium text-[#6B7280] uppercase tracking-wider"
                        >
                            Id #
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center truncate text-xs font-medium text-[#6B7280] uppercase tracking-wider"
                        >
                            Employer
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center truncate text-xs font-medium text-[#6B7280] uppercase tracking-wider"
                        >
                            Invoice Period
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center truncate text-xs font-medium text-[#6B7280] uppercase tracking-wider"
                        >
                            Jobs Posted
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center truncate text-xs font-medium text-[#6B7280] uppercase tracking-wider"
                        >
                            Jobs Fulfilled
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center truncate text-xs font-medium text-[#6B7280] uppercase tracking-wider"
                        >
                            Fulfillment rate (%)
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center truncate text-xs font-medium text-[#6B7280] uppercase tracking-wider"
                        >
                            No. of Outlets
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center truncate text-xs font-medium text-[#6B7280] uppercase tracking-wider"
                        >
                            Hours Fulfilled
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center truncate text-xs font-medium text-[#6B7280] uppercase tracking-wider"
                        >
                            Total Hours
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center truncate text-xs font-medium text-[#6B7280] uppercase tracking-wider"
                        >
                            Subtotal
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center truncate text-xs font-medium text-[#6B7280] uppercase tracking-wider"
                        >
                            GST (8%)
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center truncate text-xs font-medium text-[#6B7280] uppercase tracking-wider"
                        >
                            GST (8%)
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center truncate text-xs font-medium text-[#6B7280] uppercase tracking-wider"
                        >
                            Download
                        </th>

                    </tr>
                </thead>
                <tbody className="bg-white">
                    {payments.map((payment) => (
                        <tr key={payment.id} className="hover:bg-[#F9FAFB]">
                            <td className="px-6 py-4 text-center truncate whitespace-nowrap">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-[#D1D5DB] text-[#0070F3] focus:ring-[#0070F3]"
                                />
                            </td>
                            <td className="px-6 py-4 text-center truncate whitespace-nowrap text-sm text-[#6B7280]">
                                {payment.id}
                            </td>
                            <td className="px-6 py-4 text-center truncate whitespace-nowrap w-max overflow-hidden">
                                <div className="flex items-center w-max bg-[#F6F6F6] rounded-full p-2">
                                    <div className="h-8 w-8 rounded-full overflow-hidden">
                                        <img
                                            alt={payment.worker.name}
                                            src={payment.worker.avatar}
                                            width={32}
                                            height={32}
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-[#111827]">
                                            {payment.worker.name}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-center truncate whitespace-nowrap text-sm text-[#6B7280]">
                                {payment.worker.nric}
                            </td>
                            <td className="px-6 py-4 text-center truncate whitespace-nowrap w-max overflow-hidden">
                                <div className="flex items-center w-max">
                                    <img
                                        alt={payment.employer.name}
                                        src={payment.employer.logo}
                                        width={32}
                                        height={32}
                                        className="h-8 w-8 rounded"
                                    />
                                    <div className="ml-4 text-left">
                                        <div className="text-[12px] font-medium text-[#111827]">
                                            {payment.employer.name}
                                        </div>
                                        <div className="text-[10px] font-medium text-[#111827]">
                                            <a href="#" className="text-blue-400 underline">View Employer</a>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-center truncate whitespace-nowrap text-sm text-[#6B7280]">
                                {payment.jobId}
                            </td>
                            <td className="px-6 py-4 text-center truncate whitespace-nowrap text-sm text-[#6B7280]">
                                {payment.day}
                            </td>
                            <td className="px-6 py-4 text-center truncate whitespace-nowrap text-sm text-[#6B7280]">
                                {payment.shiftDate}
                            </td>
                            <td className="px-6 py-4 text-center truncate whitespace-nowrap text-sm text-[#6B7280]">
                                {payment.shiftId}
                            </td>
                            <td className="px-6 py-4 text-center truncate whitespace-nowrap text-sm text-[#6B7280]">
                                {payment.timeIn}
                            </td>
                            <td className="px-6 py-4 text-center truncate whitespace-nowrap text-sm text-[#6B7280]">
                                {payment.timeOut}
                            </td>
                            <td className="px-6 py-4 text-center truncate whitespace-nowrap text-sm text-[#6B7280]">
                                {payment.clockedIn}
                            </td>
                            <td className="px-6 py-4 text-center truncate whitespace-nowrap text-sm text-[#6B7280]">
                                {payment.clockedOut}
                            </td>
                            <td className="px-6 py-4 text-center truncate whitespace-nowrap text-sm text-[#6B7280]">
                                {payment.breakTime}
                            </td>


                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
