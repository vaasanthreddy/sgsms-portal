"use client";
import { useState, ChangeEvent, DragEvent } from "react";

export default function SchoolHeadProfile() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [formData, setFormData] = useState<Record<string, string>>({
    employeeId: "SHD10234",
    aadhaar: "XXXX-XXXX-4521",
    mobile: "+91 9876543210",
    email: "headmaster@school.gov.in",
    dob: "12 June 1975",
    gender: "Male",
    bloodGroup: "B+",
    joining: "15 July 2004",
    service: "21 Years",
    qualification: "M.Ed, B.Ed, M.A (English)",
    district: "Hyderabad",
    mandala: "Secunderabad",
    schoolName: "ZPHS Government School",
    schoolCode: "HYD-ZPHS-1023",
    schoolType: "Government High School",
    students: "1248",
    teachers: "38",
    classrooms: "24",
    established: "1985",
    category: "Co-Education",
    medium: "English & Telugu",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  function renderField(label: string, name: string) {
    return (
      <div>
        <label className="font-semibold text-gray-700">{label}</label>
        {isEditing ? (
          <input
            type="text"
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-2"
          />
        ) : (
          <p className="bg-gray-100 p-3 rounded mt-2 text-gray-800">
            {formData[name]}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-10">

        {/* ================= ADMINISTRATIVE SUMMARY ================= */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Administrative Summary
          </h2>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-gray-700 leading-relaxed">
            K S Vaasanth Reddy oversees academic planning, staff supervision,
            student performance monitoring, financial approvals, compliance
            reporting, and implementation of government educational policies.
          </div>
        </div>

        {/* ================= PROFILE SECTION ================= */}
        <div className="flex flex-col lg:flex-row gap-10 border-b pb-10">

          <div className="flex flex-col items-center">
            <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-blue-900 shadow-lg">
              <img
                src={profileImage ?? "https://via.placeholder.com/300"}
                alt="School Head"
                className="w-full h-full object-cover"
              />
            </div>

            <label className="mt-5 bg-blue-900 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-blue-800">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-bold text-blue-900">
              K S Vaasanth Reddy
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Head Master / School Head
            </p>
          </div>
        </div>

        {/* ================= PERSONAL DETAILS ================= */}
        <SectionTitle title="Personal Information" />
        <div className="grid md:grid-cols-2 gap-6">
          {renderField("Employee ID", "employeeId")}
          {renderField("Aadhaar Number", "aadhaar")}
          {renderField("Mobile Number", "mobile")}
          {renderField("Email Address", "email")}
          {renderField("Date of Birth", "dob")}
          {renderField("Gender", "gender")}
          {renderField("Blood Group", "bloodGroup")}
          {renderField("Date of Joining", "joining")}
          {renderField("Years of Service", "service")}
          {renderField("Qualification", "qualification")}
          {renderField("District", "district")}
          {renderField("Mandala", "mandala")}
        </div>

        {/* ================= SCHOOL INFO ================= */}
        <SectionTitle title="School Information" />
        <div className="grid md:grid-cols-3 gap-6">
          {renderField("School Name", "schoolName")}
          {renderField("School Code", "schoolCode")}
          {renderField("School Type", "schoolType")}
          {renderField("Total Students", "students")}
          {renderField("Total Teachers", "teachers")}
          {renderField("Total Classrooms", "classrooms")}
          {renderField("Established Year", "established")}
          {renderField("School Category", "category")}
          {renderField("Medium of Instruction", "medium")}
        </div>

        <AchievementsSection />
        <DocumentUploadSection />

        <div className="mt-12">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800"
          >
            {isEditing ? "Save Profile" : "Edit Profile"}
          </button>
        </div>

      </div>
    </div>
  );
}

/* ================= SECTION TITLE ================= */
function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-2xl font-bold text-blue-900 mt-12 mb-6">
      {title}
    </h2>
  );
}

/* ================= ACHIEVEMENTS ================= */
function AchievementsSection() {
  const [achievements, setAchievements] = useState<string[]>([
    "Best Headmaster Award - District Level (2022)",
    "Improved School Pass Percentage to 98%",
  ]);
  const [newAchievement, setNewAchievement] = useState<string>("");

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setAchievements([...achievements, newAchievement]);
      setNewAchievement("");
    }
  };

  const deleteAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">
        Achievements & Recognitions
      </h2>

      <div className="space-y-4">
        {achievements.map((ach, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded shadow flex justify-between items-center">
            <span>🏆 {ach}</span>
            <button onClick={() => deleteAchievement(index)} className="text-red-600">
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <input
          type="text"
          value={newAchievement}
          onChange={(e) => setNewAchievement(e.target.value)}
          placeholder="Add new achievement"
          className="flex-1 border p-2 rounded"
        />
        <button onClick={addAchievement} className="bg-blue-900 text-white px-4 rounded">
          Add
        </button>
      </div>
    </div>
  );
}

/* ================= DOCUMENT UPLOAD ================= */
function DocumentUploadSection() {
  const [documents, setDocuments] = useState<{ name: string; url: string }[]>([]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newDocs = Array.from(files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setDocuments([...documents, ...newDocs]);
  };

  const deleteDoc = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">
        Official Documents
      </h2>

      <div
        className="bg-gray-50 p-6 rounded-lg shadow border-2 border-dashed border-blue-900"
        onDragOver={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}
        onDrop={(e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
      >
        <p className="text-gray-500 mb-4">
          Drag & Drop Documents Here or Upload
        </p>

        <label className="bg-blue-900 text-white px-4 py-2 rounded cursor-pointer">
          Upload Documents
          <input
            type="file"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
        </label>
      </div>

      <div className="mt-6 space-y-3">
        {documents.map((doc, index) => (
          <div key={index} className="bg-white p-4 rounded shadow flex justify-between">
            <span>{doc.name}</span>
            <button onClick={() => deleteDoc(index)} className="text-red-600">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}