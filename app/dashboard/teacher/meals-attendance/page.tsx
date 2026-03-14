"use client";

import { useState, useRef, useEffect } from "react";

export default function SmartAttendanceSystem() {
  /* =============================
   MEAL SYSTEM
============================== */

const DEV_MODE = true; // set false in production

const mealTimings = {
  Breakfast: { start: 7, end: 10 },
  Lunch: { start: 12, end: 14.5 },
  Snacks: { start: 16, end: 17.5 },
  Dinner: { start: 19, end: 21 },
};

const getCurrentMeal = () => {
  const now = new Date();
  const hour = now.getHours() + now.getMinutes() / 60;

  for (const meal in mealTimings) {
    const { start, end } = mealTimings[meal as keyof typeof mealTimings];
    if (hour >= start && hour <= end) return meal;
  }

  return "No Active Meal";
};

const [manualMeal, setManualMeal] = useState("Breakfast");
const activeMeal = DEV_MODE ? manualMeal : getCurrentMeal();

  const [attendance, setAttendance] = useState<{ [key: string]: string }>({});

  const markAttendance = (studentId: number, status: string) => {
    if (locked) return;

    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));

    // also update students array (so submit validation works properly)
   setStudents(prev =>
  prev.map(s =>
    s.id === studentId ? { ...s, status } : s
  )
);
  };

  /* =============================
     CLASS STRUCTURE
  ============================== */
 const classStrength: Record<string, number> = {
  "LKG": 25,
  "UKG": 28,
  "1st": 40,
  "2nd": 38,
  "3rd": 42,
  "4th": 35,
  "5th": 37,
  "6th": 45,
  "7th": 41,
  "8th": 44,
  "9th": 36,
  "10th": 30
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
  const savedClass = localStorage.getItem("selectedClass")

  if(savedClass){
    loadClass(savedClass)
  }
},[])

  useEffect(() => {
  const savedClass = localStorage.getItem("selectedClass");
  if(savedClass){
    loadClass(savedClass);
  }
}, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      });
    });
  }, []);
  const getStorageKey = (cls: string, meal: string) =>
  `attendance_${cls}_${meal}`;

const restoreSavedData = (cls: string, meal: string) => {
  const key = getStorageKey(cls, meal);
  const saved = localStorage.getItem(key);

  if (!saved) return;

  const parsed = JSON.parse(saved);
  const twoHours = 2 * 60 * 60 * 1000;

  if (Date.now() - parsed.timestamp < twoHours) {
   // only restore attendance

  setAttendance(parsed.attendance)
setLocked(true)
setSubmitted(true)

loadClass(cls)   // reload student list to reflect attendance status
  } else {
    localStorage.removeItem(key);
  }
};


  /* =============================
     LOAD CLASS
  ============================== */
  const loadClass = async (cls: string) => {

    localStorage.setItem("selectedClass", cls);

  setSelectedClass(cls);
  setClassSelected(true);
  setLocked(false);
  setSubmitted(false);
  setAttendance({});

  const res = await fetch(`/api/students?class=${cls}`)

if(!res.ok){
  console.error("Students API failed")
  return
}

const data = await res.json()

const studentsArray = Array.isArray(data) ? data : data.students || []

const formatted = studentsArray.map((s:any)=>({
  id:s.id,
  name:s.name,
  status:""
}))

  setStudents(formatted);

setTimeout(() => {
  loadAttendanceForMeal(cls, activeMeal);
}, 100);

  restoreSavedData(cls, activeMeal);
};
const loadAttendance = async (cls: string, meal: string) => {

  const today = new Date().toISOString().split("T")[0];
const res = await fetch(`/api/attendance?class=${cls}&meal=${meal}&date=${today}`);
  const data = await res.json();

  if (!data || data.length === 0) {
    setLocked(false);
    setSubmitted(false);
    setAttendance({});
    return;
  }

  const map: any = {};

  data.forEach((a: any) => {
    map[a.studentId] = a.status;
  });

  setAttendance(map);
  setLocked(true);
  setSubmitted(true);
};
const loadAttendanceForMeal = async (cls: string, meal: string) => {

  const today = new Date().toISOString().split("T")[0];
const res = await fetch(`/api/attendance?class=${cls}&meal=${meal}&date=${today}`);

 if (!res.ok) {
  const err = await res.text();
  console.error("API Error:", err);
  return;
}

  const text = await res.text();

  if (!text) {
    console.warn("Empty response from API");
    return;
  }

  const data = JSON.parse(text);

  if (data && data.length > 0) {
    const updatedStudents = students.map((s) => {
      const record = data.find((a: any) => a.studentId === s.id);

      return {
        ...s,
        status: record ? record.status : "",
        photo: record ? record.photo : null,
      };
    });

    setStudents(updatedStudents);

    const attendanceMap: any = {};
    data.forEach((a: any) => {
      attendanceMap[a.studentId] = a.status;
    });

    setAttendance(attendanceMap);
  } else {
    setAttendance({});
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        status: "",
        photo: null,
      }))
    );
  }
};
  /* =============================
     CAMERA FUNCTIONS
  ============================== */
  const startCamera = async (index: number) => {
    try {
      setCameraIndex(index);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Camera permission denied");
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || cameraIndex === null) return;

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
    updated[cameraIndex].photo = image;
    setStudents(updated);

    stopCamera();
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setCameraIndex(null);
  };

  /* =============================
     SUBMIT FUNCTION
  ============================== */
  const handleSubmit = async () => {
    if (submitted) {
      alert("Attendance already submitted.");
      return;
    }

    for (let s of students) {
      if (!attendance[s.id]) {
        alert("Mark attendance for all students.");
        return;
      }
      if (attendance[s.id] === "Present" && !s.photo) {
        alert(`Photo required for ${s.name}`);
        return;
      }
    }

   try {

  const photos: any = {}

  students.forEach((s) => {
    if (s.photo) {
      photos[s.id] = s.photo
    }
  })

  const res = await fetch("/api/attendance/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      className: selectedClass,
      meal: activeMeal,
      students,
      attendance,
      photos,
      userId: null
    })
  })

  // safer parsing
 let data:any = {}

