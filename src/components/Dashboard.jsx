import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Api from "../api/ApiIP";
import CryptoChart from "./CryptoChart";


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
  { code: "PHP", label: "PHP (₱)" }, 
];


export default function Dashboard() {
  const [currency, setCurrency] = useState("USD");
  const [capital, setCapital] = useState("");
  const [accounts, setAccounts] = useState(1);
  const [fee, setFee] = useState(3);

  const [min , setMin] = useState(0);
  const [max , setMax] = useState(0)


  const [initialAmount, setInitialAmount] = useState("");
  const [results, setResults] = useState(null);
  const Token = sessionStorage.getItem("authToken");
  const [transactions, setTransactions] = useState([]);

  const [selected, setSelected] = useState("BTCUSDT");
  const coins = ["BTCUSDT", "ETHUSDT", "XRPUSDT", "SOLUSDT", "BNBUSDT"];

  // Configurable penalty rate (Excel uses 1% per extra account)
  const penaltyRate = 1.0; // <-- adjust if needed later

  function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(value);
  }

  // Auto calculate whenever input changes
  useEffect(() => {
    if (!capital || isNaN(capital)) {
      calculateResults(initialAmount);
    } else if (capital > 0) {
      calculateResults(capital);
    } else {
      setResults(null);
    }
  }, [capital, currency, accounts, fee]);

  function calculateResults(amount) {
    let cap = amount;
    let tier = "N/A",
      risk = "-";

    // Tier detection (on base capital only)
    for (let t of tiers) {
      if (cap >= t.min && cap <= t.max) {
        tier = t.name;
        risk = t.risk;
      }
    }

    // Base % from Excel
    // let minPct = 4.0,
    //   maxPct = 8.0;


    let minPct = min || 0;
    let maxPct = max || 0;


    // Apply anti-split penalty (Excel logic: 1% per extra account)
    let penalty = (accounts - 1) * penaltyRate / 100;
    let minEffective = minPct * (1 - penalty);
    let maxEffective = maxPct * (1 - penalty);
    let avgPct = (minEffective + maxEffective) / 2;

    // Calculate profits
    let gross = (avgPct / 100) * cap;
    let feeAmt = (fee / 100) * gross;
    let net = gross - feeAmt;

    const scenarios = [
      { name: "Min (effective)", pct: minEffective },
      { name: "Mid (average)", pct: avgPct },
      { name: "Max (effective)", pct: maxEffective },
      { name: "Softer Month", pct: avgPct - 1.5 },
    ].map((s) => {
      let g = (s.pct / 100) * cap;
      let f = (fee / 100) * g;
      let n = g - f;
      return { ...s, g, f, n };
    });

    setResults({
      tier,
      risk,
      minPct: minEffective,
      maxPct: maxEffective,
      gross,
      feeAmt,
      net,
      scenarios,
    });
  }

  const fetchData = async () => {
    console.log("00000000000000999999999999999999999---------------------90000000000000000000----------")
    try {
      const response = await fetch(`${Api}/api/v1/user_details`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      console.log("------------Fetched user details:-----------", data.transactions);
      setTransactions(data.transactions || []);

      setCurrency(data.currency || "USD");
      setCapital(data.contribution_amount || "");
      setInitialAmount(data.contribution_amount || "");
      calculateResults(data.contribution_amount);


    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Something went wrong while fetching data.");
    }
  };


  const fetchPercentageData =  async () => {
    try {
        const response = await fetch(`${Api}/api/v1/get_change_trader_fee`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Token}`,
        },
        });

        const data = await response.json();

        if (!response.ok) {
        console.error("Saving failed:", data);
        alert("Saving failed: " + (data.error || "Unknown error"));
        return;
        }

        // ✅ Success popup
        // alert("✅ Fee updated successfully to " + data.fee + "%");
        setFee(data.fee)
        setMin(data.min)
        setMax(data.max)


    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Something went wrong while fetching data.");
    }
  }

  useEffect(() => {
    fetchData();
    fetchPercentageData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-[#b61825] pt-32 md:pt-40 px-3 md:px-6 py-10">

        {/* ==== Tiers Table ==== */}
        <div className="bg-white shadow-md rounded-xl p-3 md:p-6 max-w-5xl mx-auto m-6">
          <h2 className="text-base md:text-lg font-bold border-b pb-2 mb-4">INVESTMENT CHART</h2>
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


        <div className="bg-white shadow-md rounded-xl p-3 md:p-6 max-w-5xl mx-auto m-6">
          <h1 className="text-3xl font-bold text-center mb-6">Live Chart</h1>

          <div className="flex justify-center gap-4 mb-6 text-white">
            {coins.map((coin) => (
              <button
                key={coin}
                onClick={() => setSelected(coin)}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  selected === coin
                    ? "bg-blue-600"
                    : "bg-[#b61825] hover:bg-gray-600"
                }`}
              >
                {coin.replace("USDT", "")}
              </button>
            ))}
          </div>

          <CryptoChart symbol={selected} />
        </div>




        {/* ==== Input & Results Grid ==== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Input Card */}
          <div className="bg-white shadow-md rounded-xl p-3 md:p-6">
            <h2 className="text-base md:text-lg font-bold border-b pb-2 mb-4">Inputs</h2>

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
            {/* <input
              type="number"
              placeholder="ENTER VALUE HERE"
              className="w-full border rounded-lg p-2 mb-3 border-red-500 placeholder:font-bold"
              value={capital}
              onChange={(e) => setCapital(parseFloat(e.target.value))}
              style={{
                animation: "breathePlaceholder 1.5s ease-in-out infinite",
              }}
            /> */}


            <input
              type="number"
              placeholder="ENTER VALUE HERE"
              className="w-full border rounded-lg p-2 mb-3 border-red-500 placeholder:font-bold"
              value={capital}
              onChange={(e) => {
                const inputValue = parseFloat(e.target.value);
                if (inputValue <= 100000000) {
                  setCapital(inputValue);
                }
              }}
              max={100000000}
              style={{
                animation: "breathePlaceholder 1.5s ease-in-out infinite",
              }}
            />


            <style>
              {`
                @keyframes breathePlaceholder {
                  0%, 100% { color: #FFD700; } /* Gold */
                  50% { color: #FF0000; }      /* Red */
                }
                input::placeholder {
                  animation: inherit;
                }
              `}
            </style>
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
              disabled={true}
            />
          </div>

          {/* Results Card */}
          {results && (
            <div className="bg-white shadow-md rounded-xl p-3 md:p-6">
              <h2 className="text-base md:text-lg font-bold border-b pb-2 mb-4">
                Computed Tier & Results
              </h2>
              <p>Detected Tier: <span className="font-bold text-blue-600">{results.tier}</span></p>
              <p>Risk Level: <span className="font-bold text-blue-600">{results.risk}</span></p>
              <p>Min % (effective): {results.minPct.toFixed(2)}%</p>
              <p>Max % (effective): {results.maxPct.toFixed(2)}%</p>
              <p>Gross Monthly Profit: {formatCurrency(results.gross)}</p>
              <p>Trader Fee Amount: {formatCurrency(results.feeAmt)}</p>
              <p className="font-bold text-blue-600">Net Monthly Profit: {formatCurrency(results.net)}</p>
            </div>
          )}
        </div>

        {/* ==== Stress Test Table ==== */}
        {results && (
          <div className="bg-white shadow-md rounded-xl p-3 md:p-6 max-w-5xl mx-auto mt-6 mb-8">
            <h2 className="text-base md:text-lg font-bold border-b pb-2 mb-4">Stress Test</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm md:text-base">
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
                      <td className="border p-2">{formatCurrency(capital || initialAmount)}</td>
                      <td className="border p-2">{formatCurrency(s.g)}</td>
                      <td className="border p-2">{fee.toFixed(2)}%</td>
                      <td className="border p-2">{formatCurrency(s.f)}</td>
                      <td className="border p-2">{formatCurrency(s.n)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}


        {/* ==== Fixed 12 Month Distribution Table ==== */}
        {/* ==== Fixed 12 Month Distribution Table ==== */}
        {capital && (
          <div className="bg-white shadow-md rounded-xl p-3 md:p-6 max-w-5xl mx-auto mt-6">
            <h2 className="text-base md:text-lg font-bold border-b pb-2 mb-4">
              12 Month Profit Share
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm md:text-base">
                <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Month</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Bank Name</th>
                  {/* <th className="border p-2">Fee</th> */}
                  <th className="border p-2">Total Amount</th>
                  <th className="border p-2">From Account</th>
                  <th className="border p-2">To Account</th>
                  <th className="border p-2">Confirmation Number</th>
                  {/* <th className="border p-2">Service</th> */}
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 12 }, (_, i) => {
                  const txn = transactions[i]; // get transaction if exists
                  return (
                    <tr key={i} className="text-center">
                      <td className="border p-2">{i + 1} </td>
                      <td className="border p-2">{txn ? txn.month : ""}</td>
                      <td className="border p-2">{txn ? txn.bank : ""}</td>
                      <td className="border p-2">
                        {txn ? formatCurrency(txn.total, txn.currency) : ""}
                      </td>
                      <td className="border p-2 whitespace-nowrap w-40">
                        {txn ? txn.from_account : ""}
                      </td>
                      <td className="border p-2">{txn ? txn.to_account : ""}</td>
                      <td className="border p-2">{txn ? txn.confirmation_number : ""}</td>
                      <td
                        className={`border p-2 font-bold ${
                          txn
                            ? txn.status === "PAID"
                              ? "text-green-600"
                              : "text-red-600"
                            : "text-gray-400"
                        }`}
                      >
                        {txn ? txn.status : "Pending"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>


              </table>
            </div>
          </div>
        )}
        </div>
    </>
  );
}
