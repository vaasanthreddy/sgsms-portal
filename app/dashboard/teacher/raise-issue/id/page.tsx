"use client";

import { useParams } from "next/navigation";

export default function IssueDetailPage() {
  const params = useParams();

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow border">
      <h2 className="text-xl font-semibold mb-4">
        Complaint Details
      </h2>

      <p><strong>Complaint ID:</strong> {params.id}</p>
      <p>Status: Pending</p>
      <p>Description: (This would come from database in real backend)</p>
    </div>
  );
}
