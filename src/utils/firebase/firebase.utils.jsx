import { initializeApp } from 'firebase/app';
import { getAuth, signInWethRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyASfg0frEqU2y_wVOoM7fbAkjFv4MDgPsE",
    authDomain: "crown-clothing-db-ef68e.firebaseapp.com",
    projectId: "crown-clothing-db-ef68e",
    storageBucket: "crown-clothing-db-ef68e.appspot.com",
    messagingSenderId: "396593769053",
    appId: "1:396593769053:web:7b60a0efa248f1d01ffbb4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFormAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    //if user data does not exist
    //create / set the document with the data form userAuth in my collection
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};