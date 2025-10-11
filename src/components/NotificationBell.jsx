// import React, { useEffect, useState } from "react";

// const NotificationBell = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [showList, setShowList] = useState(false);

    // useEffect(() => {
    //     const fetchNotifications = async () => {
    //         try {
    //         const res = await fetch("http://localhost:3000/api/v1/notifications/upcoming_payouts");

    //         if (!res.ok) {
    //             console.error("Failed to fetch notifications:", res.statusText);
    //             setNotifications([]);
    //             return;
    //         }

    //         const data = await res.json();
    //         setNotifications(Array.isArray(data) ? data : []);
    //         } catch (error) {
    //         console.error("Error fetching notifications:", error);
    //         setNotifications([]);
    //         }
    //     };

    //     fetchNotifications();
    // }, []);

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setShowList(!showList)}
//         className="relative p-2 text-gray-600 hover:text-blue-600"
//       >
//         🔔
//         {notifications.length > 0 && (
//           <span className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-full">
//             {notifications.length}
//           </span>
//         )}
//       </button>

//       {showList && (
//         <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg p-3">
//           <h3 className="font-semibold mb-2">Upcoming Payouts</h3>
//           {notifications.length === 0 ? (
//             <p className="text-gray-500 text-sm">No upcoming payouts</p>
//           ) : (
//             <ul className="space-y-2 text-sm">
//               {notifications.map((n) => (
//                 <li key={n.id} className="border-b pb-1">
//                   <strong>{n.user_name}</strong> → {n.payout_date}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationBell;


// import React, { useEffect, useState } from "react";
// import { Bell } from "lucide-react";
// import Api from "../api/ApiIP";

// const NotificationBell = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const Token = sessionStorage.getItem("authToken");
// //   const fetchNotifications = async () => {
// //     const res = await fetch(`${Api}/api/v1/notifications`);
// //     const data = await res.json();
// //     setNotifications(data);
// //   };

//     const fetchNotifications = async () => {
//         try {
//         const res = await fetch(`${Api}/api/v1/admin_notifications`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization: `Bearer ${Token}`,
//           },
//         });

//         if (!res.ok) {
//             console.error("Failed to fetch notifications:", res.statusText);
//             setNotifications([]);
//             return;
//         }

//         const data = await res.json();
//         setNotifications(Array.isArray(data) ? data : []);
//         } catch (error) {
//         console.error("Error fetching notifications:", error);
//         setNotifications([]);
//         }
//     };
   
//     useEffect(() => {
//         fetchNotifications();
//         const interval = setInterval(fetchNotifications, 60000); // refresh every 1 min
//         return () => clearInterval(interval);
//     }, []);

//     const unreadCount = notifications.filter(n => !n.read).length;

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setShowDropdown(!showDropdown)}
//         className="relative p-2 bg-white rounded-full shadow hover:bg-gray-100"
//       >
//         <Bell className="w-6 h-6 text-gray-800" />
//         {unreadCount > 0 && (
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {showDropdown && (
//         <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg border">
//           <h4 className="px-4 py-2 font-semibold border-b">Notifications</h4>
//           <ul className="max-h-64 overflow-y-auto">
//             {notifications.map((n) => (
//               <li key={n.id} className="px-4 py-2 hover:bg-gray-100">
//                 <p className="font-medium">{n.title}</p>
//                 <p className="text-sm text-gray-600">{n.message}</p>
//               </li>
//             ))}
//             {notifications.length === 0 && (
//               <li className="px-4 py-2 text-gray-500 text-sm text-center">
//                 No notifications
//               </li>
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationBell;


// import React, { useEffect, useState } from "react";
// import { Bell } from "lucide-react";
// import Api from "../api/ApiIP";

// const NotificationBell = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const Token = sessionStorage.getItem("authToken");

//   // Fetch notifications
//   const fetchNotifications = async () => {
//     try {
//       const res = await fetch(`${Api}/api/v1/admin_notifications`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${Token}`,
//         },
//       });

//       if (!res.ok) {
//         console.error("Failed to fetch notifications:", res.statusText);
//         setNotifications([]);
//         return;
//       }

//       const data = await res.json();
//       setNotifications(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//       setNotifications([]);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 60000); // refresh every 1 min
//     return () => clearInterval(interval);
//   }, []);

//   // ✅ Mark notification as read
//   const handleMarkAsRead = async (id) => {
//     try {
//       const res = await fetch(`${Api}/api/v1/admin_notifications/${id}/read`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${Token}`,
//         },
//       });

//       if (res.ok) {
//         // remove from local list immediately
//         setNotifications((prev) => prev.filter((n) => n.id !== id));
//       } else {
//         console.error("Failed to mark notification as read");
//       }
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//     }
//   };

//   const unreadCount = notifications.filter((n) => !n.read).length;

//   return (
//     <div className="relative">
//       {/* Bell Icon */}
//       <button
//         onClick={() => setShowDropdown(!showDropdown)}
//         className="relative p-2 bg-white rounded-full shadow hover:bg-gray-100"
//       >
//         <Bell className="w-6 h-6 text-gray-800" />
//         {unreadCount > 0 && (
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {/* Dropdown */}
//       {showDropdown && (
//         <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg border z-50">
//           <h4 className="px-4 py-2 font-semibold border-b">Notifications</h4>
//           <ul className="max-h-64 overflow-y-auto">
//             {notifications.length > 0 ? (
//               notifications.map((n) => (
//                 <li
//                   key={n.id}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                   onClick={() => handleMarkAsRead(n.id)}
//                 >
//                   <p className="font-medium">{n.title}</p>
//                   <p className="text-sm text-gray-600">{n.message}</p>
//                 </li>
//               ))
//             ) : (
//               <li className="px-4 py-2 text-gray-500 text-sm text-center">
//                 No notifications
//               </li>
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationBell;

import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import Api from "../api/ApiIP";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const Token = sessionStorage.getItem("authToken");

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${Api}/api/v1/admin_notifications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
      });

      if (!res.ok) {
        setNotifications([]);
        return;
      }

      const data = await res.json();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (error) {
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      const res = await fetch(`${Api}/api/v1/admin_notifications/${id}/read`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
      });
      if (res.ok) setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await Promise.all(
        notifications.map((n) =>
          fetch(`${Api}/api/v1/admin_notifications/${n.id}/read`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${Token}`,
            },
          })
        )
      );
      setNotifications([]);
    } catch (error) {
      console.error(error);
    }
  };

  const unreadCount = notifications.length;

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Bell className="w-6 h-6 text-gray-800" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-lg border z-50">
          <div className="flex justify-between items-center px-4 py-2 border-b">
            <h4 className="font-semibold text-gray-700">Notifications</h4>
            {notifications.length > 0 && (
              <>
              {/* <button
                onClick={handleMarkAllAsRead}
                // onClick={() => setNotifications([])}
                className="text-sm text-blue-600 hover:underline"
              >
                Read all
              </button> */}

              <button
                onClick={handleMarkAllAsRead}
                // onClick={() => setNotifications([])}
                className="text-sm text-blue-600 hover:underline"
              >
                Mark All Read
              </button>
              </>
            )}
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <li
                  key={n.id}
                  className="px-4 py-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  // onClick={() => handleMarkAsRead(n.id)}
                >
                  <p className="font-medium text-gray-800">{n.title}</p>
                  <p className="text-sm text-gray-600">{n.message}</p>
                  
                  <button
                    onClick={() => handleMarkAsRead(n.id)}
                    className="self-end mt-2 text-xs px-3 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Mark as read
                  </button>
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-gray-500 text-sm text-center">
                No notifications
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
