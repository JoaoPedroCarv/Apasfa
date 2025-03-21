
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC8zESbMXpRpoJRvuBHUBggJIuNcjxYZ8s",
    authDomain: "turismo-3914e.firebaseapp.com",
    projectId: "turismo-3914e",
    storageBucket: "turismo-3914e.appspot.com",
    messagingSenderId: "393264415757",
    appId: "1:393264415757:web:13cfd69a45778a219e8144"
  };

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };