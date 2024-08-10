import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);

const auth = getAuth(app);


const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);


    // auth change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail }
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                axios.post('http://localhost:5000/jwt' ,loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log("token response: ", res.data)
                    })
            }
            else{
                axios.post('http://localhost:5000/logout',loggedUser, {withCredentials: true} )
                .then(res=>{
                    console.log(res.data);
                })
            }
        })
        return () => {
            return unsubscribe();
        }
    }, [])

    // login
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // create user
    const signIn = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }




    const authInfo = {
        user,
        loading,
        loginUser,
        signIn,
        logOut
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;