import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Login from '../Modal/Login'
import Sell from '../Modal/Sell'
import Card from '../Card/Card'
import { ItemsContext } from '../Context/Item'
import { fetchFromFireStore } from '../Firebase/Firebase'

function Home() {
  const [openModal, setModal] = useState(false)
  const [openModalSell, setModalSell] = useState(false)
  
  const toggleModalSell = () => {
    setModalSell(!openModalSell)
  }
  
  const toggleModal = () => {
    setModal(!openModal)
  }
  
  const itemsCont = ItemsContext()
  
  useEffect(() => {
    const getItems = async () => {
      const datas = await fetchFromFireStore()
      itemsCont?.setItems(datas)
    }
    getItems()
  }, [])

  useEffect(() => {
    console.log('updated items', itemsCont.items);
  }, [itemsCont.items])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleModal={toggleModal} toggleModalSell={toggleModalSell} />
      <Login toggleModal={toggleModal} status={openModal} />
      <Sell setItems={(itemsCont).setItems} toggleModalSell={toggleModalSell} status={openModalSell} />
      
      {/* Main Content */}
      <div className="pt-24"> {/* Adjusted padding for fixed navbar */}
        <Card items={(itemsCont).items || []} />
      </div>
    </div>
  )
}

export default Home

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