try{
  data = await res.json()
}catch(err){
  console.error("Invalid JSON response")
}
  if (res.ok && data.success) {

    const key = getStorageKey(selectedClass, activeMeal)

   localStorage.setItem(
  key,
  JSON.stringify({
    attendance,
    timestamp: Date.now()
  })
)

    setLocked(true)
    setSubmitted(true)

    alert("Attendance Saved to Database Successfully")

  } else {

    console.error("Save error response:", data)
    alert("Failed to save attendance")

  }

} catch (error) {

  console.error("Submit error:", error)
  alert("Server error")

}
  };
  const presentCount = students.filter(s => attendance[s.id] === "Present").length;

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
   STORAGE HELPERS
============================== */

  /* =============================
     MAIN LAYOUT
  ============================== */
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">
            Smart Government Meals Attendance
          </h1>
          <div className="mb-4">
  <h2 className="text-lg font-semibold">
    {selectedClass} - {activeMeal}
  </h2>

  {DEV_MODE && (
<select
  value={manualMeal}
  onChange={(e) => {
    const meal = e.target.value;

    setManualMeal(meal);

    // RESET PAGE FOR NEW MEAL
    setLocked(false);
    setSubmitted(false);
    setAttendance({});

    // reset student status & photos
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        status: "",
        photo: null,
      }))
    );

    // load attendance for this meal
    loadAttendanceForMeal(selectedClass, meal);
  }}
>
      <option>Breakfast</option>
      <option>Lunch</option>
      <option>Snacks</option>
      <option>Dinner</option>
    </select>
  )}
</div>

          <button
            onClick={() => setClassSelected(false)}
            className="bg-gray-300 px-4 py-1 rounded"
          >
            Change Class
          </button>
        </div>

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
                      onClick={() => markAttendance(s.id, "Present")}
                      className={`px-3 py-1 rounded mr-2 ${
                        attendance[s.id] === "Present"
                          ? "bg-green-600 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      Present
                    </button>

                    <button
                      onClick={() => markAttendance(s.id, "Absent")}
                      className={`px-3 py-1 rounded ${
                        attendance[s.id] === "Absent"
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
                        disabled={attendance[s.id] !== "Present"}
                        onClick={() => startCamera(i)}
                        className={`px-3 py-1 rounded text-white ${
                          attendance[s.id] === "Present"
                            ? "bg-blue-600"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
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
  className={`px-6 py-2 rounded mt-4 text-white ${
    submitted ? "bg-green-600" : "bg-blue-700"
  }`}
>
  {submitted ? "Attendance Submitted" : "Submit"}
</button>

      </div>

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
                onClick={stopCamera}
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