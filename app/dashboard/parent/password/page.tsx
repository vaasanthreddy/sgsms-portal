"use client";

import { useState } from "react";

export default function Password() {

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (password:string) => {
    const minLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);

    return minLength && hasNumber && hasUpper && hasSpecial;
  };

  const handleSubmit = () => {

    setError("");
    setMessage("");

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError("All fields are mandatory.");
      return;
    }

    if (!validatePassword(formData.newPassword)) {
      setError("Password must be minimum 8 characters and include uppercase, number and special character.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    setMessage("Password updated successfully.");
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">

      

      <div className="flex justify-center items-center p-10">

        <div className="bg-white border shadow-md rounded-lg p-8 w-full max-w-lg">

          <h2 className="text-lg font-semibold text-blue-800 mb-6">
            Update Account Password
          </h2>

          {/* CURRENT PASSWORD */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={formData.currentPassword}
              onChange={(e) =>
                setFormData({ ...formData, currentPassword: e.target.value })
              }
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* NEW PASSWORD */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          {/* SUCCESS MESSAGE */}
          {message && (
            <div className="bg-green-100 text-green-700 border border-green-300 p-3 rounded mb-4 text-sm">
              {message}
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-900 transition"
          >
            Update Password
          </button>

          {/* PASSWORD POLICY */}
          <div className="mt-6 text-xs text-gray-600">
            <p className="font-semibold mb-2">Password Policy:</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>Minimum 8 characters</li>
              <li>At least one uppercase letter</li>
              <li>At least one number</li>
              <li>At least one special character (!@#$%^&*)</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}