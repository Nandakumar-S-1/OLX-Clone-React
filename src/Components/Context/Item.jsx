import { collection ,getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { firestore } from "../Firebase/Firebase";

const Context =createContext(null)
export const ItemsContext =()=>useContext(Context) //example for a custom hoook

export const ItemContextProvider =({children})=>{
    const [items,setItems] =useState(null) //this set item is passed to home and sell

    useEffect(()=>{
        const fetchItemsFromFireStore =async ()=>{
            try {
                const productsCollection = collection(firestore,'Products')
                const productsSnapshot = await getDocs(productsCollection)
                const productsList =productsSnapshot.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data()
                }))
                setItems(productsList)
            } catch (error) {
                console.log('error feching products',error);
            }
        }
        fetchItemsFromFireStore()
    },[])

    return(
        <>
        <Context.Provider value={{items,setItems}}>
            {children}
        </Context.Provider>
        </>
    )
}
