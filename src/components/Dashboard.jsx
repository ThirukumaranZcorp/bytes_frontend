import { useState } from "react";
import Navbar from "./Navbar";
const tiers = [
  { name: "Starter", min: 1000, max: 2500, risk: "High", color: "bg-red-500" },
  { name: "Growth", min: 2501, max: 5000, risk: "Moderate-High", color: "bg-orange-400" },
  { name: "Intermediate", min: 5001, max: 12000, risk: "Moderate", color: "bg-yellow-400" },
  { name: "Advanced", min: 12001, max: 30000, risk: "Moderate-Low", color: "bg-green-300" },
  { name: "Professional", min: 30001, max: 60000, risk: "Low", color: "bg-green-400" },
  { name: "Institutional", min: 60001, max: 200000, risk: "Very Low", color: "bg-teal-400" },
  { name: "Enterprise", min: 200001, max: 1000000, risk: "Very Low", color: "bg-teal-400" },
  { name: "Family Office", min: 1000001, max: 5000000, risk: "Ultra Low", color: "bg-cyan-400" },
  { name: "Sovereign", min: 5000001, max: 100000000, risk: "Minimal", color: "bg-green-200" },
];

const currencyOptions = [
  { code: "USD", label: "USD ($)" },
  { code: "EUR", label: "EUR (€)" },
  { code: "GBP", label: "GBP (£)" },
  { code: "JPY", label: "JPY (¥)" },
  { code: "AUD", label: "AUD (A$)" },
  { code: "CAD", label: "CAD (C$)" },
  { code: "CHF", label: "CHF (Fr)" },
  { code: "CNY", label: "CNY (¥)" },
  { code: "NZD", label: "NZD (NZ$)" },
  { code: "SGD", label: "SGD (S$)" },
];

export default function Dashboard() {
  const [currency, setCurrency] = useState("USD");
  const [capital, setCapital] = useState(2600);
  const [accounts, setAccounts] = useState(1);
  const [fee, setFee] = useState(3);
  const [results, setResults] = useState(null);

  function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(value);
  }

  function calculateResults() {
    let tier = "N/A", risk = "-";
    for (let t of tiers) {
      if (capital >= t.min && capital <= t.max) {
        tier = t.name;
        risk = t.risk;
      }
    }

    let minPct = 4.0, maxPct = 8.0;
    let avgPct = (minPct + maxPct) / 2;
    let gross = (avgPct / 100) * capital;
    let feeAmt = (fee / 100) * gross;
    let net = gross - feeAmt;

    const scenarios = [
      { name: "Min (effective)", pct: minPct },
      { name: "Mid (average)", pct: avgPct },
      { name: "Max (effective)", pct: maxPct },
      { name: "Softer Month", pct: avgPct - 1.5 },
    ].map((s) => {
      let g = (s.pct / 100) * capital;
      let f = (fee / 100) * g;
      let n = g - f;
      return { ...s, g, f, n };
    });

    setResults({ tier, risk, minPct, maxPct, gross, feeAmt, net, scenarios });
  }

  return (
    <>
      <Navbar />
      <div className="bg-[#e62424] pt-40">
        
        {/* <h1 className="text-3xl font-bold text-center  pt-35 m-6">Investment Dashboard</h1> */}

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Input Card */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-bold border-b pb-2 mb-4">Inputs</h2>

            <label className="block font-semibold">Currency</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 mb-3"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {currencyOptions.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>

            <label className="block font-semibold">Capital Amount</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg p-2 mb-3"
              value={capital}
              onChange={(e) => setCapital(parseFloat(e.target.value))}
            />

            <label className="block font-semibold">Accounts</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg p-2 mb-3"
              value={accounts}
              onChange={(e) => setAccounts(parseInt(e.target.value))}
            />

            <label className="block font-semibold">Trader Fee (%)</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg p-2 mb-3"
              value={fee}
              onChange={(e) => setFee(parseFloat(e.target.value))}
            />

            <button
              onClick={calculateResults}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg mt-3"
            >
              Calculate
            </button>
          </div>

          {/* Results */}
          {results && (
            <div className="bg-white shadow-md rounded-xl p-6">
              <h2 className="text-lg font-bold border-b pb-2 mb-4">
                Computed Tier & Results
              </h2>
              <p>
                Detected Tier:{" "}
                <span className="font-bold text-blue-600">{results.tier}</span>
              </p>
              <p>
                Risk Level:{" "}
                <span className="font-bold text-blue-600">{results.risk}</span>
              </p>
              <p>Min % (effective): {results.minPct}%</p>
              <p>Max % (effective): {results.maxPct}%</p>
              <p>Gross Monthly Profit: {formatCurrency(results.gross)}</p>
              <p>Trader Fee Amount: {formatCurrency(results.feeAmt)}</p>
              <p className="font-bold text-blue-600">
                Net Monthly Profit: {formatCurrency(results.net)}
              </p>
            </div>
          )}
        </div>

        {/* Stress Table */}
        {results && (
          <div className="bg-white shadow-md rounded-xl p-6 max-w-5xl mx-auto mt-6">
            <h2 className="text-lg font-bold border-b pb-2 mb-4">Stress Test</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Scenario</th>
                  <th className="border p-2">Monthly %</th>
                  <th className="border p-2">Capital</th>
                  <th className="border p-2">Gross Profit</th>
                  <th className="border p-2">Fee %</th>
                  <th className="border p-2">Fee Amount</th>
                  <th className="border p-2">Net Profit</th>
                </tr>
              </thead>
              <tbody>
                {results.scenarios.map((s, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="border p-2">{s.name}</td>
                    <td className="border p-2">{s.pct.toFixed(2)}%</td>
                    <td className="border p-2">{formatCurrency(capital)}</td>
                    <td className="border p-2">{formatCurrency(s.g)}</td>
                    <td className="border p-2">{fee.toFixed(2)}%</td>
                    <td className="border p-2">{formatCurrency(s.f)}</td>
                    <td className="border p-2">{formatCurrency(s.n)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tiers Table */}
        <div className="bg-white shadow-md rounded-xl p-6 max-w-5xl mx-auto mt-6">
          <h2 className="text-lg font-bold border-b pb-2 mb-4">Tier Levels</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Tier</th>
                <th className="border p-2">Capital Range (allowed)</th>
                <th className="border p-2">Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((t, idx) => (
                <tr key={idx} className="text-center">
                  <td className="border p-2">{t.name}</td>
                  <td className="border p-2">
                    {t.min.toLocaleString()} – {t.max.toLocaleString()}
                  </td>
                  <td className={`border p-2 font-bold text-white ${t.color}`}>
                    {t.risk}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
