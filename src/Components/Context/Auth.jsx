import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from '../Firebase/Firebase';

//this is to built a global auth context,then useContext hook is used to consume it in child like Navbar
//the Context API handles the creation and sharing of global state, and useContext is the hook that lets us access it easily inside components.
export const AuthContext = createContext(null);

export const userAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [data,setData] =useState('')
    
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unSubscribe();
    }, []);

    const logout = () => signOut(auth);

    
    return (
        <AuthContext.Provider value={{user,data,setData,logout}}>
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
