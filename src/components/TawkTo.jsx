// src/components/TawkTo.jsx
import { useEffect } from "react";

const TawkTo = () => {
  // useEffect(() => {
  //   // Prevent loading multiple times
  //   if (window.Tawk_API) return;

  //   var Tawk_API = window.Tawk_API || {};
  //   var Tawk_LoadStart = new Date();

  //   const s1 = document.createElement("script");
  //   s1.async = true;
  //   s1.src = "https://embed.tawk.to/68f3826e0524d4194f532c6c/1j7rjb0cu"; // Your widget URL
  //   s1.charset = "UTF-8";
  //   s1.setAttribute("crossorigin", "*");

  //   const s0 = document.getElementsByTagName("script")[0];
  //   s0.parentNode.insertBefore(s1, s0);

  //   // Optional: log when Tawk is ready
  //   s1.onload = () => {
  //     console.log("Tawk.to widget loaded");
  //   };
  // }, []);



  useEffect(() => {
    if (window.Tawk_API) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = "https://embed.tawk.to/68f3826e0524d4194f532c6c/1j7rjb0cu";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");

    const s0 = document.getElementsByTagName("script")[0];
    s0.parentNode.insertBefore(s1, s0);

    s1.onload = () => {
      console.log("Tawk.to widget loaded");

      if (window.Tawk_API) {
        window.Tawk_API.onLoad = function() {
          // Move chat widget (for example)
          window.Tawk_API.setWidgetPosition({ bottom: "180px", right: "140px" });
        };
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default TawkTo;