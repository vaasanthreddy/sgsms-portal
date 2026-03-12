"use client";

import { useState, useRef } from "react";
import { useEffect } from "react";



export default function TodayMealsPage() {
useEffect(() => {

  async function loadTodayPhotos(){

    const res = await fetch("/api/meals/today");
    const data = await res.json();

    const formatted:any = {};
    const submitted:any = {};

    data.forEach((row:any)=>{

      if(!formatted[row.mealType]){
        formatted[row.mealType] = {};
      }

      formatted[row.mealType][row.itemName] = row.photoUrl;

      submitted[row.mealType] = true;

    });

    setMealPhotos(formatted);
    setSubmittedMeals(submitted);

  }

  loadTodayPhotos();

},[]);
  // 🔵 FULL WEEKLY MENU
  const weeklyMenu = {
    Monday: {
      Breakfast: ["Idli", "Sambar", "Coconut Chutney"],
      Lunch: ["Rice", "Dal", "Vegetable Curry", "Curd"],
      Snacks: ["Banana", "Milk"],
      Dinner: ["Chapati", "Egg Curry / Veg Kurma"]
    },
    Tuesday: {
      Breakfast: ["Upma", "Peanut Chutney"],
      Lunch: ["Sambar Rice", "Beans Poriyal", "Buttermilk"],
      Snacks: ["Groundnut Chikki"],
      Dinner: ["Vegetable Pulao", "Raita"]
    },
    Wednesday: {
      Breakfast: ["Dosa", "Tomato Chutney"],
      Lunch: ["Khichdi", "Boiled Egg / Sprouts Salad"],
      Snacks: ["Boiled Corn"],
      Dinner: ["Rice", "Dal Fry", "Cabbage Curry"]
    },
    Thursday: {
      Breakfast: ["Pongal", "Sambar"],
      Lunch: ["Rice", "Rajma Curry", "Carrot Poriyal"],
      Snacks: ["Milk & Biscuit"],
      Dinner: ["Chapati", "Mixed Veg Kurma"]
    },
    Friday: {
      Breakfast: ["Bread", "Jam", "Boiled Egg / Banana"],
      Lunch: ["Vegetable Pulao", "Dal", "Curd"],
      Snacks: ["Seasonal Fruit"],
      Dinner: ["Rice", "Sambar", "Potato Fry"]
    },
    Saturday: {
      Breakfast: ["Poha", "Chutney"],
      Lunch: ["Rice", "Dal Tadka", "Beans Curry"],
      Snacks: ["Milk"],
      Dinner: ["Chapati", "Sweet Pongal / Kesari"]
    },
    Sunday: {
      Breakfast: ["Poori", "Chole"],
      Lunch: ["Chicken Curry / Paneer Curry", "Rice"],
      Snacks: ["Fruit Juice"],
      Dinner: ["Vegetable Fried Rice", "Curd"]
    }
  };

  // 🔵 SAFE DAY DETECTION
  const todayDay = new Date().toLocaleDateString("en-US", {
    weekday: "long"
  });

  const todayMenu =
    weeklyMenu[todayDay as keyof typeof weeklyMenu] ||
    weeklyMenu["Monday"]; // fallback safety

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [currentMeal, setCurrentMeal] = useState<string | null>(null);
  const [currentItem, setCurrentItem] = useState<string | null>(null);
  const [mealPhotos, setMealPhotos] = useState<any>({});
  const [submittedMeals, setSubmittedMeals] = useState<any>({});
  const [cameraOpen, setCameraOpen] = useState(false);

  const startCamera = async (meal: string, item: string) => {
    setCurrentMeal(meal);
    setCurrentItem(item);
    setCameraOpen(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      alert("Camera access denied.");
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext("2d");

    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;

    context?.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    const imageUrl = canvasRef.current.toDataURL("image/png");

    setMealPhotos((prev: any) => ({
      ...prev,
      [currentMeal!]: {
        ...prev[currentMeal!],
        [currentItem!]: imageUrl
      }
    }));

    stopCamera();
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setCameraOpen(false);
  };
const schoolId = "a833c50d-8faf-4706-8469-14d1920b3022";
 const handleSubmit = async (meal: string) => {
  const requiredItems = todayMenu[meal as keyof typeof todayMenu];
  const photos = mealPhotos[meal] || {};

  const allUploaded = requiredItems.every(
    (item: string) => photos[item]
  );

  if (!allUploaded) {
    alert("Upload all menu item photos before submitting.");
    return;
  }

  try {
    for (const item of requiredItems) {
      const base64Image = photos[item];

      const response = await fetch(base64Image);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("file", blob);
      formData.append("menu", `${meal} - ${item}`);
      formData.append("schoolId", schoolId);

      await fetch("/api/meals/upload", {
        method: "POST",
        body: formData,
      });
    }

    setSubmittedMeals((prev: any) => ({
      ...prev,
      [meal]: true,
    }));

    alert(`${meal} submitted successfully`);

  } catch (error) {
    console.error(error);
    alert("Upload failed");
  }
}; return (
    <div>
      <h1 className="text-3xl font-bold text-blue-900 mb-8">
        Today Meals ({todayDay})
      </h1>

      {todayMenu &&
        Object.entries(todayMenu).map(([meal, items]) => (
          <div key={meal} className="bg-white shadow p-6 mb-8 rounded">

            <h2 className="text-xl font-semibold mb-4 text-blue-900">
              {meal}
            </h2>

            {items.map((item: string) => (
              <div key={item} className="flex justify-between items-center mb-4">
                <div className="w-1/3">{item}</div>

                <div className="w-1/3 text-center">
                {mealPhotos?.[meal]?.[item] ? (

  <div className="flex flex-col items-center">

    <img
      src={mealPhotos[meal][item]}
      className="h-20 mx-auto rounded shadow"
    />

    {!submittedMeals[meal] && (
      <button
        className="mt-1 text-red-600 text-sm"
        onClick={async () => {

          await fetch("/api/meals/remove",{
            method:"POST",
            headers:{ "Content-Type":"application/json"},
            body: JSON.stringify({
              mealType: meal,
              itemName: item,
              schoolId
            })
          });

          setMealPhotos((prev:any)=>{
            const updated = {...prev};
            if(updated[meal]){
              delete updated[meal][item];
            }
            return updated;
          });

        }}
      >
        Remove
      </button>
    )}

  </div>

) : (

  <button
    disabled={submittedMeals[meal]}
    onClick={() => startCamera(meal, item)}
    className="bg-blue-600 text-white px-3 py-1 rounded"
  >
    Open Camera
  </button>

)}
                </div>
              </div>
            ))}

          <div className="text-right mt-4">

  {submittedMeals[meal] ? (

    <span className="bg-green-600 text-white px-6 py-2 rounded">
      Submitted
    </span>

  ) : (

    <button
      onClick={()=>handleSubmit(meal)}
      className="bg-blue-900 text-white px-6 py-2 rounded"
    >
      Submit
    </button>

  )}

</div>
          </div>
        ))}

      {/* CAMERA MODAL */}
      {cameraOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
          <video
            ref={videoRef}
            autoPlay
            className="w-96 rounded"
          />

          <div className="mt-4 space-x-4">
            <button
              onClick={capturePhoto}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Capture
            </button>
            <button
              onClick={stopCamera}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  );
}