// firebase-config.js
import React, { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { firebaseConfig } from "./firebase-config"; // Import the firebaseConfig from the separate file

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseStore = getFirestore(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);

// Create a Firebase context
const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
    const auth = firebaseAuth;
    const storage = firebaseStorage;
    const store = firebaseStore;
    return (
        <FirebaseContext.Provider value={{
            auth,
            store,
            storage
        }}>
            {children}
        </FirebaseContext.Provider>
    );
};

// Custom hook to use Firebase
export const useFirebase = () => {
    return useContext(FirebaseContext);
};