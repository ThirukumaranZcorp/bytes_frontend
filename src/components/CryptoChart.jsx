import React, { useEffect, useRef } from "react";

const CryptoChart = ({ symbol = "BTCUSDT" }) => {
  const container = useRef();

  useEffect(() => {
    // Clear existing script (important for re-render)
    while (container.current.firstChild) {
      container.current.removeChild(container.current.firstChild);
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `BINANCE:${symbol}`,
      interval: "60",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      hide_top_toolbar: false,
      allow_symbol_change: true,
      withdateranges: true,
      range: "1D",
      details: true,
      hotlist: true,
      calendar: false,
      hide_volume: false,
    });

    container.current.appendChild(script);
  }, [symbol]);

  return (
    <div className="h-[600px] w-full bg-gray-900 rounded-xl p-2">
      <div className="tradingview-widget-container" ref={container}></div>
    </div>
  );
};

export default CryptoChart;
