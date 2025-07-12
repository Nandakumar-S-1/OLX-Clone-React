import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
import { collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOB5tCvfJECRo3bQzj3K3zsjr_upkEGIs",
  authDomain: "olx-clone-90d0b.firebaseapp.com",
  projectId: "olx-clone-90d0b",
  storageBucket: "olx-clone-90d0b.firebasestorage.app",
  messagingSenderId: "49916965881",
  appId: "1:49916965881:web:ae5c2c45071cc9256b0328"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()
const storage =getStorage()
const firestore =getFirestore()

const fetchFromFireStore =async () => {
    try {
        const productsCollection =collection(firestore,'Products')
        const productSnapshot = await getDocs(productsCollection)
        const productList =productSnapshot.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
        }))

        console.log('fetched products',productList);
        return productList

    } catch (error) {
        console.log('error fetching from firestore',error);
        return []
    }
}

export {
    auth,
    provider,
    storage,
    firestore,
    fetchFromFireStore
}