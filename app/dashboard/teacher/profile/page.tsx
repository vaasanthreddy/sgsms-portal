"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [profile, setProfile] = useState({
    name: "K S Vaasaanth Reddy",
    email: "teacher@sgsms.gov.in",
    phone: "9876543210",
    designation: "Government School Teacher",
    school: "Smart Government High School",
    district: "Hyderabad",
    state: "Telangana",
    employeeId: "TCH-2026-001",
    aadhaarVerified: true,
  });

  const handleChange = (e: any) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      <h1 className="text-2xl font-semibold">
        Teacher Profile
      </h1>

      {/* PROFILE CARD */}
      <div className="bg-white shadow border rounded-lg p-8">

        <div className="flex flex-col md:flex-row gap-10">

          {/* PHOTO SECTION */}
          <div className="flex flex-col items-center">
            <div className="w-36 h-36 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-500 text-4xl">👤</span>
              )}
            </div>

            <label className="mt-4 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer text-sm">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </label>

            {profile.aadhaarVerified && (
              <div className="mt-3 text-green-600 text-sm font-medium">
                ✔ Aadhaar Verified
              </div>
            )}
          </div>

          {/* DETAILS SECTION */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">

            {[
              { label: "Full Name", name: "name" },
              { label: "Email", name: "email" },
              { label: "Phone", name: "phone" },
              { label: "Designation", name: "designation" },
              { label: "School Name", name: "school" },
              { label: "District", name: "district" },
              { label: "State", name: "state" },
              { label: "Employee ID", name: "employeeId" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium mb-1">
                  {field.label}
                </label>

                <input
                  type="text"
                  name={field.name}
                  value={(profile as any)[field.name]}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border p-2 rounded ${
                    editMode ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
            ))}

          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex gap-4">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={() => setEditMode(false)}
                className="bg-green-600 text-white px-6 py-2 rounded"
              >
                Save Changes
              </button>

              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* CHANGE PASSWORD SECTION */}
      <div className="bg-white shadow border rounded-lg p-8">

        <h2 className="text-lg font-semibold mb-6">
          Change Password
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <input
            type="password"
            placeholder="Current Password"
            className="border p-2 rounded"
          />

          <input
            type="password"
            placeholder="New Password"
            className="border p-2 rounded"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            className="border p-2 rounded"
          />
        </div>

        <button className="mt-6 bg-red-600 text-white px-6 py-2 rounded">
          Update Password
        </button>
      </div>

      {/* DOWNLOAD PROFILE PDF */}
      <div className="bg-white shadow border rounded-lg p-8 text-center">
        <button
          onClick={() => window.print()}
          className="bg-indigo-600 text-white px-6 py-2 rounded"
        >
          Download Profile PDF
        </button>
      </div>

    </div>
  );
}
