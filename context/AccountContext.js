import { useContext, createContext, useEffect, useState } from "react";
import { AuthErrorCodes, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db, storage } from '../config/firebase';
import { addDoc, collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import React from 'react';
import { getDownloadURL, ref } from "firebase/storage";

const AccountContext = React.createContext();

export function AccountContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({
        About: '',
        DisplayName: '',
        ProfilePic: '',
        UserType: '',
        Availability: "",
    })

    const handleLogin = (email, password) => {
        auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            setUser(userCredentials);
            setIsLoggedIn(true);
            console.log('Logged in with: ', user.email);
        })
        .catch(error => alert(error.message))
    }

    function handleSignUp(username, email, emailTwo, password, passwordTwo) {
        if(email!=emailTwo)
        {
            alert('Emails do not match!')
        }
        else if(password!=passwordTwo)
        {
            alert('Passwords do not match!')
        }
        else
        {
            auth
            .createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                setUser(userCredentials);
                setIsLoggedIn(true);
                console.log('Logged in with:', user.email);
                const validatedUserEmail = email.toLowerCase();
                //Create user in firestore
                async function addUserToFirestore() {
                    await setDoc(doc(db, "Users", validatedUserEmail), 
                    {
                        DisplayName: username,
                        ProfilePic: "",
                        UserType: "User",
                        About: "",
                        Availability: ""
                    });
                };
                addUserToFirestore();  
            })
            .catch(error => alert(error.message))
        }
    }

    async function handleFetchUserData(){
        const user = doc(db, "Users", auth.currentUser.email);
        const usersnap = await getDoc(user);
        const userdata = usersnap.data();
        if(usersnap.data().ProfilePic!='')
        {
            console.log(usersnap.data().ProfilePic);
            setUserData({
                About: usersnap.data().About,
                DisplayName: usersnap.data().DisplayName,
                ProfilePic: usersnap.data().ProfilePic,
                UserType: usersnap.data().UserType,
                Availability: usersnap.data().Availability
            })
        }
        else{
            setUserData({
                About: usersnap.data().About,
                DisplayName: usersnap.data().DisplayName,
                ProfilePic: "",
                UserType: usersnap.data().UserType,
                Availability: usersnap.data().Availability
            })
        }
    };
    
    // function logOut(){
    //     setUser(null);
    //     return signOut(auth);
    // }

    return (
        <AccountContext.Provider
            value={{
                user, 
                handleLogin, 
                handleSignUp, 
                isLoggedIn,
                handleFetchUserData, 
                userData
            }}
        >
            {children}
        </AccountContext.Provider>
    );
}

export default AccountContext;