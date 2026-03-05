"use client";

import { useState } from "react";

export default function UploadMeal() {
  const [file, setFile] = useState<File | null>(null);
  const [menu, setMenu] = useState("");
  const [message, setMessage] = useState("");

  const schoolId = "a833c50d-8faf-4706-8469-14d1920b3022"; // Replace

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("menu", menu);
    formData.append("schoolId", schoolId);

    const res = await fetch("/api/meals/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      setMessage("Meal uploaded successfully");
    } else {
      setMessage("Upload failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Upload Today's Meal</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter today's menu"
          value={menu}
          onChange={(e) => setMenu(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
        <br /><br />

        <button type="submit">Upload Meal</button>
      </form>

      <p>{message}</p>
    </div>
  );
}