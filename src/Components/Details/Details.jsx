import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ItemsContext } from "../Context/Item";
import Navbar from "../Navbar/Navbar";
import Login from "../Modal/Login";
import Sell from "../Modal/Sell";

const Details = () => {
  const location = useLocation();
  const { item } = location.state || {};
  const [openModal, setModal] = useState(false);
  const [openModalSell, setModalSell] = useState(false);

  const itemsCont = ItemsContext();
  const toggleModal = () => setModal(!openModal);
  const toggleModalSell = () => setModalSell(!openModalSell);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleModalSell={toggleModalSell} toggleModal={toggleModal} />
      <Login toggleModal={toggleModal} status={openModal} />

      <div className="pt-32 px-5 sm:px-15 md:px-30 lg:px-40">
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Image Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="h-96 flex justify-center items-center bg-gray-100">
                <img 
                  src={item?.imageUrl} 
                  alt={item?.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {/* Price */}
              <h1 className="text-3xl font-bold mb-4" style={{ color: '#002f34' }}>
                ₹ {item?.price}
              </h1>
              
              {/* Title */}
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {item?.title}
              </h2>
              
              {/* Category */}
              <p className="text-sm text-gray-600 mb-4">{item?.category}</p>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2" style={{ color: '#002f34' }}>
                  Description
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item?.description}
                </p>
              </div>

              {/* Seller Info */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2" style={{ color: '#002f34' }}>
                  Seller Information
                </h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-gray-600 font-semibold">
                      {item?.userName?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{item?.userName}</p>
                    <p className="text-sm text-gray-500">Member since {item?.createdAt}</p>
                  </div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="mt-6 space-y-3">
                <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Show Phone Number
                </button>
                <button className="w-full border-2 border-gray-900 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Sell 
        setItems={(itemsCont).setItems} 
        toggleModalSell={toggleModalSell} 
        status={openModalSell}
      />
    </div>
  );
};

export default Details;

















// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { ItemsContext } from "../Context/Item";
// import Navbar from "../Navbar/Navbar";
// import Login from "../Modal/Login";
// import Sell from "../Modal/Sell";

// const Details = () => {
//   const location = useLocation();
//   const { item } = location.state || {};
//   const [openModal, setModal] = useState(false);
//   const [openModalSell, setModalSell] = useState(false);

//   const itemsCont = ItemsContext();
//   const toggleModal = () => setModal(!openModal);
//   const toggleModalSell = () => setModalSell(!openModal);

//   return (
//     <div>
//       <Navbar toggleModalSell={toggleModalSell} toggleModal={toggleModal} />
//       <Login toggleModal={toggleModal} status={openModal} />

//       <div className="grid gap-0 sm:gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 p-10 px-5 sm:px-15 md:px-30 lg:px-40"> 
//         <div className="border-2 w-full rounded-lg flex justify-center overflow-hidden h-96">
//           <img src={item?.imageUrl} alt={item?.title} />
//         </div>
//         <div className="flex flex-col relative w-full">
//             <p>{item?.price}</p>
//             <p>{item?.category}</p>
//             <p>{item?.title}</p>
//             <p>{item?.description}</p>

//             <div className="w-full relative sm:relative md:absolute bottom-0 flex justify-between">
//                 <p>Seller: {item?.userName}</p>
//                 <p>{item?.createdAt}</p>
//             </div>
//         </div>
//       </div>

//     <Sell setItems={(itemsCont).setItems} toggleModalSell={toggleModalSell} status={toggleModal}/>

//     </div>
//   );
// };

// export default Details;
