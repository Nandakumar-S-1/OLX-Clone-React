import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/symbol.png";
import search from "../../assets/search1.svg";
import arrow from "../../assets/arrow-down.svg";
import "./Navbar.css";
import searchwt from "../../assets/search.svg";
import { userAuth } from "../Context/Auth";

function Navbar(props) {
  const { toggleModal, toggleModalSell } = props;
  const { user, data, setData, logout } = userAuth();
  const [showDrop, setDrop] = useState(false);
  //drop ref is used to detect any click out side the dropdown menu to close the dropdown
  const dropRef = useRef(null);

  useEffect(() => {
    function handleCloseDropdown(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDrop(false);
      }
    }
    document.addEventListener("mousedown", handleCloseDropdown);
    return () => {
      document.removeEventListener("mousedown", handleCloseDropdown);
    };
  }, []);

  const handleLogout = async () => {
    try {
      if (typeof logout === "function") {
        await logout();
        toast.info("Logout successful");
      } else {
        console.error("Logout function is not available in UserAuth context");
      }
      setShowDropdown(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  //   const handleLogout = async () => {
  //     try {
  //       await logout();
  //       setDrop(false);

  //     } catch (error) {
  //       console.log("logout has failedd".error);
  //     }
  //   };

  return (
    <div>
      {/* <p>{data}</p> */}
      <nav className="fixed z-50 w-full overflow-auto p-2 pl-3 pr-3 shadow-md bg-slate-100 border-b-4 border-solid border-b-white">
        <div className="flex items-center justify-between">
          <img src={logo} alt="" className="w-12" />

          <div className="relative location-search ml-5">
            <img src={search} alt="" className="absolute top-4 left-2 w-5" />
            <input
              type="text"
              placeholder="Search City,Area or Locality..."
              name=""
              id=""
              className="w-[50px] sm:w-[150px] md:w-[250px] lg:w-[270px] p-3 pl-8 pr-8 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300"
            />
            <img
              src={arrow}
              alt=""
              className="absolute top-4 right-3 w-4 cursor-pointer"
            />
          </div>

          <div className="ml-5 mr-2 relative flex-1 main-search">
            <input
              type="text"
              placeholder="Find Cars,Mobile Phones, and More..."
              className="w-full p-3 border-black border-2 border-solid rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300"
            />
            <div
              style={{ backgroundColor: "#002f34" }}
              className="flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12 cursor-pointer"
            >
              <img
                className="w-5 filter invert"
                src={searchwt}
                alt="Search Icon"
              />
            </div>
          </div>

          <div className="mx-1 sm:ml-5 sm:mr-5 relative lang flex items-center">
            <p className="font-bold mr-1 text-sm">English</p>
            <img src={arrow} alt="" className="w-3 cursor-pointer" />
          </div>

          <div className="flex items-center space-x-4">
            {/* <p onClick={toggleModal}
                           className="font-bold text-base cursor-pointer hover:text-teal-600 underline"
                        >
                            Login
                        </p>      */}

            {user ? (
              <div className="relative" ref={dropRef}>
                <div
                  className="flex items-center gap-1 cursor-pointer px-3 py-1.5 rounded-full hover:bg-gray-100"
                  onClick={() => setDrop(!showDrop)}
                >
                  <span className="text-gray-800 font-medium">
                    {user.displayName || user.email?.split("@")[0] || "User"}
                  </span>
                  <img src={arrow} alt="Arrow" className="w-3 h-3" />
                </div>

                {showDrop && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p
                onClick={toggleModal}
                className="font-bold text-base cursor-pointer hover:text-teal-600 underline"
              >
                Login
              </p>
            )}

            {/* <button
              onClick={toggleModalSell}
              className="flex items-center bg-white border-4 border-yellow-400 rounded-full px-4 py-2 font-bold text-sm hover:border-yellow-500 transition-colors"
            >
              <span className="text-2xl mr-2">+</span>
              SELL
            </button> */}

            <button onClick={()=>{
              if(!user){
                alert('Please.. You have to login before selling an item')
                toggleModal()
              }else{
                toggleModalSell()
              }
            }}
            
            className="flex items-center bg-white border-4 border-yellow-400 rounded-full px-4 py-2 font-bold text-sm hover:border-yellow-500 transition-colors"
>
              <span className="text-2xl mr-2">+</span>
              SELL
            </button>
          </div>
        </div>
      </nav>

      <div className="fixed top-20 z-40 w-full bg-white shadow-sm border-b">
        <div className="flex items-center px-4 py-2 space-x-6 overflow-x-auto ml-20">
          <div className="flex items-center cursor-pointer hover:text-teal-600">
            <span className="font-medium text-sm whitespace-nowrap">
              ALL CATEGORIES
            </span>
            <img src={arrow} alt="" className="w-3 ml-1" />
          </div>
          <span className="text-sm font-medium cursor-pointer hover:text-teal-600 whitespace-nowrap">
            Cars
          </span>
          <span className="text-sm font-medium cursor-pointer hover:text-teal-600 whitespace-nowrap">
            Motorcycles
          </span>
          <span className="text-sm font-medium cursor-pointer hover:text-teal-600 whitespace-nowrap">
            Mobile Phones
          </span>
          <span className="text-sm font-medium cursor-pointer hover:text-teal-600 whitespace-nowrap">
            For Sale: Houses & Apartments
          </span>
          <span className="text-sm font-medium cursor-pointer hover:text-teal-600 whitespace-nowrap">
            Scooters
          </span>
          <span className="text-sm font-medium cursor-pointer hover:text-teal-600 whitespace-nowrap">
            Commercial & Other Vehicles
          </span>
          <span className="text-sm font-medium cursor-pointer hover:text-teal-600 whitespace-nowrap">
            For Rent: Houses & Apartments
          </span>
        </div>

        {/* <div className="px-4 py-2 bg-gray-50 border-t">
                    <div className="flex items-center space-x-4">
                        <span className="text-xs text-gray-600">Popular Searches:</span>
                        <span className="text-xs text-blue-600 cursor-pointer hover:underline">scorpio</span>
                        <span className="text-xs text-blue-600 cursor-pointer hover:underline">swift</span>
                    </div>
                </div> */}
      </div>
    </div>
  );
}

export default Navbar;
















// import React, { useEffect, useRef, useState } from "react";
// import logo from "../../assets/symbol.png";
// import search from "../../assets/search1.svg";
// import arrow from "../../assets/arrow-down.svg";
// import "./Navbar.css";
// import searchwt from "../../assets/search.svg";
// import { userAuth } from "../Context/Auth";

// function Navbar(props) {
//   const { toggleModal, toggleModalSell } = props;
//   const { user, data, setData, logout } = userAuth();
//   const [showDrop, setDrop] = useState(false);
//   const dropRef = useRef(null);

//   useEffect(() => {
//     function handleCloseDropdown(e) {
//       if (dropRef.current && !dropRef.current.contains(e.target)) {
//         setDrop(false);
//       }
//     }
//     document.addEventListener("mousedown", handleCloseDropdown);
//     return () => {
//       document.removeEventListener("mousedown", handleCloseDropdown);
//     };
//   }, []);

//   const handleLogout = async () => {
//     try {
//       if (typeof logout === "function") {
//         await logout();
//         toast.info("Logout successful");
//       } else {
//         console.error("Logout function is not available in UserAuth context");
//       }
//       setShowDropdown(false);
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   return (
//     <div>
//       <nav className="fixed z-50 w-full overflow-auto p-2 pl-3 pr-3 shadow-md bg-slate-100 border-b-4 border-solid border-b-white">
//         <div className="flex items-center justify-between">
//           <img src={logo} alt="" className="w-12" />

//           <div className="relative location-search ml-5">
//             <img src={search} alt="" className="absolute top-4 left-2 w-5" />
//             <input
//               type="text"
//               placeholder="Search City,Area or Locality..."
//               className="w-[50px] sm:w-[150px] md:w-[250px] lg:w-[270px] p-3 pl-8 pr-8 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300"
//             />
//             <img
//               src={arrow}
//               alt=""
//               className="absolute top-4 right-3 w-4 cursor-pointer"
//             />
//           </div>

//           <div className="ml-5 mr-2 relative flex-1 main-search">
//             <input
//               type="text"
//               placeholder="Find Cars,Mobile Phones, and More..."
//               className="w-full p-3 border-black border-2 border-solid rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300"
//             />
//             <div
//               style={{ backgroundColor: "#002f34" }}
//               className="flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12 cursor-pointer"
//             >
//               <img
//                 className="w-5 filter invert"
//                 src={searchwt}
//                 alt="Search Icon"
//               />
//             </div>
//           </div>

//           <div className="mx-1 sm:ml-5 sm:mr-5 relative lang flex items-center">
//             <p className="font-bold mr-1 text-sm">English</p>
//             <img src={arrow} alt="" className="w-3 cursor-pointer" />
//           </div>

//           <div className="flex items-center space-x-4">
//             {user ? (
//               <div className="relative" ref={dropRef}>
//                 <div
//                   className="flex items-center gap-1 cursor-pointer px-3 py-1.5 rounded-full hover:bg-gray-100"
//                   onClick={() => setDrop(!showDrop)}
//                 >
//                   <span className="text-gray-800 font-medium">
//                     {user.displayName || user.email?.split("@")[0] || "User"}
//                   </span>
//                   <img src={arrow} alt="Arrow" className="w-3 h-3" />
//                 </div>

//                 {showDrop && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <p
//                 onClick={toggleModal}
//                 className="font-bold text-base cursor-pointer hover:text-teal-600 underline"
//               >
//                 Login
//               </p>
//             )}

//             <button
//               onClick={() => {
//                 if (!user) {
//                   alert("Please.. You have to login before selling an item");
//                   toggleModal();
//                 } else {
//                   toggleModalSell();
//                 }
//               }}
//               className="flex items-center bg-white border-4 border-yellow-400 rounded-full px-4 py-2 font-bold text-sm hover:border-yellow-500 transition-colors"
//             >
//               <span className="text-2xl mr-2">+</span>
//               SELL
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="fixed top-20 z-40 w-full bg-white shadow-sm border-b">
//         <div className="flex items-center px-4 py-2 space-x-4 overflow-x-auto scrollbar-hide">
//           <div className="flex items-center cursor-pointer hover:text-teal-600 flex-shrink-0">
//             <span className="font-medium text-sm whitespace-nowrap">
//               ALL CATEGORIES
//             </span>
//             <img src={arrow} alt="" className="w-3 ml-1" />
//           </div>
//           {[
//             "Cars",
//             "Motorcycles",
//             "Mobile Phones",
//             "For Sale: Houses & Apartments",
//             "Scooters",
//             "Commercial & Other Vehicles",
//             "For Rent: Houses & Apartments"
//           ].map((category, index) => (
//             <span
//               key={index}
//               className="text-sm font-medium cursor-pointer hover:text-teal-600 whitespace-nowrap flex-shrink-0"
//             >
//               {category}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;
