"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Issue = {
  id: string;
  issueName: string;
  description: string;
  status: string;
  date: string;
  photo: string;
};

export default function RaiseIssuePage() {
  const router = useRouter();

  const [issueType, setIssueType] = useState("");
  const [customIssue, setCustomIssue] = useState("");
  const [description, setDescription] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState("");
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    setCurrentDate(new Date().toDateString());
    loadIssues();
  }, []);

  const generateIssueId = (count: number) => {
    const number = count + 1;
    return `SGSMS-2026-${number.toString().padStart(4, "0")}`;
  };

  const loadIssues = async () => {
    const res = await fetch("/api/issues");
    const data = await res.json();
    setIssues(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFile = e.target.files[0];

    if (!selectedFile.type.startsWith("image/")) {
      setPhotoError("Only image files allowed.");
      return;
    }

    const preview = URL.createObjectURL(selectedFile);
    setPhoto(preview);
    setFile(selectedFile);
    setPhotoError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!issueType || !description) {
      alert("Please fill required fields.");
      return;
    }

    if (!file) {
      setPhotoError("Photo is mandatory.");
      return;
    }

    const finalIssue =
      issueType === "Other" ? customIssue : issueType;

    const issueId = generateIssueId(issues.length);

    const formData = new FormData();

    formData.append("id", issueId);
    formData.append("issueName", finalIssue);
    formData.append("description", description);
    formData.append("date", currentDate);
    formData.append("photo", file);

    const res = await fetch("/api/issues", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      loadIssues();
    }

    setIssueType("");
    setCustomIssue("");
    setDescription("");
    setPhoto(null);
    setFile(null);
    setPhotoError("");
  };

  const generatePDF = (issue: Issue) => {
    const content = `
Complaint Receipt

Complaint ID: ${issue.id}
Issue: ${issue.issueName}
Status: ${issue.status}
Date: ${issue.date}

Description:
${issue.description}
    `;

    const blob = new Blob([content], { type: "application/pdf" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = `${issue.id}.pdf`;

    a.click();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">

      <div className="bg-white p-6 rounded shadow border">
        <h2 className="text-xl font-semibold mb-4">
          Raise Infrastructure / Meal Issue
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <select
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Issue</option>
            <option value="Food Quality">Food Quality</option>
            <option value="Water Supply">Water Supply</option>
            <option value="Infrastructure Damage">
              Infrastructure Damage
            </option>
            <option value="Other">Other</option>
          </select>

          {issueType === "Other" && (
            <input
              type="text"
              placeholder="Enter custom issue"
              value={customIssue}
              onChange={(e) => setCustomIssue(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          )}

          <textarea
            placeholder="Describe issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <div>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="block"
              required
            />

            {photoError && (
              <p className="text-red-600 text-sm mt-1">
                {photoError}
              </p>
            )}

            {photo && (
              <img
                src={photo}
                alt="Preview"
                className="w-32 h-32 object-cover border rounded mt-2"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Submit Issue
          </button>

        </form>
      </div>

      <div className="bg-white rounded shadow border">
        <div className="p-4 font-semibold border-b">
          Complaint History
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Issue</th>
              <th className="p-3 border">Photo</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td className="p-3 border">{issue.id}</td>

                <td className="p-3 border">{issue.issueName}</td>

                <td className="p-3 border text-center">
                  {issue.photo && (
                    <img
                      src={issue.photo}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  )}
                </td>

                <td className="p-3 border text-yellow-600">
                  {issue.status}
                </td>

                <td className="p-3 border space-x-2">

                  <button
                    onClick={() =>
                      router.push(
                        `/dashboard/teacher/raise-issue/${issue.id}`
                      )
                    }
                    className="text-blue-600 underline"
                  >
                    View
                  </button>

                  <button
                    onClick={() => generatePDF(issue)}
                    className="text-green-600 underline"
                  >
                    PDF
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}