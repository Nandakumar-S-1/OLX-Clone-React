// import React from 'react';
// import { Link } from 'react-router-dom';
// import Favorite from '../../assets/favorite.svg';

// function Card({ items }) {
//   return (
//     <div className="mt-32 p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen bg-gray-50">
//       <div className="text-sm text-gray-500 mb-2">
//         <span>Home</span> / <span>Cars</span> / <span>Cars in Maharashtra</span>
//       </div>

//       <h1 className="text-2xl font-bold mb-2" style={{ color: '#002f34' }}>
//         4594 Used Cars in Samudrapur - Buy Second Hand Cars
//       </h1>
//       <p className="text-sm text-gray-600 mb-6">
//         Explore a wide range of used cars in Samudrapur on OLX. Currently, there are more than 4520 second-hand cars available for sale in Samudrapur & nearby locations, presenting top brands like{' '}
//         <span className="text-blue-600 cursor-pointer">Maruti Suzuki</span>,{' '}
//         <span className="text-blue-600 cursor-pointer">Hyundai</span>,{' '}
//         <span className="text-blue-600 cursor-pointer">Mahindra</span>...{' '}
//         <span className="text-blue-600 cursor-pointer">Read more</span>
//       </p>
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center space-x-4">
//           <div className="bg-white border rounded-md p-2">
//             <div className="flex items-center cursor-pointer">
//               <span className="text-sm font-medium">CATEGORIES</span>
//               <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </div>
//           </div>
//           <div className="bg-white border rounded-md p-2">
//             <div className="flex items-center cursor-pointer">
//               <span className="text-sm font-medium">LOCATIONS</span>
//               <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </div>
//           </div>
//         </div>
        
//         <div className="flex items-center">
//           <span className="text-sm text-gray-600 mr-2">SORT BY :</span>
//           <select className="bg-white border rounded-md p-2 text-sm">
//             <option>Date Published</option>
//             <option>Price: Low to High</option>
//             <option>Price: High to Low</option>
//           </select>
//         </div>
//       </div>
//       <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {items.map((item) => (
//           <Link
//             key={item.id}
//             to="/details"
//             state={{ item }}
//             className="block"
//           >
//             <div className="relative w-full bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200">
//               <div className="absolute top-2 right-2 z-10">
//                 <div className="flex justify-center items-center p-1.5 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-50">
//                   <img className="w-4 h-4" src={Favorite} alt="favorite" />
//                 </div>
//               </div>

//               <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
//                 <img
//                   src={item.imageUrl || 'https://via.placeholder.com/300x200'}
//                   alt={item.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
              
//               <div className="p-3">
//                 <h3 className="font-bold text-lg mb-1" style={{ color: '#002f34' }}>
//                   ₹ {item.price}
//                 </h3>
                
//                 <p className="text-sm text-gray-600 mb-1">{item.category}</p>

//                 <p className="text-sm text-gray-800 mb-2 line-clamp-2">
//                   {item.title}
//                 </p>
                
//                 <div className="flex justify-between items-center text-xs text-gray-500 mt-3">
//                   <span>SAMUDRAPUR</span>
//                   <span>{item.createdAt || 'Today'}</span>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Card;




import React from 'react';
import { Link } from 'react-router-dom';
import Favorite from '../../assets/favorite.svg';

