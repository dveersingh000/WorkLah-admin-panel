"use client";

import React, { useState } from "react";
import { ChevronDown, BanknoteIcon } from "lucide-react";

const transactionsData = [
  {
    id: "23244",
    name: "Tim Kimber",
    nric: "XXXXX4575",
    type: "Cash Out",
    date: "1 Jan, 2024",
    jobId: "",
    details: "Bonus",
    amount: -10,
    balance: 435,
    method: { type: "PAYNOW", description: "PayNow via Mobile" },
  },
  {
    id: "23224",
    name: "Sarina Iyne",
    nric: "XXXXX4565",
    type: "Cash In",
    date: "1 Jan, 2024",
    jobId: "#1234",
    details: "Bonus",
    amount: 10,
    balance: 430,
    method: null,
  },
  {
    id: "23214",
    name: "John Tyler",
    nric: "XXXXX4515",
    type: "Cash Out",
    date: "1 Jan, 2024",
    jobId: "#1234",
    details: "Penalty",
    amount: -20,
    balance: 230,
    method: null,
  },
  {
    id: "23214",
    name: "John Tyler",
    nric: "XXXXX4515",
    type: "Cash Out",
    date: "1 Jan, 2024",
    jobId: "",
    details: "Cashout",
    amount: -50,
    balance: 230,
    method: { type: "Another bank", description: "XXXX XXXX 3456" },
  },
];

export default function WithDrawals() {
  return (
    <div className="overflow-x-auto border rounded-lg bg-white">
      <table className="min-w-full divide-y divide-[#E5E5E5]">
        <thead>
          <tr className="border-b bg-gray-50 text-sm">
            <th className="px-4 py-3 text-left whitespace-nowrap">Id ↓</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Worker name</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">NRIC</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Cash In/Out</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Cash In/Out Date</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Job Id</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Cash In/Out Details</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Cash In/Out Amount</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Available Wallet Balance</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Cash Out Method</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {transactionsData.map((transaction, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-3 whitespace-nowrap">{transaction.id}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                    {transaction.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  {transaction.name}
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">{transaction.nric}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span
                  className={`rounded px-2 py-1 ${
                    transaction.type === "Cash In"
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {transaction.type}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">{transaction.date}</td>
              <td className="px-4 py-3 whitespace-nowrap">{transaction.jobId}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="relative inline-block text-left">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                  >
                    {transaction.details}
                    <ChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </td>
              <td
                className={`px-4 py-3 whitespace-nowrap ${
                  transaction.amount < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {transaction.amount < 0 ? "-" : "+"}$
                {Math.abs(transaction.amount)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">${transaction.balance}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                {transaction.method && (
                  <div className="flex items-center gap-1 text-gray-600">
                    {transaction.method.type === "PAYNOW" ? (
                      <span className="font-semibold text-purple-600">
                        {transaction.method.type}
                      </span>
                    ) : (
                      <BanknoteIcon className="h-4 w-4" />
                    )}
                    <span>
                      {transaction.method.type !== "PAYNOW" &&
                        transaction.method.type}
                    </span>
                    <span className="text-xs text-gray-500">
                      {transaction.method.description}
                    </span>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
