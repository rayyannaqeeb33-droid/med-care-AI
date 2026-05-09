 "use client";

import { useState } from "react";

export default function Home() {

  const [activeTab, setActiveTab] =
    useState("dashboard");

  const [city, setCity] = useState("");
  const [disease, setDisease] =
    useState("");
  const [season, setSeason] =
    useState("");

  const [medicine, setMedicine] =
    useState("");

  const [hospital, setHospital] =
    useState("");

  const [prediction, setPrediction] =
    useState("");

  const [medicineAI, setMedicineAI] =
    useState("");

  const [hospitalAI, setHospitalAI] =
    useState("");

  const [medicineData, setMedicineData] =
    useState<any>(null);

  const [hospitalData, setHospitalData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const analyzeHealthcare = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        "/api/analyze",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            city,
            disease,
            season,
            medicine,
            hospital,
          }),
        }
      );

      const data = await response.json();

      setPrediction(
        data.result || ""
      );

      setMedicineData(
        data.medicineData || null
      );

      setHospitalData(
        data.hospitalData || null
      );

      setMedicineAI(
        data.medicineAI || ""
      );

      setHospitalAI(
        data.hospitalAI || ""
      );

    } catch (error) {

      alert("Backend crashed.");

    } finally {

      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex overflow-hidden">

      {/* Background Glow */}
      <div className="fixed top-[-200px] left-[-100px] w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[160px] rounded-full pointer-events-none" />

      <div className="fixed bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-cyan-500 opacity-20 blur-[160px] rounded-full pointer-events-none" />

      {/* Sidebar */}
      <div className="w-[290px] border-r border-white/10 bg-black/40 backdrop-blur-2xl p-6 flex flex-col justify-between">

        <div>

          <div className="mb-12">

            <h1 className="text-4xl font-black tracking-tight">
              MedGuard AI
            </h1>

            <p className="text-gray-500 mt-2">
              National Healthcare Intelligence
            </p>

          </div>

          <div className="space-y-3">

            {[
              ["dashboard", "Dashboard"],
              ["hospital", "Hospital Intelligence"],
              ["supply", "Supply Intelligence"],
            ].map(([key, label]) => (

              <button
                key={key}
                onClick={() =>
                  setActiveTab(key)
                }
                className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 ${
                  activeTab === key
                    ? "bg-blue-600 glow-blue"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >

                <span className="text-lg font-semibold">
                  {label}
                </span>

              </button>

            ))}

          </div>

        </div>

        <div className="glass rounded-2xl p-5">

          <p className="text-green-400 font-semibold">
            ● SYSTEM ACTIVE
          </p>

          <p className="text-gray-400 text-sm mt-2">
            AI healthcare infrastructure monitoring online.
          </p>

        </div>

      </div>

      {/* Main */}
      <div className="flex-1 overflow-y-auto p-10">

        {/* Dashboard */}
        {activeTab === "dashboard" && (

          <div className="space-y-8">

            {/* Hero */}
            <div className="glass rounded-[32px] p-10">

              <div className="flex items-center justify-between">

                <div>

                  <h1 className="text-7xl font-black leading-none tracking-tight">

                    Predictive
                    <br />
                    Healthcare AI

                  </h1>

                  <p className="text-gray-400 text-xl mt-6 max-w-2xl leading-9">

                    MedGuard AI predicts healthcare pressure,
                    medicine shortages,
                    ICU stress,
                    and emergency risk using autonomous intelligence systems.

                  </p>

                </div>

                <div className="glass rounded-3xl p-8 glow-green">

                  <p className="text-green-400 text-lg font-semibold">
                    ● NATIONAL GRID ONLINE
                  </p>

                </div>

              </div>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-6">

              {[
                ["94%", "AI Confidence"],
                ["ACTIVE", "Supply Network"],
                ["LOW", "Emergency Risk"],
                ["24/7", "Monitoring"],
              ].map(([value, label]) => (

                <div
                  key={label}
                  className="glass rounded-3xl p-8"
                >

                  <h2 className="text-gray-400 mb-3">
                    {label}
                  </h2>

                  <p className="text-5xl font-black">
                    {value}
                  </p>

                </div>

              ))}

            </div>

            {/* AI Simulator */}
            <div className="glass rounded-[32px] p-10">

              <h2 className="text-5xl font-black mb-10">
                Healthcare Crisis Simulator
              </h2>

              <div className="grid grid-cols-3 gap-6">

                <input
                  value={city}
                  onChange={(e) =>
                    setCity(e.target.value)
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none text-lg"
                  placeholder="City"
                />

                <input
                  value={disease}
                  onChange={(e) =>
                    setDisease(e.target.value)
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none text-lg"
                  placeholder="Disease"
                />

                <input
                  value={season}
                  onChange={(e) =>
                    setSeason(e.target.value)
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none text-lg"
                  placeholder="Season"
                />

              </div>

              <button
                onClick={analyzeHealthcare}
                className="mt-8 bg-blue-600 hover:bg-blue-500 transition-all px-10 py-5 rounded-2xl text-xl font-bold glow-blue"
              >

                {loading
                  ? "Analyzing..."
                  : "Analyze Healthcare"}

              </button>

              <div className="mt-10 bg-black/40 border border-white/10 rounded-3xl p-8 min-h-[250px]">

                <h3 className="text-3xl font-bold mb-6">
                  AI Healthcare Report
                </h3>

                <p className="text-gray-300 whitespace-pre-wrap leading-9 text-lg">
                  {prediction ||
                    "AI healthcare analysis will appear here."}
                </p>

              </div>

            </div>

          </div>

        )}

        {/* Hospital */}
        {activeTab === "hospital" && (

          <div className="space-y-8">

            <div>

              <h1 className="text-6xl font-black">
                Hospital Intelligence
              </h1>

              <p className="text-gray-400 text-xl mt-4">
                AI-powered hospital infrastructure analysis.
              </p>

            </div>

            <div className="glass rounded-[32px] p-10">

              <input
                value={hospital}
                onChange={(e) =>
                  setHospital(e.target.value)
                }
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 outline-none text-lg"
                placeholder="Enter Hospital Name"
              />

              <button
                onClick={analyzeHealthcare}
                className="mt-8 bg-blue-600 hover:bg-blue-500 px-10 py-5 rounded-2xl text-xl font-bold glow-blue"
              >

                {loading
                  ? "Analyzing..."
                  : "Analyze Hospital"}

              </button>

            </div>

            {hospitalData && (

              <div className="glass rounded-[32px] p-10">

                <div className="grid grid-cols-3 gap-6">

                  <div className="bg-black/40 rounded-3xl p-8">

                    <p className="text-gray-400 mb-3">
                      ICU Occupancy
                    </p>

                    <h2 className="text-6xl font-black text-red-400">
                      {hospitalData.occupancy}
                    </h2>

                  </div>

                  <div className="bg-black/40 rounded-3xl p-8">

                    <p className="text-gray-400 mb-3">
                      Oxygen
                    </p>

                    <h2 className="text-6xl font-black text-yellow-400">
                      {hospitalData.oxygen}
                    </h2>

                  </div>

                  <div className="bg-black/40 rounded-3xl p-8">

                    <p className="text-gray-400 mb-3">
                      Beds
                    </p>

                    <h2 className="text-6xl font-black text-green-400">
                      {hospitalData.beds}
                    </h2>

                  </div>

                </div>

                <div className="mt-8 bg-black/40 rounded-3xl p-8">

                  <h2 className="text-3xl font-bold mb-6">
                    AI Hospital Analysis
                  </h2>

                  <p className="text-gray-300 whitespace-pre-wrap leading-9 text-lg">
                    {hospitalAI}
                  </p>

                </div>

              </div>

            )}

          </div>

        )}

        {/* Supply */}
        {activeTab === "supply" && (

          <div className="space-y-8">

            <div>

              <h1 className="text-6xl font-black">
                Supply Intelligence
              </h1>

              <p className="text-gray-400 text-xl mt-4">
                Autonomous medicine vendor coordination.
              </p>

            </div>

            <div className="glass rounded-[32px] p-10">

              <input
                value={medicine}
                onChange={(e) =>
                  setMedicine(e.target.value)
                }
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 outline-none text-lg"
                placeholder="Enter Medicine Name"
              />

              <button
                onClick={analyzeHealthcare}
                className="mt-8 bg-blue-600 hover:bg-blue-500 px-10 py-5 rounded-2xl text-xl font-bold glow-blue"
              >

                {loading
                  ? "Analyzing..."
                  : "Analyze Supply"}

              </button>

            </div>

            {medicineData && (

              <div className="glass rounded-[32px] p-10">

                <div className="grid grid-cols-4 gap-6">

                  <div className="bg-black/40 rounded-3xl p-8">

                    <p className="text-gray-400 mb-3">
                      Medicine
                    </p>

                    <h2 className="text-4xl font-black text-blue-400">
                      {medicineData.medicine}
                    </h2>

                  </div>

                  <div className="bg-black/40 rounded-3xl p-8">

                    <p className="text-gray-400 mb-3">
                      Demand
                    </p>

                    <h2 className="text-4xl font-black text-red-400">
                      {medicineData.demand}
                    </h2>

                  </div>

                  <div className="bg-black/40 rounded-3xl p-8">

                    <p className="text-gray-400 mb-3">
                      Vendor
                    </p>

                    <h2 className="text-2xl font-black text-yellow-400">
                      {medicineData.vendor}
                    </h2>

                  </div>

                  <div className="bg-black/40 rounded-3xl p-8">

                    <p className="text-gray-400 mb-3">
                      ETA
                    </p>

                    <h2 className="text-4xl font-black text-green-400">
                      {medicineData.eta}
                    </h2>

                  </div>

                </div>

                <div className="mt-8 bg-black/40 rounded-3xl p-8">

                  <h2 className="text-3xl font-bold mb-6">
                    AI Supply Analysis
                  </h2>

                  <p className="text-gray-300 whitespace-pre-wrap leading-9 text-lg">
                    {medicineAI}
                  </p>

                </div>

              </div>

            )}

          </div>

        )}

      </div>

    </main>
  );
}