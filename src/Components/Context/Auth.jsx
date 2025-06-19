import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from '../Firebase/Firebase';

export const AuthContext = createContext(null);

export const userAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unSubscribe();
    }, []);
    
    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    );
};














// import { onAuthStateChanged } from "firebase/auth";
// import { Children, createContext, useEffect, useState } from "react";
// import {auth} from '../Firebase/Firebase'

// const AuthContext =createContext(null)
// export const useAuth =()=> useContext(AuthContext)
// export const AuthProvider =(Children)=>{
//     const [user,setUser] = useState(null)
//     useEffect(()=>{
//         const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
//             setUser(currentUser)
//         })
//        return () => unSubscribe()
//     },[])
//     return (
//         <AuthContext.Provider value={user}>
//             {Children}  
//         </AuthContext.Provider>
//     )
// }
