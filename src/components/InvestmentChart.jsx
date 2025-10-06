import { useState , useEffect} from "react";
import Navbar from "./Navbar";

const tiers = [
  { name: "Starter", min: 1000, max: 2500, risk: "High", color: "#E63946" },
  { name: "Growth", min: 2501, max: 5000, risk: "Moderate-High", color: "#F77F00" },
  { name: "Intermediate", min: 5001, max: 12000, risk: "Moderate", color: "#F9C74F" },
  { name: "Advanced", min: 12001, max: 30000, risk: "Moderate-Low", color: "#90BE6D" },
  { name: "Professional", min: 30001, max: 60000, risk: "Low", color: "#43AA8B" },
  { name: "Institutional", min: 60001, max: 200000, risk: "Very Low", color: "#4D908E" },
  { name: "Enterprise", min: 200001, max: 1000000, risk: "Minimal-Moderate", color: "#577590" },
  { name: "Family Office", min: 1000001, max: 5000000, risk: "Ultra Low", color: "#48CAE4" },
  { name: "Sovereign", min: 5000001, max: 100000000, risk: "Minimal", color: "#ADE8F4" },
];


export default function InvestmentChart({handleShow}) {
    return (
        <>
        <div className="bg-[#b61825] w-full pt-32 md:pt-40 px-3 md:px-6 py-10 min-h-screen">
        
            <div className="bg-white shadow-md rounded-xl p-3 md:p-6 max-w-5xl mx-auto m-6">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4">
                    <h2 className="text-base md:text-lg font-bold">INVESTMENT CHART</h2>
                    <button
                        onClick={() => handleShow()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded mt-2 md:mt-0"
                    >
                        Back
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm md:text-base">
                    <thead>
                        <tr className="bg-gray-100">
                        <th className="border p-2">Tier</th>
                        <th className="border p-2">Capital Range</th>
                        <th className="border p-2">Risk</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tiers.map((t, idx) => (
                        <tr key={idx} className="text-center">
                            <td className="border p-2">{t.name}</td>
                            <td className="border p-2">
                            {t.min.toLocaleString()} – {t.max.toLocaleString()}
                            </td>
                            <td
                            className="border p-2 font-bold text-white"
                            style={{ backgroundColor: t.color }}
                            >
                            {t.risk}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    ); 
}