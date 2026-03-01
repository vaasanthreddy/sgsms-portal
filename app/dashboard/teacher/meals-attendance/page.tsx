"use client";

import { useState, useRef, useEffect } from "react";

export default function SmartAttendanceSystem() {

  /* =============================
     CLASS STRUCTURE
  ============================== */
  const classStrength: Record<string, number> = {
    "LKG": 25,
    "UKG": 28,
    "First Class": 40,
    "Second Class": 38,
    "Third Class": 42,
    "Fourth Class": 35,
    "Fifth Class": 37,
    "Sixth Class A": 45,
    "Sixth Class B": 43,
    "Seventh Class A": 41,
    "Seventh Class B": 39,
    "Eighth Class A": 44,
    "Eighth Class B": 42,
    "Ninth Class A": 36,
    "Ninth Class B": 34,
    "Tenth Class A": 30,
    "Tenth Class B": 29
  };

  const [selectedClass, setSelectedClass] = useState("");
  const [classSelected, setClassSelected] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [locked, setLocked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);

  /* =============================
     CAMERA + GEO
  ============================== */
  const [cameraIndex, setCameraIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [location, setLocation] = useState<{lat:number, lng:number} | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      });
    });
  }, []);

  /* =============================
     LOAD CLASS
  ============================== */
  const loadClass = (cls: string) => {
    setSelectedClass(cls);
    setClassSelected(true);
    setLocked(false);
    setSubmitted(false);

    const count = classStrength[cls];

    const generated = Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `Student ${i + 1}`,
      status: "",
      photo: null
    }));

    setStudents(generated);
  };

  /* =============================
     UPDATE STATUS
  ============================== */
  const updateStatus = (index: number, value: string) => {
    if (locked) return;
    const updated = [...students];
    updated[index].status = value;
    setStudents(updated);
  };

  /* =============================
     CAMERA FUNCTIONS
  ============================== */
  const startCamera = async (index: number) => {
    setCameraIndex(index);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) videoRef.current.srcObject = stream;
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");

    ctx?.drawImage(video, 0, 0);

    ctx!.fillStyle = "white";
    ctx!.font = "14px Arial";
    ctx!.fillText(
      `Time: ${new Date().toLocaleString()}`,
      10,
      canvas.height - 30
    );

    if (location) {
      ctx!.fillText(
        `Geo: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`,
        10,
        canvas.height - 10
      );
    }

    const image = canvas.toDataURL("image/png");

    const updated = [...students];
    updated[cameraIndex!].photo = image;
    setStudents(updated);

    const stream = video.srcObject as MediaStream;
    stream.getTracks().forEach(track => track.stop());

    setCameraIndex(null);
  };

  /* =============================
     SUBMIT FUNCTION
  ============================== */
  const handleSubmit = () => {
    if (submitted) {
      alert("Attendance already submitted.");
      return;
    }

    for (let s of students) {
      if (!s.status) {
        alert("Mark attendance for all students.");
        return;
      }
      if (s.status === "Absent" && !s.photo) {
        alert(`Photo required for ${s.name}`);
        return;
      }
    }

    const record = {
      class: selectedClass,
      date: new Date().toLocaleString(),
      present: students.filter(s => s.status === "Present").length,
      absent: students.filter(s => s.status === "Absent").length,
      total: students.length
    };

    setAttendanceHistory(prev => [...prev, record]);

    setLocked(true);
    setSubmitted(true);
    alert("Attendance Submitted Successfully.");
  };

  const presentCount = students.filter(s => s.status === "Present").length;
  const percentage = selectedClass
    ? ((presentCount / classStrength[selectedClass]) * 100).toFixed(2)
    : 0;

  /* =============================
     FIRST SCREEN
  ============================== */
  if (!classSelected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow w-96">
          <h2 className="text-xl font-bold mb-4 text-center">
            Select Class to Begin
          </h2>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {Object.keys(classStrength).map(cls => (
              <button
                key={cls}
                onClick={() => loadClass(cls)}
                className="w-full bg-blue-700 text-white py-2 rounded"
              >
                {cls}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* =============================
     MAIN LAYOUT
  ============================== */
  return (
    <div className="flex min-h-screen bg-gray-100">

      

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">
            Smart Government Meals Attendance
          </h1>

          <button
            onClick={() => setClassSelected(false)}
            className="bg-gray-300 px-4 py-1 rounded"
          >
            Change Class
          </button>
        </div>

        {/* DISTRICT MONITOR VIEW */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded shadow text-center">
            <div>Total Students</div>
            <div className="text-xl font-bold">{students.length}</div>
          </div>
          <div className="bg-green-100 p-4 rounded shadow text-center">
            <div>Present</div>
            <div className="text-xl font-bold text-green-700">{presentCount}</div>
          </div>
          <div className="bg-red-100 p-4 rounded shadow text-center">
            <div>Absent</div>
            <div className="text-xl font-bold text-red-700">
              {students.length - presentCount}
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white shadow rounded p-4 overflow-x-auto">
          <table className="w-full border text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">S.No</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Attendance</th>
                <th className="border p-2">Photo</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={s.id}>
                  <td className="border p-2">{s.id}</td>
                  <td className="border p-2 text-left px-4">{s.name}</td>
                  <td className="border p-2">
                    <button
                      disabled={locked}
                      onClick={() => updateStatus(i, "Present")}
                      className={`px-2 py-1 rounded ${
                        s.status === "Present"
                          ? "bg-green-600 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      Present
                    </button>
                    <button
                      disabled={locked}
                      onClick={() => updateStatus(i, "Absent")}
                      className={`px-2 py-1 ml-2 rounded ${
                        s.status === "Absent"
                          ? "bg-red-600 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      Absent
                    </button>
                  </td>
                  <td className="border p-2">
                    {s.photo ? (
                      <img src={s.photo} className="w-16 mx-auto" />
                    ) : (
                      <button
                        disabled={locked}
                        onClick={() => startCamera(i)}
                        className="bg-blue-600 text-white px-2 py-1 rounded"
                      >
                        Open Camera
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={handleSubmit}
          disabled={locked}
          className="bg-blue-700 text-white px-6 py-2 rounded mt-4"
        >
          Submit
        </button>

        <button
          onClick={() => window.print()}
          className="bg-gray-700 text-white px-6 py-2 rounded mt-4 ml-3"
        >
          Export Report (PDF)
        </button>

        {/* HISTORY PANEL */}
        {attendanceHistory.length > 0 && (
          <div className="mt-8 bg-white shadow rounded p-4">
            <h2 className="text-lg font-bold mb-3">
              Attendance History
            </h2>

            <table className="w-full border text-center">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">Class</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Present</th>
                  <th className="border p-2">Absent</th>
                  <th className="border p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {attendanceHistory.map((rec, i) => (
                  <tr key={i}>
                    <td className="border p-2">{rec.class}</td>
                    <td className="border p-2">{rec.date}</td>
                    <td className="border p-2 text-green-600">{rec.present}</td>
                    <td className="border p-2 text-red-600">{rec.absent}</td>
                    <td className="border p-2">{rec.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* CAMERA MODAL */}
      {cameraIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <video ref={videoRef} autoPlay className="w-72 h-56 border"></video>
            <canvas ref={canvasRef} className="hidden"></canvas>
            <div className="flex justify-between mt-3">
              <button
                onClick={capturePhoto}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Capture
              </button>
              <button
                onClick={() => setCameraIndex(null)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
