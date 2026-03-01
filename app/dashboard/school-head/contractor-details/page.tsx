"use client";

import { useState } from "react";

export default function ContractorDetailsPage() {

  const [contractorId, setContractorId] = useState("");
  const [contractorData, setContractorData] = useState<any>(null);

  // ✅ SAMPLE CONTRACTOR DATABASE
  const contractorsDB: any = {
    CON101: {
      name: "Sri Sai Catering Services",
      contractorId: "CON101",
      contractStart: "01-04-2025",
      contractEnd: "31-03-2026",
      supplyingMeals: "Breakfast, Lunch, Snacks, Dinner",
      totalStudentsCovered: 520,
      kitchenLocation: "Hyderabad",
      hygieneRating: "A Grade",
      contactPerson: "Mr. Raghav",
      phone: "9876543210",
      email: "srisai.catering@gmail.com",
      address: "Plot No 12, Madhapur, Hyderabad"
    }
  };

  const handleSearch = () => {
    const trimmedId = contractorId.trim();

    if (contractorsDB[trimmedId]) {
      setContractorData(contractorsDB[trimmedId]);
    } else {
      alert("Contractor not found");
      setContractorData(null);
    }
  };

  const exportPDF = () => {
    window.print();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Contractor Details
      </h1>

      {/* 🔍 Search Section */}
      <div className="bg-white shadow p-6 rounded mb-6 flex items-center gap-4">
        <input
          type="text"
          placeholder="Enter Contractor ID (Example: CON101)"
          value={contractorId}
          onChange={(e) => setContractorId(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-900 text-white px-6 py-2 rounded"
        >
          Search
        </button>
      </div>

      {contractorData && (
        <>
          {/* 🏢 Contractor Information */}
          <div className="bg-white shadow p-6 rounded mb-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              Basic Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div><strong>Contractor Name:</strong> {contractorData.name}</div>
              <div><strong>Contractor ID:</strong> {contractorData.contractorId}</div>
              <div><strong>Contract Start Date:</strong> {contractorData.contractStart}</div>
              <div><strong>Contract End Date:</strong> {contractorData.contractEnd}</div>
              <div><strong>Supplying Meals:</strong> {contractorData.supplyingMeals}</div>
              <div><strong>Total Students Covered:</strong> {contractorData.totalStudentsCovered}</div>
              <div><strong>Kitchen Location:</strong> {contractorData.kitchenLocation}</div>
              <div><strong>Hygiene Rating:</strong> {contractorData.hygieneRating}</div>
            </div>
          </div>

          {/* 📞 Contact Details */}
          <div className="bg-white shadow p-6 rounded mb-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              Contact Details
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div><strong>Contact Person:</strong> {contractorData.contactPerson}</div>
              <div><strong>Phone:</strong> {contractorData.phone}</div>
              <div><strong>Email:</strong> {contractorData.email}</div>
              <div><strong>Address:</strong> {contractorData.address}</div>
            </div>
          </div>

          {/* 📊 Performance Section */}
          <div className="bg-white shadow p-6 rounded mb-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              Performance Overview
            </h2>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-green-100 p-4 rounded shadow">
                <div className="text-2xl font-bold text-green-700">
                  98%
                </div>
                <div>On-Time Delivery</div>
              </div>

              <div className="bg-blue-100 p-4 rounded shadow">
                <div className="text-2xl font-bold text-blue-700">
                  0
                </div>
                <div>Pending Complaints</div>
              </div>

              <div className="bg-yellow-100 p-4 rounded shadow">
                <div className="text-2xl font-bold text-yellow-700">
                  4.8 / 5
                </div>
                <div>Feedback Rating</div>
              </div>
            </div>
          </div>

          {/* Export Button */}
          <div className="text-right">
            <button
              onClick={exportPDF}
              className="bg-blue-900 text-white px-6 py-2 rounded"
            >
              Export PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
}