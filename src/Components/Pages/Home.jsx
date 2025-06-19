import React, { useEffect, useReducer, useState, useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import Login from '../Modal/Login';
import Sell from '../Modal/Sell';
import Card from '../Card/Card';
import { ItemsContext } from '../Context/Item';
import { fetchFromFireStore, firestore } from '../Firebase/Firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../Context/Auth';

const initialState = { items: [] };
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'DELETE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'UPDATE_ITEM':
      return { ...state, items: state.items.map(item => item.id === action.payload.id ? action.payload : item) };
    default:
      return state;
  }
};

function Home() {
  //here in theis use reducer , the reducer handles the 3 actions on the items whicih are set,delete,update
  //it updates the state.items array
  const [state, dispatch] = useReducer(reducer, initialState);
  const [openModal, setModal] = useState(false);
  const [openModalSell, setModalSell] = useState(false);
// this editform ref is passed to SEll page ,//when the handleEdit is triggered it focus edit form [itemId]
  const [editItem, setEditItem] = useState(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const getItems = async () => {
      const datas = await fetchFromFireStore();
      dispatch({ type: 'SET_ITEMS', payload: datas });
    };
    getItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteDoc(doc(firestore, 'Products', id));
      dispatch({ type: 'DELETE_ITEM', payload: id });
    }
  };

  const handleEdit = (item) => {
    setEditItem(item); // Set the item to edit
    console.log('Edit item', item);
    setModalSell(true); // Open the Sell modal for editing
  };

  const toggleModalSell = () => {
    setModalSell(!openModalSell);
    if (!openModalSell) setEditItem(null); // Reset editItem when closing without saving
  };
  const toggleModal = () => setModal(!openModal);

  const itemsCont = ItemsContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleModal={toggleModal} toggleModalSell={toggleModalSell} />
      <Login toggleModal={toggleModal} status={openModal} />
      <Sell
        setItems={(items) => dispatch({ type: 'SET_ITEMS', payload: items })}
        toggleModalSell={toggleModalSell}
        status={openModalSell}
        editItem={editItem} // Pass editItem state instead of ref-based lookup
        onUpdate={async (updatedItem) => {
          await updateDoc(doc(firestore, 'Products', updatedItem.id), updatedItem);
          dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });
        }}
      />
      <div className="pt-24">
        <Card items={state.items} onDelete={handleDelete} onEdit={handleEdit} currentUserId={auth?.user?.uid} />
      </div>
    </div>
  );
}

export default Home;


// import React, { useEffect, useReducer,useState, useRef, useContext } from 'react';
// import Navbar from '../Navbar/Navbar';
// import Login from '../Modal/Login';
// import Sell from '../Modal/Sell';
// import Card from '../Card/Card';
// import { ItemsContext } from '../Context/Item';
// import { fetchFromFireStore, firestore } from '../Firebase/Firebase';
// import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
// import { AuthContext } from '../Context/Auth';

// const initialState = { items: [] };
// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_ITEMS':
//       return { ...state, items: action.payload };
//     case 'DELETE_ITEM':
//       return { ...state, items: state.items.filter(item => item.id !== action.payload) };
//     case 'UPDATE_ITEM':
//       return { ...state, items: state.items.map(item => item.id === action.payload.id ? action.payload : item) };
//     default:
//       return state;
//   }
// };

// function Home() {
//   //here in theis use reducer , the reducer handles the 3 actions on the items whicih are set,delete,update
//   //it updates the state.items array
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const [openModal, setModal] = useState(false);
//   const [openModalSell, setModalSell] = useState(false);
// // this editform ref is passed to SEll page ,
// //when the handleEdit is triggered it focus edit form [itemId]
//   const editFormRef = useRef(null);
//   const auth = useContext(AuthContext);

//   useEffect(() => {
//     const getItems = async () => {
//       const datas = await fetchFromFireStore();
//       dispatch({ type: 'SET_ITEMS', payload: datas });
//     };
//     getItems();
//   }, []);

//   const handleDelete = async (id) => {
//     await deleteDoc(doc(firestore, 'Products', id));
//     dispatch({ type: 'DELETE_ITEM', payload: id });
//   };


//   const handleEdit = (item) => {
//     if (editFormRef.current) {
//       editFormRef.current.focus()
//       editFormRef.current.dataset.itemId = item.id;
//     }
//     console.log('Edit item', item);
//     setModalSell(true);
//   };

//   const toggleModalSell = () => setModalSell(!openModalSell);
//   const toggleModal = () => setModal(!openModal);

//   const itemsCont = ItemsContext();

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar toggleModal={toggleModal} toggleModalSell={toggleModalSell} />
//       <Login toggleModal={toggleModal} status={openModal} />
//       <Sell
//         setItems={(items) => dispatch({ type: 'SET_ITEMS', payload: items })}
//         toggleModalSell={toggleModalSell}
//         status={openModalSell}
//         editItem={state.items.find(item => item.id === (editFormRef.current?.dataset?.itemId || ''))}
//         onUpdate={async (updatedItem) => {
//           await updateDoc(doc(firestore, 'Products', updatedItem.id), updatedItem);
//           dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });
//         }}
//         ref={editFormRef}
//       />
//       <div className="pt-24">
//         <Card items={state.items} onDelete={handleDelete} onEdit={handleEdit} currentUserId={auth?.user?.uid} />
//       </div>
//     </div>
//   );
// }

// export default Home;

// import React, { useEffect, useState } from 'react'
// import Navbar from '../Navbar/Navbar'
// import Login from '../Modal/Login'
// import Sell from '../Modal/Sell'
// import Card from '../Card/Card'
// import { ItemsContext } from '../Context/Item'
// import { fetchFromFireStore } from '../Firebase/Firebase'
// function Home() {

//   const [openModal,setModal]=useState(false)
//   const [openModalSell,setModalSell]=useState(false)
//   const toggleModalSell =()=>{
//     setModalSell(!openModalSell)
//   }
//   const toggleModal=()=>{
//     setModal(!openModal)
//   }
//   const itemsCont = ItemsContext() //refer the value in context value
//   useEffect(()=>{
//     const getItems = async()=>{
//       const datas =await fetchFromFireStore()
//       itemsCont ?.setItems(datas) // itemsCont ?. setItems function provided by the context
//     }
//     getItems()
//   },[])

//   useEffect(()=>{
//     console.log('updated items',itemsCont.items) ;
//   },[itemsCont.items])

 
//   return (
//     <div>
//        <Navbar toggleModal={toggleModal} toggleModalSell={toggleModalSell}/>
//        <Login toggleModal={toggleModal} status={openModal}/>
//        <Sell setItems={(itemsCont).setItems} toggleModalSell={toggleModalSell} status={openModalSell}/>
//        <Card items={(itemsCont).items || []}/>
//     </div>
//   )
// }

// export default Home

