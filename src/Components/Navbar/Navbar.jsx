import React from "react";
import logo from "../../assets/symbol.png";
import search from "../../assets/search1.svg";
import arrow from "../../assets/arrow-down.svg";
import "./Navbar.css";
import searchwt from '../../assets/search.svg'

function Navbar(props) {
    
    const {toggleModal, toggleModalSell} = props

    return (
        <div>
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
                        <div style={{backgroundColor:'#002f34'}} className="flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12 cursor-pointer">
                            <img className="w-5 filter invert" src={searchwt} alt="Search Icon" />
                        </div>
                    </div>
                    
                    <div className="mx-1 sm:ml-5 sm:mr-5 relative lang flex items-center">
                        <p className="font-bold mr-1 text-sm">English</p>
                        <img src={arrow} alt="" className="w-3 cursor-pointer"/>
                    </div>

                    <div className="flex items-center space-x-4">
                        <p 
                            onClick={toggleModal}
                            className="font-bold text-base cursor-pointer hover:text-teal-600 underline"
                        >
                            Login
                        </p>
                        <button 
                            onClick={toggleModalSell}
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
                        <span className="font-medium text-sm whitespace-nowrap">ALL CATEGORIES</span>
                        <img src={arrow} alt="" className="w-3 ml-1"/>
                    </div>
                    <span className="text-sm font-medium cursor-pointer hover:text-teal-600 whitespace-nowrap">Cars</span>
                    <span className="text-sm font-medium cursor-pointer hover:text-teal-600 whitespace-nowrap">Motorcycles</span>
                    <span className="text-sm font-medium cursor-pointer hover:text-teal-600 whitespace-nowrap">Mobile Phones</span>
                    <span className="text-sm font-medium cursor-pointer hover:text-teal-600 whitespace-nowrap">For Sale: Houses & Apartments</span>
                    <span className="text-sm font-medium cursor-pointer hover:text-teal-600 whitespace-nowrap">Scooters</span>
                    <span className="text-sm font-medium cursor-pointer hover:text-teal-600 whitespace-nowrap">Commercial & Other Vehicles</span>
                    <span className="text-sm font-medium cursor-pointer hover:text-teal-600 whitespace-nowrap">For Rent: Houses & Apartments</span>
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
