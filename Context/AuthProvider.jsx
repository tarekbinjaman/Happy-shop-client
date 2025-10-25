import React, { useEffect, useState } from 'react';
import Authcontext from './Authcontext';
import { auth } from '../firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import axios from 'axios';

const Authprovider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const userRegister = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const userLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(false)
        return signOut(auth)
    }
    const googleSignin = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }
    const updateUser = (user, updateData) => {
        setLoading(true)
        return updateProfile(user, updateData)
    }
    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        userLogin,
        logOut,
        googleSignin,
        updateUser,
        userRegister
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
            try {
                // if user logged in
                setUser(currentUser);
                // try {
                //     await axios.put(`https://happy-shop-snowy.vercel.app/api/users/${}`)
                // } catch (err) {

                // }
                if(currentUser) {
                    console.log(currentUser)
                    const loggedUser = {email : currentUser.email};
                    await axios.post('https://happy-shop-snowy.vercel.app/api/login', loggedUser, {withCredentials: true});
                } else {
                    // If user is logged out
                    await axios.post('https://happy-shop-snowy.vercel.app/api/login', {}, {withCredentials: true});
                }
            } catch (error) {
                console.error('Unexpected error in auth observer:', error);
            } finally {
                setLoading(false); // always stop loading no matter what
            }
        });
        
        return () => unsubscribe();

    },[])

    return (
        <Authcontext.Provider value={authInfo}>
            {children}
        </Authcontext.Provider>
    )
};

export default Authprovider;