function Card({ items }) {
  return (
    <div className="p-6 px-4 sm:px-8 md:px-16 lg:px-24 min-h-screen bg-white">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-4" style={{ color: '#002f34' }}>
          Fresh recommendations
        </h1>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <Link
            key={item.id}
            to="/details"
            state={{ item }}
            className="block"
          >
            <div className="relative w-full bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200">
              {/* Favorite Button */}
              <div className="absolute top-3 right-3 z-10">
                <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow-sm cursor-pointer hover:bg-gray-50 border border-gray-100">
                  <img className="w-4 h-4" src={Favorite} alt="favorite" />
                </div>
              </div>

              {/* Image Container */}
              <div className="w-full h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
                <img
                  src={item.imageUrl || 'https://via.placeholder.com/300x200'}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="p-4">
                {/* Price */}
                <h3 className="font-bold text-lg mb-2" style={{ color: '#002f34' }}>
                  ₹ {item.price}
                </h3>
                
                {/* Title */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                  {item.title}
                </p>
                
                {/* Location and Date */}
                <div className="flex justify-between items-center text-xs text-gray-500 uppercase">
                  <span className="font-medium">SAMUDRAPUR, MAHARASHTRA</span>
                  <span>{item.createdAt || 'TODAY'}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Want to see your stuff here section */}
      <div className="mt-8 mb-4">
        <div className="bg-blue-500 rounded-lg p-6 text-center text-white">
          <h2 className="text-lg font-semibold mb-2">Want to see your stuff here?</h2>
          <p className="text-sm opacity-90 mb-4">Make some extra cash by selling things in your community. Go on, it's quick and easy.</p>
          <button className="bg-white text-blue-500 px-6 py-2 rounded-md font-semibold hover:bg-gray-50 transition-colors">
            Start selling
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;






// // import React from 'react'
// // import { Link } from 'react-router-dom'
// // import Favorite from '../../assets/favorite.svg'

// // function Card({items}) {
// //   return (
// //     <div className='p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen'>
// //       <h1 style={{color:'#002f34'}} className='text-2xl'>Fresh Recomendations</h1>
// //       <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5'>
// //         {items.map((item)=>(
// //             <Link key={item.id} to={'/details'} state={{item}} style={{borderWidth:'1px', borderColor:'lightgrey'}}>
// //             <div style={{borderWidth:'1px', borderColor:'lightgrey'}} className='relative w-full h-72 rounded-md border-solid bg-grey-50 overflow-hidden cursor-pointer '>
// //                 <div className='w-full flex justify-center p-2 overflow-hidden'>
// //                     <img src={item.imageUrl || 'https://via.placeholder.com/150'} alt={item.title} 
// //                     className='h-36 object-contain'/>
// //                 </div>
// //                 <div className='details p-1 pl-4 pr-4'>
// //                     <h1 className='font-bold text-xl' style={{color:'#002f34'}}>{item.price}</h1>
// //                     <p className='text-sm pt-2'>{item.category}</p>
// //                     <p className='pt-2'>{item.title}</p>

// //                 <div className='absolute flex justify-center items-center p-2 bg-white rounded-full top-3 right-3 cursor-pointer'>
// //                     <img className='w-5' src={Favorite} alt="" />
// //                 </div>

// //                 </div>

// //             </div>
// //             </Link>
// //         ))}

// //       </div>
// //     </div>
// //   )
// // }

// // export default Card

// /////////////////////////////////

// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import Favorite from '../../assets/favorite.svg';

// // function Card({ items }) {
// //   return (
// //     <div className="p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen">
// //       <h1 className="text-2xl" style={{ color: '#002f34' }}>
// //         Fresh Recommendations
// //       </h1>
// //       <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5">
// //         {items.map((item) => (
// //           <Link
// //             key={item.id}
// //             to="/details"
// //             state={{ item }}
// //             style={{ borderWidth: '1px', borderColor: 'lightgrey' }}
// //           >
// //             <div className="relative w-full h-72 rounded-md border-solid bg-grey-50 overflow-hidden cursor-pointer">
// //               <div className="w-full flex justify-center p-2 overflow-hidden">
// //                 <img
// //                   src={item.imageUrl || 'https://via.placeholder.com/150'}
// //                   alt={item.title}
// //                   className="h-36 object-contain"
// //                 />
// //               </div>
// //               <div className="details p-1 pl-4 pr-4">
// //                 <h1 className="font-bold text-xl" style={{ color: '#002f34' }}>
// //                   {item.price}
// //                 </h1>
// //                 <p className="text-sm pt-2">{item.category}</p>
// //                 <p className="pt-2">{item.title}</p>

// //                 <div className="absolute flex justify-center items-center p-2 bg-white rounded-full top-3 right-3 cursor-pointer">
// //                   <img className="w-5" src={Favorite} alt="favorite" />
// //                 </div>
// //               </div>
// //             </div>
// //           </Link>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Card;
